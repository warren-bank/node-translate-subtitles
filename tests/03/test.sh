#!/usr/bin/env bash

# declare variables "IBM_TRANSLATOR_API_KEY" and "IBM_TRANSLATOR_API_URL"
source "${HOME}/IBM_TRANSLATOR_API_CREDENTIALS.sh"

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

function translate-subtitles {
  node "${DIR}/../../bin/translate-subtitles.js" "$@"
}

output_path="${DIR}/data"
input_path="${output_path}/file.srt"
log_file="${output_path}/test.log"

translate-subtitles -i 'en' -o 'de' -I "$input_path" -d >"$log_file" 2>&1
