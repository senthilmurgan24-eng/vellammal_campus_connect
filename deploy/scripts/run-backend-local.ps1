param(
  [string]$BackendPort = "8081"
)

$ErrorActionPreference = "Stop"

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot "..\..")
$backendPath = Join-Path $repoRoot "backend"

if (-not (Test-Path $backendPath)) {
  throw "Backend directory not found at $backendPath"
}

# Use provided values unless already set in the current shell.
if (-not $env:DB_URL) { $env:DB_URL = "jdbc:postgresql://ranknova-db.cpgiaoygqj8z.ap-southeast-2.rds.amazonaws.com:5432/ranknova" }
if (-not $env:DB_USERNAME) { $env:DB_USERNAME = "postgres" }
if (-not $env:DB_PASSWORD) { $env:DB_PASSWORD = "Ranknova" }

# Email configuration is sourced from environment variables.
if (-not $env:EMAIL_USERNAME) {
  $env:EMAIL_USERNAME = [Environment]::GetEnvironmentVariable("EMAIL_USERNAME", "User")
}
if (-not $env:EMAIL_USERNAME) {
  $env:EMAIL_USERNAME = [Environment]::GetEnvironmentVariable("EMAIL_USERNAME", "Machine")
}
if (-not $env:EMAIL_USERNAME) {
  $env:EMAIL_USERNAME = "academics@ranknovainstitute.com"
}

if (-not $env:EMAIL_FROM) {
  $env:EMAIL_FROM = [Environment]::GetEnvironmentVariable("EMAIL_FROM", "User")
}
if (-not $env:EMAIL_FROM) {
  $env:EMAIL_FROM = [Environment]::GetEnvironmentVariable("EMAIL_FROM", "Machine")
}
if (-not $env:EMAIL_FROM) {
  $env:EMAIL_FROM = $env:EMAIL_USERNAME
}

if (-not $env:EMAIL_APP_PASSWORD) {
  $env:EMAIL_APP_PASSWORD = [Environment]::GetEnvironmentVariable("EMAIL_APP_PASSWORD", "User")
}
if (-not $env:EMAIL_APP_PASSWORD) {
  $env:EMAIL_APP_PASSWORD = [Environment]::GetEnvironmentVariable("EMAIL_APP_PASSWORD", "Machine")
}
if (-not $env:EMAIL_APP_PASSWORD) {
  throw "EMAIL_APP_PASSWORD is not set. Set it in your shell or persist it with: setx EMAIL_APP_PASSWORD \"<your-app-password>\""
}

$existingPid = Get-NetTCPConnection -LocalPort ([int]$BackendPort) -State Listen -ErrorAction SilentlyContinue |
  Select-Object -ExpandProperty OwningProcess -First 1

if ($existingPid) {
  Stop-Process -Id $existingPid -Force
  Write-Host "Freed port $BackendPort (PID $existingPid)"
}

Push-Location $backendPath
try {
  mvn spring-boot:run
}
finally {
  Pop-Location
}
