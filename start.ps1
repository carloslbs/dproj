$port = 3000
$root = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host "==============================" -ForegroundColor Cyan
Write-Host " SEINFRA/UFG - Dashboard" -ForegroundColor Cyan
Write-Host "==============================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Servindo em: http://localhost:$port" -ForegroundColor Green
Write-Host ""
Write-Host "Pressione Ctrl+C para parar" -ForegroundColor Yellow
Write-Host ""

python -m http.server $port -d $root
