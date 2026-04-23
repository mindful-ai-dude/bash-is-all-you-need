# ============================================================================
#  stop.ps1 — Windows Graceful Shutdown & Port Cleanup (PowerShell)
# ============================================================================
#  Stops the running Vite dev server and cleans up runtime files.
#
#  Usage:
#    .\stop.ps1                  Graceful shutdown
#    .\stop.ps1 -Force           Force kill
#    .\stop.ps1 -Port 5173       Kill processes on a specific port
# ============================================================================

param(
    [switch]$Force,
    [int]$Port = 0,
    [switch]$Help
)

if ($Help) {
    Write-Host "Usage: .\stop.ps1 [OPTIONS]"
    Write-Host ""
    Write-Host "  -Force         Force kill instead of graceful shutdown"
    Write-Host "  -Port <NUM>    Kill processes on a specific port"
    Write-Host "  -Help          Show this help message"
    exit 0
}

function Write-Info($msg)    { Write-Host "  i  $msg" -ForegroundColor Cyan }
function Write-Ok($msg)      { Write-Host "  ✓  $msg" -ForegroundColor Green }
function Write-Warn($msg)    { Write-Host "  ⚠  $msg" -ForegroundColor Yellow }
function Write-Fail($msg)    { Write-Host "  ✗  $msg" -ForegroundColor Red }

# --- Banner -----------------------------------------------------------------
Write-Host ""
Write-Host "Shutdown Script" -ForegroundColor Red
Write-Host ("─" * 60) -ForegroundColor DarkGray

# --- Load config ------------------------------------------------------------
$APP_PORT = $Port
$APP_NAME = "Bash Is All You Need"

if (Test-Path ".run.env") {
    Get-Content ".run.env" | ForEach-Object {
        if ($_ -match "^APP_PORT=(.+)$" -and $Port -eq 0) { $APP_PORT = [int]$Matches[1] }
        if ($_ -match "^APP_NAME=(.+)$") { $APP_NAME = $Matches[1] }
    }
    Write-Info "Loaded config from .run.env"
    Write-Info "App: $APP_NAME | Port: $APP_PORT"
}

if ($APP_PORT -eq 0) { $APP_PORT = 5173 }
if ($Port -eq 0) { Write-Info "No port configured. Using Vite default: $APP_PORT" }

# --- Step 1: Stop main port -------------------------------------------------
Write-Host ""
Write-Host "[Step 1] Stopping processes on port $APP_PORT" -ForegroundColor Blue

$connections = Get-NetTCPConnection -LocalPort $APP_PORT -ErrorAction SilentlyContinue
if ($connections) {
    $pids = $connections | Select-Object -ExpandProperty OwningProcess -Unique
    foreach ($pid in $pids) {
        $proc = Get-Process -Id $pid -ErrorAction SilentlyContinue
        if ($proc) {
            Write-Info "Stopping $($proc.ProcessName) (PID $pid)..."
            if ($Force) {
                Stop-Process -Id $pid -Force
            } else {
                Stop-Process -Id $pid
                Start-Sleep -Seconds 2
                if (Get-Process -Id $pid -ErrorAction SilentlyContinue) {
                    Write-Warn "Graceful stop failed. Force killing..."
                    Stop-Process -Id $pid -Force
                }
            }
            Write-Ok "PID $pid stopped"
        }
    }
} else {
    Write-Info "No processes found on port $APP_PORT"
}

# --- Step 2: Check for Vite HMR port ----------------------------------------
Write-Host ""
Write-Host "[Step 2] Checking for Vite HMR companion port" -ForegroundColor Blue

$HMR_PORT = $APP_PORT + 1
$hmrConnections = Get-NetTCPConnection -LocalPort $HMR_PORT -ErrorAction SilentlyContinue
if ($hmrConnections) {
    Write-Warn "Found process(es) on Vite HMR port $HMR_PORT"
    $hmrPids = $hmrConnections | Select-Object -ExpandProperty OwningProcess -Unique
    foreach ($pid in $hmrPids) {
        $proc = Get-Process -Id $pid -ErrorAction SilentlyContinue
        if ($proc) {
            Write-Info "Stopping $($proc.ProcessName) (PID $pid)..."
            Stop-Process -Id $pid -Force
        }
    }
} else {
    Write-Info "No processes on HMR port $HMR_PORT"
}

# --- Step 3: Cleanup --------------------------------------------------------
Write-Host ""
Write-Host "[Step 3] Cleaning up" -ForegroundColor Blue

if (Test-Path ".run.env") {
    Remove-Item ".run.env" -Force
    Write-Ok "Removed .run.env"
}

# --- Step 4: Verify ---------------------------------------------------------
Write-Host ""
Write-Host "[Step 4] Verifying port $APP_PORT is free" -ForegroundColor Blue

Start-Sleep -Seconds 1
$remaining = Get-NetTCPConnection -LocalPort $APP_PORT -ErrorAction SilentlyContinue
if (-not $remaining) {
    Write-Ok "Port $APP_PORT is free and clear"
} else {
    Write-Warn "Port $APP_PORT still in use. Try: .\stop.ps1 -Force"
}

# --- Done -------------------------------------------------------------------
Write-Host ""
Write-Host "$APP_NAME has been shut down. Restart: .\start.ps1" -ForegroundColor Green
Write-Host ""