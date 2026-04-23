# ============================================================================
#  start.ps1 — Bash Is All You Need App Startup Script (Windows PowerShell)
# ============================================================================
#  Windows equivalent of start.sh for users without WSL or Git Bash.
#  Installs pnpm (if needed), installs dependencies, starts the Vite dev server.
#
#  Usage:
#    powershell -ExecutionPolicy ByPass -File start.ps1
#
#  Or if execution policy is already set:
#    .\start.ps1
# ============================================================================

$ErrorActionPreference = "Stop"

# ┌────────────────────────────────────────────────────────────────────────────┐
# │  CONFIGURATION                                                            │
# └────────────────────────────────────────────────────────────────────────────┘

$APP_START_CMD = "pnpm run dev"
$APP_PORT       = 5173
$APP_NAME       = "Bash Is All You Need"

# ┌────────────────────────────────────────────────────────────────────────────┐
# │  DO NOT EDIT BELOW THIS LINE                                              │
# └────────────────────────────────────────────────────────────────────────────┘

function Write-Step($num, $msg) {
    Write-Host ""
    Write-Host "[Step $num] $msg" -ForegroundColor Blue
    Write-Host ("─" * 60) -ForegroundColor DarkGray
}

function Write-Info($msg)    { Write-Host "  i  $msg" -ForegroundColor Cyan }
function Write-Ok($msg)      { Write-Host "  ✓  $msg" -ForegroundColor Green }
function Write-Warn($msg)    { Write-Host "  ⚠  $msg" -ForegroundColor Yellow }
function Write-Fail($msg)    { Write-Host "  ✗  $msg" -ForegroundColor Red; exit 1 }

# --- Banner -----------------------------------------------------------------
Write-Host ""
Write-Host "╔══════════════════════════════════════════════════════╗" -ForegroundColor White
Write-Host "║  $APP_NAME — Startup Script (Windows)             ║" -ForegroundColor Cyan
Write-Host "║  Vite 8 + React 19 + pnpm                            ║" -ForegroundColor DarkGray
Write-Host "╚══════════════════════════════════════════════════════╝" -ForegroundColor White

# --- Step 1: Verify Node.js -------------------------------------------------
Write-Step 1 "Checking Node.js installation"

$nodePath = Get-Command node -ErrorAction SilentlyContinue
if ($nodePath) {
    $nodeVersion = & node --version
    Write-Ok "Node.js found: $nodeVersion"
    
    # Check minimum version
    $nodeMajor = [int]($nodeVersion -replace 'v','').Split('.')[0]
    if ($nodeMajor -lt 20) {
        Write-Warn "Node.js $nodeVersion detected. Vite 8 requires Node 20.19+ or 22.12+"
        Write-Warn "Please upgrade: https://nodejs.org/"
    }
} else {
    Write-Fail "Node.js not found. Install Node 20+ from: https://nodejs.org/"
}

# --- Step 2: Install pnpm ---------------------------------------------------
Write-Step 2 "Checking pnpm installation"

$pnpmPath = Get-Command pnpm -ErrorAction SilentlyContinue
if ($pnpmPath) {
    $pnpmVersion = & pnpm --version
    Write-Ok "pnpm found: $pnpmVersion"
} else {
    Write-Info "Installing pnpm..."
    
    $corepack = Get-Command corepack -ErrorAction SilentlyContinue
    if ($corepack) {
        & corepack enable
        & corepack prepare pnpm@latest --activate 2>$null
    }
    
    if (-not (Get-Command pnpm -ErrorAction SilentlyContinue)) {
        Write-Info "Installing pnpm via npm..."
        & npm install -g pnpm
    }
    
    if (Get-Command pnpm -ErrorAction SilentlyContinue) {
        Write-Ok "pnpm installed: $(pnpm --version)"
    } else {
        Write-Fail "pnpm installation failed. Try: npm install -g pnpm"
    }
}

# --- Step 3: Install dependencies -------------------------------------------
Write-Step 3 "Installing Node.js dependencies"

Set-Location $PSScriptRoot

if (Test-Path "pnpm-lock.yaml") {
    Write-Info "Lock file found: pnpm-lock.yaml"
    & pnpm install --frozen-lockfile 2>$null
    if ($LASTEXITCODE -ne 0) { & pnpm install }
    Write-Ok "Dependencies installed from lock file"
} elseif (Test-Path "package-lock.json") {
    Write-Info "Found package-lock.json. Migrating to pnpm..."
    & pnpm import 2>$null
    & pnpm install
    Write-Ok "Migrated to pnpm. You can delete package-lock.json"
    Write-Info "  → pnpm-lock.yaml has been generated"
} else {
    Write-Info "No lock file found. Installing fresh..."
    & pnpm install
    Write-Info "Generated pnpm-lock.yaml — commit this to version control"
    Write-Ok "Dependencies installed"
}

# --- Step 4: Save runtime config --------------------------------------------
@"
APP_PORT=$APP_PORT
APP_NAME=$APP_NAME
STARTED_AT=$(Get-Date -Format "yyyy-MM-ddTHH:mm:ssZ")
PROJECT_TYPE=vite-react
"@ | Set-Content ".run.env"

Write-Ok "Runtime config saved to .run.env"
Write-Info "Add .run.env to your .gitignore"

# --- Step 5: Start the app ----------------------------------------------------
Write-Step 4 "Starting $APP_NAME"

# Check if port is in use
$inUse = Get-NetTCPConnection -LocalPort $APP_PORT -ErrorAction SilentlyContinue
if ($inUse) {
    Write-Warn "Port $APP_PORT is already in use!"
    Write-Warn "Run .\stop.ps1 first, or Vite will auto-select another port."
    Write-Host ""
}

Write-Host ""
Write-Host "╔══════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║  $APP_NAME is starting...                         ║" -ForegroundColor Green
Write-Host "║  Command: $APP_START_CMD                             ║" -ForegroundColor DarkGray
Write-Host "║  Port: $APP_PORT                                          ║" -ForegroundColor DarkGray
Write-Host "║  Stop: .\stop.ps1  or  Ctrl+C                        ║" -ForegroundColor DarkGray
Write-Host "╚══════════════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""

# Start the app
Invoke-Expression $APP_START_CMD