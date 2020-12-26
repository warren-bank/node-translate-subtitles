const help = `
translate-subtitles <options>

options:
========
"-h"
"--help"
    Print a help message describing all command-line options.

"-v"
"--version"
    Display the version.

"-k" <key>
"--api-key" <key>
    [optional] IBM Cloud account API key.
    Default: Value is read from "IBM_TRANSLATOR_API_KEY" environment variable.

"-u" <url>
"--api-url" <url>
    [optional] IBM Cloud account API URL.
    Default: Value is read from "IBM_TRANSLATOR_API_URL" environment variable.

"-i" <language>
"--input-language" <language>
    [required] Language code for input file.

"-o" <language>
"--output-language" <language>
    [optional] Language code for output file.
    note: This flag can be repeated to produce multiple output files.
    note: Input language is ignored.
    Default: Produce output files for all languages.

"-I" <filepath|dirpath>
"--input-path" <filepath|dirpath>
    [required] Filesystem path to input subtitle text file, or
               Filesystem path to input directory containing subtitle text file(s).

"-O" <dirpath>
"--output-path" <dirpath>
    [optional] Filesystem path to output directory.
    Default: Same as the input path.
    Note: For each output language:
          - output file is written in output directory
          - output filename extension includes language code
            (ex: '/out/file.de.srt', '/out/file.zh-TW.srt')

"-r"
"--recurse-input-dirs"
    [optional] Search for subtitle text files within input path subdirectories.
    Precondition: Input path is a directory.
    Default: disabled

"-m"
"--mirror-input-dirs"
    [optional] Mirror relative input directory paths to output directory.
    Precondition: Input path is a directory.
    Precondition: Input path recursion is enabled.
    Default: disabled

"-d"
"--debug"
    [optional] Writes raw data files to output directory.
    note: If enabled, then for each language:
          - output file is written in output directory
          - output filename extension includes language code
            (ex: '/out/debug.en.txt', '/out/debug.de.txt', '/out/debug.zh-TW.txt')
          - file with the input language code contains the list of parsed strings
          - file with an output language code contains the list of translated strings
    Default: disabled

language codes:
===============
  "ar"    Arabic
  "eu"    Basque [1]
  "bn"    Bengali
  "bs"    Bosnian
  "bg"    Bulgarian
  "ca"    Catalan [1]
  "zh"    Chinese (Simplified)
  "zh-TW" Chinese (Traditional)
  "hr"    Croatian
  "cs"    Czech
  "da"    Danish
  "nl"    Dutch
  "en"    English
  "et"    Estonian
  "fi"    Finnish
  "fr"    French
  "fr-CA" French (Canadian)
  "de"    German
  "el"    Greek
  "gu"    Gujarati
  "he"    Hebrew
  "hi"    Hindi
  "hu"    Hungarian
  "ga"    Irish
  "id"    Indonesian
  "it"    Italian
  "ja"    Japanese
  "ko"    Korean
  "lv"    Latvian
  "lt"    Lithuanian
  "ms"    Malay
  "ml"    Malayalam
  "mt"    Maltese
  "cnr"   Montenegrin
  "ne"    Nepali
  "nb"    Norwegian Bokmål
  "pl"    Polish
  "pt"    Portuguese
  "ro"    Romanian
  "ru"    Russian
  "sr"    Serbian
  "si"    Sinhala
  "sk"    Slovak
  "sl"    Slovenian
  "es"    Spanish
  "sv"    Swedish
  "ta"    Tamil
  "te"    Telugu
  "th"    Thai
  "tr"    Turkish
  "uk"    Ukrainian
  "ur"    Urdu
  "vi"    Vietnamese
  "cy"    Welsh

[1] Basque and Catalan are supported only for translation to and from Spanish.
`

module.exports = help
