### [translate-subtitles](https://github.com/warren-bank/node-translate-subtitles)

Command-line utility to use the IBM Watson&trade; Language Translator service to translate subtitle text files.

#### Features:

* supports the following subtitle text file formats:
  - srt
  - vtt

#### Limitations:

* produces translated subtitle text files that contain no style tags

#### Requirements:

* an [IBM Cloud account](https://github.com/warren-bank/node-ibm-watson-language-translator/blob/master/.etc/docs/IBM-Cloud-account.md)
  - API key
  - API URL

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

#### Dependencies:

* Node.js v10.12.0 or higher
  - `--mirror-input-dirs` uses the _recursive_ option for [`fs.mkdirSync`](https://nodejs.org/api/fs.html#fs_fs_mkdirsync_path_options)

#### Legal:

* copyright: [Warren Bank](https://github.com/warren-bank)
* license: [GPL-2.0](https://www.gnu.org/licenses/old-licenses/gpl-2.0.txt)
