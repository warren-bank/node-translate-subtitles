@echo off

call "%~dp0.\env.bat"

set file_in=%~dp0.\urls.txt
set dir_out=%~dp0.\1-nl-zipped

if not exist "%dir_out%" mkdir "%dir_out%"

set opts=
set opts=%opts% -i "%file_in%" -P "%dir_out%"
set opts=%opts% --referer "https://www.opensubtitles.org/"
set opts=%opts% --content-disposition --no-check-certificate --no-http-keep-alive
set opts=%opts% -nc

wget %opts%
