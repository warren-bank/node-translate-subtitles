const process_argv = require('@warren-bank/node-process-argv')
const path         = require('path')
const fs           = require('fs')

const get_file_info = (filepath) => {
  const stats = fs.statSync(filepath, {bigint: false, throwIfNoEntry: false})

  return {
    is_directory: (stats ? stats.isDirectory() : false),
    is_file:      (stats ? stats.isFile()      : false)
  }
}

const lang_codes = ['ar','eu','bn','bs','bg','ca','zh','zh-TW','hr','cs','da','nl','en','et','fi','fr','fr-CA','de','el','gu','he','hi','hu','ga','id','it','ja','ko','lv','lt','ms','ml','mt','cnr','ne','nb','pl','pt','ro','ru','sr','si','sk','sl','es','sv','ta','te','th','tr','uk','ur','vi','cy']

const argv_flags = {
  "--help":               {bool: true},
  "--version":            {bool: true},
  "--api-key":            {},
  "--api-url":            {},
  "--input-language":     {enum: lang_codes},
  "--output-language":    {enum: lang_codes, many: true},
  "--input-path":         {file: "path-exists"},
  "--output-path":        {file: "path-exists"},
  "--recurse-input-dirs": {bool: true},
  "--mirror-input-dirs":  {bool: true},
  "--debug":              {bool: true}
}

const argv_flag_aliases = {
  "--help":               ["-h"],
  "--version":            ["-v"],
  "--api-key":            ["-k"],
  "--api-url":            ["-u"],
  "--input-language":     ["-i"],
  "--output-language":    ["-o"],
  "--input-path":         ["-I"],
  "--output-path":        ["-O"],
  "--recurse-input-dirs": ["-r"],
  "--mirror-input-dirs":  ["-m"],
  "--debug":              ["-d"]
}

let argv_vals = {}

try {
  argv_vals = process_argv(argv_flags, argv_flag_aliases)
}
catch(e) {
  console.log('ERROR: ' + e.message)
  process.exit(1)
}

if (argv_vals["--help"]) {
  const help = require('./help')
  console.log(help)
  process.exit(0)
}

if (argv_vals["--version"]) {
  const data = require('../../package.json')
  console.log(data.version)
  process.exit(0)
}

argv_vals["--api-key"] = argv_vals["--api-key"] || process.env["IBM_TRANSLATOR_API_KEY"]
argv_vals["--api-url"] = argv_vals["--api-url"] || process.env["IBM_TRANSLATOR_API_URL"]

if (!argv_vals["--api-key"]) {
  console.log('ERROR: IBM Cloud account API key is required')
  process.exit(1)
}

if (!argv_vals["--api-url"]) {
  console.log('ERROR: IBM Cloud account API URL is required')
  process.exit(1)
}

if (!argv_vals["--input-language"]) {
  console.log('ERROR: Language code for input file is required')
  process.exit(1)
}

if (!argv_vals["--output-language"] || !argv_vals["--output-language"].length) {
  argv_vals["--output-language"] = lang_codes.filter(lang => (lang !== argv_vals["--input-language"]))
}

// filter restricted translation pairs
{
  const whitelist = {
    "eu": ["es"],
    "ca": ["es"]
  }

  const valid_translation_pair = (src, dst) => {
    const invalid = (
      (whitelist[src] && (whitelist[src].indexOf(dst) === -1)) ||
      (whitelist[dst] && (whitelist[dst].indexOf(src) === -1))
    )
    return !invalid
  }

  argv_vals["--output-language"] = argv_vals["--output-language"].filter(
    dst => valid_translation_pair(argv_vals["--input-language"], dst)
  )
}

if (!argv_vals["--output-language"] || !argv_vals["--output-language"].length) {
  console.log('ERROR: Language code for output file is required')
  process.exit(1)
}

if (!argv_vals["--input-path"]) {
  console.log('ERROR: Input path is required')
  process.exit(1)
}
else {
  const info = get_file_info(argv_vals["--input-path"])

  // condition should never be truthy, as path was resolved by realpath
  if (! (info.is_directory || info.is_file)) {
    console.log('ERROR: Input path is neither a file nor a directory')
    process.exit(1)
  }

  if (info.is_file) {
    argv_vals["--input-file"] = path.basename(argv_vals["--input-path"])
    argv_vals["--input-path"] = path.dirname( argv_vals["--input-path"])
  }
}

if (argv_vals["--output-path"]) {
  const info = get_file_info(argv_vals["--output-path"])

  // condition should never be truthy, as path was resolved by realpath
  if (! info.is_directory) {
    console.log('ERROR: Output path is not a directory')
    process.exit(1)
  }
}
else {
  argv_vals["--output-path"] = argv_vals["--input-path"]
}

module.exports = argv_vals
