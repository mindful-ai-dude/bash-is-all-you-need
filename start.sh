#!/usr/bin/env bash
# ============================================================================
#  start.sh — Bash Is All You Need App Startup Script
# ============================================================================
#  Detects your OS, installs pnpm (if needed), installs dependencies,
#  and starts the Vite development server.
#
#  Works on: macOS, Linux (Ubuntu/Debian/Fedora/Arch), Windows (WSL/Git Bash)
#
#  Usage:
#    chmod +x start.sh    ← (first time only)
#    ./start.sh            ← run it
#
#  For Windows without WSL or Git Bash, see start.ps1
# ============================================================================

set -euo pipefail

# ┌────────────────────────────────────────────────────────────────────────────┐
# │  CONFIGURATION                                                            │
# └────────────────────────────────────────────────────────────────────────────┘

# Application start command (Vite dev server)
APP_START_CMD="pnpm run dev"

# Port the Vite dev server runs on (default: 5173)
APP_PORT=5173

# Name shown in terminal output
APP_NAME="Bash Is All You Need"

# ┌────────────────────────────────────────────────────────────────────────────┐
# │  DO NOT EDIT BELOW THIS LINE                                              │
# └────────────────────────────────────────────────────────────────────────────┘

# --- Colors & Formatting ---------------------------------------------------
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
BOLD='\033[1m'
DIM='\033[2m'
NC='\033[0m' # No Color

step_num=0
step() {
    step_num=$((step_num + 1))
    echo ""
    echo -e "${BLUE}${BOLD}[Step ${step_num}]${NC} ${BOLD}$1${NC}"
    echo -e "${DIM}$(printf '%.0s─' {1..60})${NC}"
}

info()    { echo -e "  ${CYAN}ℹ${NC}  $1"; }
success() { echo -e "  ${GREEN}✓${NC}  $1"; }
warn()    { echo -e "  ${YELLOW}⚠${NC}  $1"; }
fail()    { echo -e "  ${RED}✗${NC}  $1"; exit 1; }

# --- Banner -----------------------------------------------------------------
echo ""
echo -e "${BOLD}╔══════════════════════════════════════════════════════╗${NC}"
echo -e "${BOLD}║${NC}  ${CYAN}${BOLD}${APP_NAME}${NC} — Startup Script                ${BOLD}║${NC}"
echo -e "${BOLD}║${NC}  ${DIM}Vite 8 + React 19 + pnpm${NC}                         ${BOLD}║${NC}"
echo -e "${BOLD}╚══════════════════════════════════════════════════════╝${NC}"

# --- Step 1: Detect OS -----------------------------------------------------
step "Detecting operating system"

OS="unknown"
ARCH="$(uname -m)"

case "$(uname -s)" in
    Linux*)
        if grep -qi microsoft /proc/version 2>/dev/null; then
            OS="wsl"
            info "Detected: Windows Subsystem for Linux (WSL)"
        else
            OS="linux"
            if [ -f /etc/os-release ]; then
                . /etc/os-release
                info "Detected: Linux ($NAME $VERSION_ID) — $ARCH"
            else
                info "Detected: Linux — $ARCH"
            fi
        fi
        ;;
    Darwin*)
        OS="macos"
        info "Detected: macOS — $ARCH"
        ;;
    CYGWIN*|MINGW*|MSYS*)
        OS="windows-bash"
        info "Detected: Windows (Git Bash/MSYS2) — $ARCH"
        ;;
    *)
        fail "Unsupported operating system: $(uname -s). Use WSL on Windows."
        ;;
esac

success "OS detection complete"

# --- Step 2: Verify Node.js is installed -----------------------------------
step "Checking Node.js installation"

if command -v node &>/dev/null; then
    NODE_VERSION=$(node --version)
    success "Node.js found: $NODE_VERSION"
    
    # Check minimum version (Node 20+ required for Vite 8)
    NODE_MAJOR=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_MAJOR" -lt 20 ]; then
        warn "Node.js $NODE_VERSION detected. Vite 8 requires Node 20.19+ or 22.12+"
        warn "Please upgrade: https://nodejs.org/"
    fi
else
    fail "Node.js not found. Install Node 20+ from: https://nodejs.org/"
fi

# --- Step 3: Install pnpm (if needed) --------------------------------------
step "Checking pnpm installation"

if command -v pnpm &>/dev/null; then
    PNPM_VERSION=$(pnpm --version)
    success "pnpm found: $PNPM_VERSION"
else
    info "pnpm not found. Installing..."
    
    if command -v corepack &>/dev/null; then
        info "Using corepack to enable pnpm..."
        corepack enable
        corepack prepare pnpm@latest --activate 2>/dev/null || npm install -g pnpm
    else
        info "Installing pnpm via npm..."
        npm install -g pnpm
    fi
    
    if command -v pnpm &>/dev/null; then
        success "pnpm installed: $(pnpm --version)"
    else
        fail "pnpm installation failed. Try: npm install -g pnpm"
    fi
fi

# --- Step 4: Install dependencies -----------------------------------------
step "Installing Node.js dependencies"

cd "$(dirname "$0")"

if [ -f "pnpm-lock.yaml" ]; then
    info "Lock file found: pnpm-lock.yaml"
    pnpm install --frozen-lockfile 2>/dev/null || pnpm install
    success "Dependencies installed from lock file"
elif [ -f "package-lock.json" ]; then
    info "Found package-lock.json. Migrating to pnpm..."
    pnpm import 2>/dev/null || true
    pnpm install
    success "Migrated to pnpm. You can delete package-lock.json"
    info "  → pnpm-lock.yaml has been generated"
else
    info "No lock file found. Installing fresh..."
    pnpm install
    info "Generated pnpm-lock.yaml — commit this to version control"
    success "Dependencies installed"
fi

# --- Step 5: Save runtime config for stop.sh -------------------------------
step "Saving runtime configuration"

cat > .run.env << EOF
# Auto-generated by start.sh — do not edit manually
APP_PORT=${APP_PORT}
APP_NAME="${APP_NAME}"
APP_PID=$$
STARTED_AT=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
PROJECT_TYPE=vite-react
EOF

success "Runtime config saved to .run.env"
info "Add .run.env to your .gitignore"

# --- Step 6: Start the application -----------------------------------------
step "Starting ${APP_NAME}"

# Check if port is already in use
if lsof -ti :"$APP_PORT" &>/dev/null || ss -tlnp 2>/dev/null | grep -q ":$APP_PORT "; then
    warn "Port $APP_PORT is already in use!"
    warn "Run ./stop.sh first, or Vite will auto-select another port."
    echo ""
fi

echo ""
echo -e "${GREEN}${BOLD}╔══════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}${BOLD}║${NC}  ${GREEN}${BOLD}${APP_NAME} is starting...${NC}                      ${GREEN}${BOLD}║${NC}"
echo -e "${GREEN}${BOLD}║${NC}  ${DIM}Command: ${APP_START_CMD}${NC}"
echo -e "${GREEN}${BOLD}║${NC}  ${DIM}Port:    ${APP_PORT}${NC}"
echo -e "${GREEN}${BOLD}║${NC}  ${DIM}Stop:    ./stop.sh${NC}"
echo -e "${GREEN}${BOLD}╚══════════════════════════════════════════════════════╝${NC}"
echo ""

# Run the app (exec replaces the shell so signals pass through cleanly)
exec $APP_START_CMD