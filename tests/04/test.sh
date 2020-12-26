#!/usr/bin/env bash

# declare variables "IBM_TRANSLATOR_API_KEY" and "IBM_TRANSLATOR_API_URL"
source "${HOME}/IBM_TRANSLATOR_API_CREDENTIALS.sh"

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

function translate-subtitles {
  node "${DIR}/../../bin/translate-subtitles.js" "$@"
}

input_path="${DIR}/1-input"
output_path="${DIR}/2-output"
log_file="${output_path}/test.log"

[ -d "$output_path" ] && rm -rf "$output_path"
mkdir -p "$output_path"

translate-subtitles -i 'en' -o 'es' -I "$input_path" -O "$output_path" -d >"$log_file" 2>&1
