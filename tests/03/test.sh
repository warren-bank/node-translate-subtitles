#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# declare variables "LIBRE_TRANSLATE_API_KEY" and "LIBRE_TRANSLATE_API_URL"
source "${DIR}/../LIBRE_TRANSLATE_API_CREDENTIALS.sh"

function translate-subtitles {
  node "${DIR}/../../bin/translate-subtitles.js" "$@"
}

output_path="${DIR}/data"
input_path="${output_path}/file.srt"
log_file="${output_path}/test.log"

translate-subtitles -i 'en' -o 'de' -I "$input_path" --nr --nb -d >"$log_file" 2>&1
