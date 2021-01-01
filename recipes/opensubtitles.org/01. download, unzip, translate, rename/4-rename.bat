@echo off
setlocal enabledelayedexpansion

set dir_in=%~dp0.\3-en
set dir_out=%~dp0.\4-en-renamed

if not exist "%dir_out%" mkdir "%dir_out%"

for /f "usebackq tokens=* delims=" %%f in (`dir /B "%dir_in%\*.srt"`) do (
  set fname=%%f
  set dname=!fname:.srt=!
  mkdir "%dir_out%\!dname!"
  copy "%dir_in%\!fname!" "%dir_out%\!dname!\video.srt"
)

endlocal
