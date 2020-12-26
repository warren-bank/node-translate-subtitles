@echo off

rem :: declare variables "IBM_TRANSLATOR_API_KEY" and "IBM_TRANSLATOR_API_URL"
call "%USERPROFILE%\IBM_TRANSLATOR_API_CREDENTIALS.bat"

set DIR=%~dp0.
goto :start

:translate-subtitles
  call node "%DIR%\..\..\bin\translate-subtitles.js" %*
  goto :eof

:start
set input_path=%DIR%\1-input
set output_path=%DIR%\2-output
set log_file=%output_path%\test.log

if exist "%output_path%" rmdir /Q /S "%output_path%"
mkdir "%output_path%"

call :translate-subtitles -i "en" -o "es" -I "%input_path%" -O "%output_path%" -d >"%log_file%" 2>&1
