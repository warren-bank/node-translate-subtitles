### [translate-subtitles](https://github.com/warren-bank/node-translate-subtitles)

Command-line utility to use the [LibreTranslate&trade;](https://github.com/LibreTranslate/LibreTranslate) service to translate subtitle text files.

#### Features:

* supports the following subtitle text file formats:
  - srt
  - vtt

#### Limitations:

* produces translated subtitle text files that contain no style tags

#### Requirements:

* access to a server hosting the [LibreTranslate server API](https://github.com/LibreTranslate/LibreTranslate#mirrors)
  - API key
  - API URL

#### Supported Languages

* a real-time JSON array of supported language objects is returned from the [API](https://libretranslate.com/docs) endpoint: [`/languages`](https://libretranslate.com/languages)
* [this table](https://github.com/warren-bank/node-libre-language-translator#supported-languages) summarizes its response
  - results may vary:
    * over time
    * per server
  - when the `--output-language` option is not specified:
    * a real-time list is obtained of all supported output languages for the specified input language at the specified [LibreTranslate server API](https://github.com/LibreTranslate/LibreTranslate#mirrors)

#### Installation:

```bash
npm install --global @warren-bank/translate-subtitles
```

#### Usage:

```bash
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
```

#### Examples:

1. [example](https://github.com/warren-bank/node-translate-subtitles/tree/master/tests/01): single subtitle text file
   - translate to all supported languages
   - save translations in different output directory

2. [example](https://github.com/warren-bank/node-translate-subtitles/tree/master/tests/02): single subtitle text file
   - translate to one specific language
   - save translation in different output directory

3. [example](https://github.com/warren-bank/node-translate-subtitles/tree/master/tests/03): single subtitle text file
   - translate to one specific language
   - save translation in same directory

4. [example](https://github.com/warren-bank/node-translate-subtitles/tree/master/tests/04): single directory with multiple subtitle text files
   - translate to one specific language
   - save translations in different output directory

5. [example](https://github.com/warren-bank/node-translate-subtitles/tree/master/tests/05): single directory with multiple subtitle text files
   - translate to one specific language
   - save translations in same directory

6. [example](https://github.com/warren-bank/node-translate-subtitles/tree/master/tests/06): nested directory tree with multiple subtitle text files
   - translate to one specific language
   - recurse into input subdirectories
   - save translations in different output directory without mirroring
     * warning:
       - this operation could result in output filename collisions
         * non-unique filenames are assigned a sequentially increasing numeric index
         * for example:
           - `/out/file.de.srt`
           - `/out/file.2.de.srt`
           - `/out/file.3.de.srt`

7. [example](https://github.com/warren-bank/node-translate-subtitles/tree/master/tests/07): nested directory tree with multiple subtitle text files
   - translate to one specific language
   - recurse into input subdirectories
   - save translations in different output directory with mirroring

#### Legal:

* copyright: [Warren Bank](https://github.com/warren-bank)
* license: [GPL-2.0](https://www.gnu.org/licenses/old-licenses/gpl-2.0.txt)
