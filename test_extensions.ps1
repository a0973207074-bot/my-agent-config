# Test all extensions and output results to file
$extensions = @(
    "broadcommfd.debugger-for-mainframe",
    "christian-kohler.npm-intellisense",
    "davidanson.vscode-markdownlint",
    "dbaeumer.vscode-eslint",
    "eamodio.gitlens",
    "firefox-devtools.vscode-firefox-debug",
    "jlcodes.antigravity-cockpit",
    "ms-azuretools.vscode-containers",
    "ms-azuretools.vscode-docker",
    "ms-ceintl.vscode-language-pack-zh-hant",
    "ms-edgedevtools.vscode-edge-devtools",
    "ms-python.debugpy",
    "ms-python.pylint",
    "ms-python.python",
    "ms-python.vscode-python-envs",
    "pesosz.antigravity-auto-accept",
    "redhat.java",
    "vscjava.vscode-java-debug",
    "vscjava.vscode-java-test",
    "vscjava.vscode-maven"
)

$failed = @()
$success = @()

foreach ($ext in $extensions) {
    Write-Host "Testing: $ext" -ForegroundColor Cyan
    $result = code --install-extension $ext --force 2>&1
    if ($result -match "Failed|not found|Unable") {
        $failed += $ext
        Write-Host "  FAILED" -ForegroundColor Red
    } else {
        $success += $ext
        Write-Host "  OK" -ForegroundColor Green
    }
}

Write-Host "`n========== SUMMARY ==========" -ForegroundColor Yellow
Write-Host "Failed extensions (need folder copy):" -ForegroundColor Red
$failed | ForEach-Object { Write-Host "  - $_" }

Write-Host "`nSuccessful extensions:" -ForegroundColor Green
$success | ForEach-Object { Write-Host "  - $_" }

$failed | Out-File -FilePath "failed_extensions.txt" -Encoding UTF8
