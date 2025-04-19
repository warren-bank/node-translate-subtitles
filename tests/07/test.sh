#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# declare variables "LIBRE_TRANSLATE_API_KEY" and "LIBRE_TRANSLATE_API_URL"
source "${DIR}/../LIBRE_TRANSLATE_API_CREDENTIALS.sh"

function translate-subtitles {
  node "${DIR}/../../bin/translate-subtitles.js" "$@"
}

input_path="${DIR}/1-input"
output_path="${DIR}/2-output"
log_file="${output_path}/test.log"

[ -d "$output_path" ] && rm -rf "$output_path"
mkdir -p "$output_path"

translate-subtitles -i 'en' -o 'ru' -I "$input_path" -O "$output_path" -r -m --nr --nb -d >"$log_file" 2>&1
