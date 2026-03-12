# ALB + Target Group setup template for ranknovainstitute.com
# Prerequisites:
# - AWS CLI configured: aws configure
# - ACM certificate issued for ranknovainstitute.com, www.ranknovainstitute.com, api.ranknovainstitute.com
# - Route53 hosted zone exists for ranknovainstitute.com

param(
  [string]$Region = "ap-south-1",
  [string]$VpcId,
  [string]$AlbSecurityGroupId,
  [string]$Subnet1,
  [string]$Subnet2,
  [string]$CertificateArn,
  [string]$InstanceId,
  [string]$HostedZoneId
)

if (-not $VpcId -or -not $AlbSecurityGroupId -or -not $Subnet1 -or -not $Subnet2 -or -not $CertificateArn -or -not $InstanceId -or -not $HostedZoneId) {
  Write-Error "Missing required parameters. Provide VpcId, AlbSecurityGroupId, Subnet1, Subnet2, CertificateArn, InstanceId, HostedZoneId."
  exit 1
}

$ErrorActionPreference = "Stop"

Write-Host "Creating ALB..."
$albArn = aws elbv2 create-load-balancer `
  --name ranknova-alb `
  --type application `
  --scheme internet-facing `
  --security-groups $AlbSecurityGroupId `
  --subnets $Subnet1 $Subnet2 `
  --region $Region `
  --query "LoadBalancers[0].LoadBalancerArn" `
  --output text

$albDns = aws elbv2 describe-load-balancers --load-balancer-arns $albArn --region $Region --query "LoadBalancers[0].DNSName" --output text
$albZoneId = aws elbv2 describe-load-balancers --load-balancer-arns $albArn --region $Region --query "LoadBalancers[0].CanonicalHostedZoneId" --output text

Write-Host "Creating target group for Nginx (port 80)..."
$tgArn = aws elbv2 create-target-group `
  --name ranknova-tg `
  --protocol HTTP `
  --port 80 `
  --vpc-id $VpcId `
  --target-type instance `
  --health-check-path / `
  --region $Region `
  --query "TargetGroups[0].TargetGroupArn" `
  --output text

aws elbv2 register-targets --target-group-arn $tgArn --targets Id=$InstanceId,Port=80 --region $Region | Out-Null

Write-Host "Creating listeners (80 redirect -> 443, 443 forward)..."
aws elbv2 create-listener `
  --load-balancer-arn $albArn `
  --protocol HTTP `
  --port 80 `
  --default-actions Type=redirect,RedirectConfig='{Protocol=HTTPS,Port=443,StatusCode=HTTP_301}' `
  --region $Region | Out-Null

aws elbv2 create-listener `
  --load-balancer-arn $albArn `
  --protocol HTTPS `
  --port 443 `
  --certificates CertificateArn=$CertificateArn `
  --ssl-policy ELBSecurityPolicy-TLS13-1-2-2021-06 `
  --default-actions Type=forward,TargetGroupArn=$tgArn `
  --region $Region | Out-Null

Write-Host "Creating Route53 alias records for apex + www..."
$changes = @{
  Changes = @(
    @{
      Action = "UPSERT"
      ResourceRecordSet = @{
        Name = "ranknovainstitute.com"
        Type = "A"
        AliasTarget = @{
          HostedZoneId = $albZoneId
          DNSName = "dualstack.$albDns"
          EvaluateTargetHealth = $true
        }
      }
    },
    @{
      Action = "UPSERT"
      ResourceRecordSet = @{
        Name = "www.ranknovainstitute.com"
        Type = "A"
        AliasTarget = @{
          HostedZoneId = $albZoneId
          DNSName = "dualstack.$albDns"
          EvaluateTargetHealth = $true
        }
      }
    }
  )
}

$changeFile = Join-Path $env:TEMP "ranknova-route53-change.json"
$changes | ConvertTo-Json -Depth 6 | Set-Content -Path $changeFile -Encoding UTF8
aws route53 change-resource-record-sets --hosted-zone-id $HostedZoneId --change-batch file://$changeFile | Out-Null

Write-Host "Done. ALB DNS: $albDns"
Write-Host "Next: Ensure EC2 security group allows inbound port 80 from ALB security group only."
