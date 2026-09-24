@echo off
title Millenium Tech - WhatsApp Bot
cd /d %~dp0

:loop
node index.js
echo.
echo Bot stopped or crashed. Restarting in 5 seconds... (close this window to stop for good)
timeout /t 5 >nul
goto loop