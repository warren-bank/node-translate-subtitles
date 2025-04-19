@echo off

set DIR=%~dp0.

rem :: declare variables "LIBRE_TRANSLATE_API_KEY" and "LIBRE_TRANSLATE_API_URL"
call "%DIR%\..\LIBRE_TRANSLATE_API_CREDENTIALS.bat"

goto :start

:translate-subtitles
  call node "%DIR%\..\..\bin\translate-subtitles.js" %*
  goto :eof

:start
set input_path=%DIR%\1-input\file.srt
set output_path=%DIR%\2-output
set log_file=%output_path%\test.log

if exist "%output_path%" rmdir /Q /S "%output_path%"
mkdir "%output_path%"

call :translate-subtitles -i "en" -o "fr" -I "%input_path%" -O "%output_path%" --nr --nb -d >"%log_file%" 2>&1
