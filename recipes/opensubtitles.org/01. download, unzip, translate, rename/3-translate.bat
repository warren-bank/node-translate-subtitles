@echo off

call "%~dp0.\env.bat"
call "%USERPROFILE%\IBM_TRANSLATOR_API_CREDENTIALS.bat"

set dir_in=%~dp0.\2-nl
set dir_out=%~dp0.\3-en
set log_file=%dir_out%\test.log

if not exist "%dir_out%" mkdir "%dir_out%"

call translate-subtitles -i nl -o en -I "%dir_in%" -O "%dir_out%" -d >"%log_file%" 2>&1
