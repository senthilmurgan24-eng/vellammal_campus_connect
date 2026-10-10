param(
  [string]$BackendPort = "8081"
)

$ErrorActionPreference = "Stop"

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot "..\..")
$backendPath = Join-Path $repoRoot "backend"

if (-not (Test-Path $backendPath)) {
  throw "Backend directory not found at $backendPath"
}

# Use local H2 by default for localhost development.
if (-not $env:DB_URL) { $env:DB_URL = "jdbc:h2:file:./data/local-dev-db;MODE=PostgreSQL;DATABASE_TO_LOWER=TRUE;AUTO_SERVER=TRUE" }
if (-not $env:DB_DRIVER) { $env:DB_DRIVER = "org.h2.Driver" }
if (-not $env:DB_DIALECT) { $env:DB_DIALECT = "org.hibernate.dialect.H2Dialect" }
if (-not $env:DB_USERNAME) { $env:DB_USERNAME = "sa" }
if (-not $env:DB_PASSWORD) { $env:DB_PASSWORD = "" }

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
  Write-Warning "EMAIL_APP_PASSWORD is not set. Email features may fail in local mode."
  $env:EMAIL_APP_PASSWORD = "local-dev-placeholder"
}

if (-not $env:GOOGLE_CLIENT_ID) {
  $env:GOOGLE_CLIENT_ID = [Environment]::GetEnvironmentVariable("GOOGLE_CLIENT_ID", "User")
}
if (-not $env:GOOGLE_CLIENT_ID) {
  $env:GOOGLE_CLIENT_ID = [Environment]::GetEnvironmentVariable("GOOGLE_CLIENT_ID", "Machine")
}
if (-not $env:GOOGLE_CLIENT_ID) {
  Write-Warning "GOOGLE_CLIENT_ID is not set. Google SSO login will be unavailable in local testing."
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
