@echo off

call "%~dp0.\env.bat"

set dir_in=%~dp0.\1-nl-zipped
set dir_out=%~dp0.\2-nl

if not exist "%dir_out%" mkdir "%dir_out%"

7z e "%dir_in%\*.zip" -o"%dir_out%" *.srt -r
