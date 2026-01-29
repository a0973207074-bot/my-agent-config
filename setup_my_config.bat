@echo off
setlocal enabledelayedexpansion
echo ========================================================
echo   Antigravity Full Environment Sync & Setup
echo   (Run this on your new computer)
echo ========================================================

echo.
echo [1/5] Installing 20 VS Code Extensions to Antigravity...
set "EXT_FILE=configs\vscode\extensions_list.txt"
set "AG_EXT_DIR=%USERPROFILE%\.antigravity\extensions"
if not exist "!AG_EXT_DIR!" mkdir "!AG_EXT_DIR!"

if exist "!EXT_FILE!" (
    for /f "tokens=*" %%i in (!EXT_FILE!) do (
        echo Installing: %%i
        call code --extensions-dir "!AG_EXT_DIR!" --install-extension %%i
    )
) else (
    echo [ERROR] Extensions list not found!
)

echo.
echo [2/5] Deploying Antigravity-Specific Extensions...
set "AG_EXT_DIR=%USERPROFILE%\.antigravity\extensions"
if not exist "!AG_EXT_DIR!" mkdir "!AG_EXT_DIR!"

if exist "configs\antigravity_extensions\pesosz.antigravity-auto-accept" (
    xcopy "configs\antigravity_extensions\pesosz.antigravity-auto-accept" "!AG_EXT_DIR!\pesosz.antigravity-auto-accept-1.0.3-universal\" /E /Y /I
    echo Installed: Antigravity Auto Accept
)

if exist "configs\antigravity_extensions\jlcodes.antigravity-cockpit" (
    xcopy "configs\antigravity_extensions\jlcodes.antigravity-cockpit" "!AG_EXT_DIR!\jlcodes.antigravity-cockpit-2.1.4-universal\" /E /Y /I
    echo Installed: Antigravity Cockpit
)

echo.
echo [3/5] Deploying Agent Rules & Global Config...
set "GEMINI_DIR=%USERPROFILE%\.gemini"
set "AG_DIR=%GEMINI_DIR%\antigravity"

if not exist "!GEMINI_DIR!" mkdir "!GEMINI_DIR!"
if not exist "!AG_DIR!" mkdir "!AG_DIR!"

echo Installing Global Rules...
copy /Y "rules.md" "!GEMINI_DIR!\GEMINI.md"

echo Installing User Preferences...
copy /Y "configs\antigravity\user_settings.pb" "!AG_DIR!\user_settings.pb"
copy /Y "configs\antigravity\mcp_config.json" "!AG_DIR!\mcp_config.json"

echo.
echo [4/5] Deploying VS Code User Settings...
set "VSCODE_USER=%APPDATA%\Code\User"
if exist "!VSCODE_USER!" (
    copy /Y "configs\vscode\settings.json" "!VSCODE_USER!\settings.json"
    echo VS Code settings updated!
) else (
    echo [SKIP] VS Code User path not found.
)

echo.
echo [5/5] Deploying Global Skills...
set "SKILLS_DIR=!AG_DIR!\global_skills"
if not exist "!SKILLS_DIR!" mkdir "!SKILLS_DIR!"
xcopy "global_skills\*" "!SKILLS_DIR!\" /E /Y /I

echo.
echo ========================================================
echo   Setup Complete!
echo   - 20 Extensions installed
echo   - Antigravity Auto Accept ^& Cockpit deployed
echo   - Global Rules ^& Preferences deployed
echo   - VS Code Settings synced
echo   - 22 Skills installed to global_skills
echo ========================================================
pause
