@echo off
cd /d "%~dp0TryON"
start /min python -m uvicorn main:app --reload --port 8000
