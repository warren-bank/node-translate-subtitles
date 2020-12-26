@echo off

rem :: declare variables "IBM_TRANSLATOR_API_KEY" and "IBM_TRANSLATOR_API_URL"
call "%USERPROFILE%\IBM_TRANSLATOR_API_CREDENTIALS.bat"

set DIR=%~dp0.
goto :start

:translate-subtitles
  call node "%DIR%\..\..\bin\translate-subtitles.js" %*
  goto :eof

:start
set output_path=%DIR%\data
set input_path=%output_path%\file.srt
set log_file=%output_path%\test.log

call :translate-subtitles -i "en" -o "de" -I "%input_path%" -d >"%log_file%" 2>&1
