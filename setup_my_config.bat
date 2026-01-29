@echo off
echo ========================================================
echo   Agent Config & Skills Setup Script
echo   (Run this on your new computer)
echo ========================================================

echo.
echo [1/3] Installing VS Code Extensions...
echo Installing: denoland.vscode-deno
call code --install-extension denoland.vscode-deno
echo Installing: github.copilot
call code --install-extension github.copilot
echo Installing: github.copilot-chat
call code --install-extension github.copilot-chat
echo Installing: ms-python.vscode-pylance
call code --install-extension ms-python.vscode-pylance
echo Installing: ms-python.python
call code --install-extension ms-python.python
echo Installing: ms-python.debugpy
call code --install-extension ms-python.debugpy

echo.
echo [2/3] Installing Global Rules...
echo Target: %USERPROFILE%\.gemini\GEMINI.md

if not exist "%USERPROFILE%\.gemini" (
    mkdir "%USERPROFILE%\.gemini"
)

copy /Y "rules.md" "%USERPROFILE%\.gemini\GEMINI.md"
echo Rules installed successfully!

echo.
echo [3/3] Installing Skills to Global Path...
echo Target: %USERPROFILE%\.gemini\antigravity\global_skills

if not exist "%USERPROFILE%\.gemini\antigravity\global_skills" (
    mkdir "%USERPROFILE%\.gemini\antigravity\global_skills"
)

xcopy "skills\*" "%USERPROFILE%\.gemini\antigravity\global_skills\" /E /Y /I

echo.
echo ========================================================
echo   Setup Complete!
echo   - Extensions: Installed
echo   - Rules: Installed to GEMINI.md
echo   - Skills: Copied to global_skills
echo ========================================================
pause
