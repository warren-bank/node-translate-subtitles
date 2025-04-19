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
    [optional] LibreTranslate server API key.
    Fallback: Value of the "LIBRE_TRANSLATE_API_KEY" environment variable, if one exists.

"-u" <url>
"--api-url" <url>
    [optional] LibreTranslate server API URL.
    Fallback: Value of the "LIBRE_TRANSLATE_API_URL" environment variable, if one exists.
    Default: "https://libretranslate.com"

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

"--nr"
"--no-replace"
"--no-clobber"
    [optional] Skip output languages for which the output file already exists.
    Default: Disabled. Overwrite if exists.

"--nb"
"--no-break"
"--no-break-on-error"
    [optional] When translating multiple output languages and one encounters an error,
               print a log statement and continue processing the remaining output languages.
    Default: Disabled. The library throws an error, and the command-line utility exits with code.

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
`

module.exports = help
