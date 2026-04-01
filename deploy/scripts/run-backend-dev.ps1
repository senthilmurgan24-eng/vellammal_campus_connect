<#
.SYNOPSIS
  Starts the Spring Boot backend with the 'local' profile (H2 database, localhost CORS).
  Use this script for local HTTP development instead of run-backend-local.ps1.

.DESCRIPTION
  Sets SPRING_PROFILES_ACTIVE=local so Spring Boot loads application-local.yml on top of
  application.yml, switching the database to H2 and CORS origins to localhost ports.

  Required env vars (optional — leave blank to disable the feature locally):
    GOOGLE_CLIENT_ID   — Google OAuth Client ID for SSO testing

  Tip: put personal env vars in a .env file next to this script and they will be loaded
  automatically before Maven starts.

.PARAMETER BackendPort
  Port the Spring Boot server listens on. Default: 8081
#>
param(
  [string]$BackendPort = "8081"
)

$ErrorActionPreference = "Stop"

$repoRoot   = Resolve-Path (Join-Path $PSScriptRoot "..\..")
$backendPath = Join-Path $repoRoot "backend"
$envFile     = Join-Path $PSScriptRoot ".env"

# ------------------------------------------------------------------
# Load a local .env file sitting next to this script (if it exists).
# Format: KEY=VALUE  (lines starting with # are ignored)
# ------------------------------------------------------------------
if (Test-Path $envFile) {
  Get-Content $envFile | Where-Object { $_ -match '^\s*[^#]' -and $_ -match '=' } | ForEach-Object {
    $parts = $_ -split '=', 2
    $key   = $parts[0].Trim()
    $value = $parts[1].Trim()
    if (-not [System.Environment]::GetEnvironmentVariable($key)) {
      [System.Environment]::SetEnvironmentVariable($key, $value, 'Process')
    }
  }
}

# ------------------------------------------------------------------
# Activate the local Spring profile (H2 + localhost CORS)
# ------------------------------------------------------------------
$env:SPRING_PROFILES_ACTIVE = "local"

# ------------------------------------------------------------------
# Optional: Google SSO — warn if not set, but do not block startup
# ------------------------------------------------------------------
if (-not $env:GOOGLE_CLIENT_ID) {
  $env:GOOGLE_CLIENT_ID = [System.Environment]::GetEnvironmentVariable("GOOGLE_CLIENT_ID", "User")
}
if (-not $env:GOOGLE_CLIENT_ID) {
  Write-Warning "GOOGLE_CLIENT_ID is not set — Google SSO will be unavailable locally."
}

# ------------------------------------------------------------------
# Free the port if already in use
# ------------------------------------------------------------------
$existingPid = Get-NetTCPConnection -LocalPort ([int]$BackendPort) -State Listen -ErrorAction SilentlyContinue |
  Select-Object -ExpandProperty OwningProcess -First 1

if ($existingPid) {
  Stop-Process -Id $existingPid -Force
  Write-Host "Freed port $BackendPort (PID $existingPid)"
}

# ------------------------------------------------------------------
# Run backend with local profile
# ------------------------------------------------------------------
Write-Host "Starting backend [profile: local] on port $BackendPort …"
Push-Location $backendPath
try {
  mvn spring-boot:run -Dspring-boot.run.profiles=local
}
finally {
  Pop-Location
}
