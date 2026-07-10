@echo off
echo ==============================
echo  SEINFRA/UFG - Dashboard
echo ==============================
echo.
echo Servindo em: http://localhost:3000
echo.
echo Pressione Ctrl+C para parar
echo.
python -m http.server 3000 -d "%~dp0"
pause
