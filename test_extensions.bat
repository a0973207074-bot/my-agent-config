@echo off
echo Testing extension availability on Marketplace...
echo.

echo Testing: broadcommfd.debugger-for-mainframe
code --install-extension broadcommfd.debugger-for-mainframe --force 2>&1 | findstr /C:"Failed" && echo FAILED || echo OK
echo.

echo Testing: christian-kohler.npm-intellisense
code --install-extension christian-kohler.npm-intellisense --force 2>&1 | findstr /C:"Failed" && echo FAILED || echo OK
echo.

echo Testing: davidanson.vscode-markdownlint
code --install-extension davidanson.vscode-markdownlint --force 2>&1 | findstr /C:"Failed" && echo FAILED || echo OK
echo.

echo Testing: dbaeumer.vscode-eslint
code --install-extension dbaeumer.vscode-eslint --force 2>&1 | findstr /C:"Failed" && echo FAILED || echo OK
echo.

echo Testing: eamodio.gitlens
code --install-extension eamodio.gitlens --force 2>&1 | findstr /C:"Failed" && echo FAILED || echo OK
echo.

echo Testing: firefox-devtools.vscode-firefox-debug
code --install-extension firefox-devtools.vscode-firefox-debug --force 2>&1 | findstr /C:"Failed" && echo FAILED || echo OK
echo.

echo Testing: jlcodes.antigravity-cockpit
code --install-extension jlcodes.antigravity-cockpit --force 2>&1 | findstr /C:"Failed" && echo FAILED || echo OK
echo.

echo Testing: ms-azuretools.vscode-containers
code --install-extension ms-azuretools.vscode-containers --force 2>&1 | findstr /C:"Failed" && echo FAILED || echo OK
echo.

echo Testing: ms-azuretools.vscode-docker
code --install-extension ms-azuretools.vscode-docker --force 2>&1 | findstr /C:"Failed" && echo FAILED || echo OK
echo.

echo Testing: ms-ceintl.vscode-language-pack-zh-hant
code --install-extension ms-ceintl.vscode-language-pack-zh-hant --force 2>&1 | findstr /C:"Failed" && echo FAILED || echo OK
echo.

echo Testing: ms-edgedevtools.vscode-edge-devtools
code --install-extension ms-edgedevtools.vscode-edge-devtools --force 2>&1 | findstr /C:"Failed" && echo FAILED || echo OK
echo.

echo Testing: ms-python.debugpy
code --install-extension ms-python.debugpy --force 2>&1 | findstr /C:"Failed" && echo FAILED || echo OK
echo.

echo Testing: ms-python.pylint
code --install-extension ms-python.pylint --force 2>&1 | findstr /C:"Failed" && echo FAILED || echo OK
echo.

echo Testing: ms-python.python
code --install-extension ms-python.python --force 2>&1 | findstr /C:"Failed" && echo FAILED || echo OK
echo.

echo Testing: ms-python.vscode-python-envs
code --install-extension ms-python.vscode-python-envs --force 2>&1 | findstr /C:"Failed" && echo FAILED || echo OK
echo.

echo Testing: pesosz.antigravity-auto-accept
code --install-extension pesosz.antigravity-auto-accept --force 2>&1 | findstr /C:"Failed" && echo FAILED || echo OK
echo.

echo Testing: redhat.java
code --install-extension redhat.java --force 2>&1 | findstr /C:"Failed" && echo FAILED || echo OK
echo.

echo Testing: vscjava.vscode-java-debug
code --install-extension vscjava.vscode-java-debug --force 2>&1 | findstr /C:"Failed" && echo FAILED || echo OK
echo.

echo Testing: vscjava.vscode-java-test
code --install-extension vscjava.vscode-java-test --force 2>&1 | findstr /C:"Failed" && echo FAILED || echo OK
echo.

echo Testing: vscjava.vscode-maven
code --install-extension vscjava.vscode-maven --force 2>&1 | findstr /C:"Failed" && echo FAILED || echo OK
echo.

pause
