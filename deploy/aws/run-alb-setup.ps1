# Interactive wrapper for deploy/aws/alb-setup-template.ps1
# Run:
#   .\deploy\aws\run-alb-setup.ps1

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$templatePath = Join-Path $scriptDir "alb-setup-template.ps1"

if (-not (Test-Path $templatePath)) {
  Write-Error "Template script not found: $templatePath"
  exit 1
}

Write-Host "Enter AWS values for ALB setup" -ForegroundColor Cyan
$region = Read-Host "Region [ap-south-1]"
if ([string]::IsNullOrWhiteSpace($region)) { $region = "ap-south-1" }

$vpcId = Read-Host "VpcId (example: vpc-1234567890abcdef0)"
$albSg = Read-Host "ALB SecurityGroupId (example: sg-1234567890abcdef0)"
$subnet1 = Read-Host "Subnet1"
$subnet2 = Read-Host "Subnet2"
$certArn = Read-Host "ACM CertificateArn"
$instanceId = Read-Host "EC2 InstanceId"
$hostedZoneId = Read-Host "Route53 HostedZoneId"

if ([string]::IsNullOrWhiteSpace($vpcId) -or
    [string]::IsNullOrWhiteSpace($albSg) -or
    [string]::IsNullOrWhiteSpace($subnet1) -or
    [string]::IsNullOrWhiteSpace($subnet2) -or
    [string]::IsNullOrWhiteSpace($certArn) -or
    [string]::IsNullOrWhiteSpace($instanceId) -or
    [string]::IsNullOrWhiteSpace($hostedZoneId)) {
  Write-Error "All values are required."
  exit 1
}

& $templatePath `
  -Region $region `
  -VpcId $vpcId `
  -AlbSecurityGroupId $albSg `
  -Subnet1 $subnet1 `
  -Subnet2 $subnet2 `
  -CertificateArn $certArn `
  -InstanceId $instanceId `
  -HostedZoneId $hostedZoneId
