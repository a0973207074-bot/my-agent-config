#!/bin/bash

# Antigravity Full Environment Sync & Setup (Linux/macOS)

echo "========================================================"
echo "  Antigravity Full Environment Sync & Setup (Linux/Mac)"
echo "========================================================"
echo ""

# Define Paths
USER_HOME="$HOME"
AG_EXT_DIR="$USER_HOME/.antigravity/extensions"
GEMINI_DIR="$USER_HOME/.gemini"
AG_DIR="$GEMINI_DIR/antigravity"
SKILLS_DIR="$AG_DIR/global_skills"

# 1. Install VS Code Extensions
echo "[1/5] Installing VS Code Extensions..."
EXT_FILE="configs/vscode/extensions_list.txt"

mkdir -p "$AG_EXT_DIR"

if [ -f "$EXT_FILE" ]; then
    while IFS= read -r ext || [ -n "$ext" ]; do
        # Skip empty lines
        if [ -z "$ext" ]; then continue; fi
        echo "Installing: $ext"
        code --extensions-dir "$AG_EXT_DIR" --install-extension "$ext"
    done < "$EXT_FILE"
else
    echo "[ERROR] Extensions list not found at $EXT_FILE"
fi

echo ""
echo "[2/5] Deploying Antigravity-Specific Extensions..."

# Copy Antigravity Auto Accept
if [ -d "configs/antigravity_extensions/pesosz.antigravity-auto-accept" ]; then
    echo "Copying: Antigravity Auto Accept..."
    target_dir="$AG_EXT_DIR/pesosz.antigravity-auto-accept-1.0.3-universal/"
    mkdir -p "$target_dir"
    cp -r "configs/antigravity_extensions/pesosz.antigravity-auto-accept/"* "$target_dir"
fi

# Copy Antigravity Cockpit
if [ -d "configs/antigravity_extensions/jlcodes.antigravity-cockpit" ]; then
    echo "Copying: Antigravity Cockpit..."
    target_dir="$AG_EXT_DIR/jlcodes.antigravity-cockpit-2.1.4-universal/"
    mkdir -p "$target_dir"
    cp -r "configs/antigravity_extensions/jlcodes.antigravity-cockpit/"* "$target_dir"
fi

# Sync extensions cache
if [ -f "configs/antigravity_extensions/extensions.json" ]; then
    echo "Syncing extensions cache..."
    cp "configs/antigravity_extensions/extensions.json" "$AG_EXT_DIR/extensions.json"
fi

echo ""
echo "[3/5] Deploying Agent Rules & Global Config..."

mkdir -p "$GEMINI_DIR"
mkdir -p "$AG_DIR"

echo "Installing Global Rules..."
cp "rules.md" "$GEMINI_DIR/GEMINI.md"

echo "Installing User Preferences..."
if [ -f "configs/antigravity/user_settings.pb" ]; then
    cp "configs/antigravity/user_settings.pb" "$AG_DIR/user_settings.pb"
fi
if [ -f "configs/antigravity/mcp_config.json" ]; then
    cp "configs/antigravity/mcp_config.json" "$AG_DIR/mcp_config.json"
fi

echo ""
echo "[4/5] Deploying VS Code User Settings..."

# Determine VS Code User path based on OS
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    VSCODE_USER="$HOME/Library/Application Support/Code/User"
else
    # Linux
    VSCODE_USER="$HOME/.config/Code/User"
fi

if [ -d "$VSCODE_USER" ]; then
    cp "configs/vscode/settings.json" "$VSCODE_USER/settings.json"
    echo "VS Code settings updated!"
else
    echo "[SKIP] VS Code User path not found: $VSCODE_USER"
fi

echo ""
echo "[5/5] Deploying Global Skills..."
mkdir -p "$SKILLS_DIR"
cp -r "global_skills/"* "$SKILLS_DIR/"

echo ""
echo "========================================================"
echo "  Setup Complete!"
echo "  - Extensions installed"
echo "  - Antigravity Auto Accept & Cockpit deployed"
echo "  - Global Rules & Preferences deployed to ~/.gemini/GEMINI.md"
echo "  - VS Code Settings synced"
echo "  - Skills installed to global_skills"
echo "========================================================"
