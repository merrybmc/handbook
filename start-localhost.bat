@echo off
setlocal

title SQL Learning Book - Localhost
cd /d "%~dp0"

echo.
echo ==========================================
echo  SQL Learning Book local server
echo ==========================================
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is not installed or not available in PATH.
  echo Please install Node.js first, then run this file again.
  echo.
  pause
  exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
  echo npm is not available in PATH.
  echo Please reinstall Node.js or check your PATH setting.
  echo.
  pause
  exit /b 1
)

if not exist "node_modules" (
  echo Installing packages. This may take a moment...
  call npm install
  if errorlevel 1 (
    echo.
    echo npm install failed.
    pause
    exit /b 1
  )
)

echo Opening browser when the local server is ready...
start "" powershell -NoProfile -ExecutionPolicy Bypass -Command "$port=5173; for ($i=0; $i -lt 90; $i++) { try { $client = [Net.Sockets.TcpClient]::new('127.0.0.1', $port); $client.Close(); Start-Process 'http://127.0.0.1:5173/'; exit 0 } catch { Start-Sleep -Seconds 1 } }; Start-Process 'http://127.0.0.1:5173/'"

echo.
echo Local URL: http://127.0.0.1:5173/
echo Stop server: press Ctrl + C in this window.
echo.

call npm run dev -- --host 127.0.0.1

echo.
echo Server stopped.
pause
