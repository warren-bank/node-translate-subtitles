const translate = require('@warren-bank/ibm-watson-language-translator')
const mkdirSync = require('@warren-bank/mkdir-sync')

const lib_srt = require('./format/srt')
const lib_vtt = require('./format/vtt')

const path = require('path')
const fs   = require('fs')

const regex = {
  "file_ext": /^.*\.([^\.]+)$/
}

const get_filename_extension = function(filename) {
  return regex.file_ext.test(filename)
    ? filename.replace(regex.file_ext, `$1`)
    : null
}

const get_output_filenames = function(output_language_codes, filepath, collision_count, is_debug) {
  const input_filename_extension         = get_filename_extension(filepath.input_filename)
  const input_filename_without_extension = filepath.input_filename.substring(0, (filepath.input_filename.length - input_filename_extension.length - 1))
  const output_filename_prefix           = is_debug ? 'debug.' : ''
  const output_file_extension_prefix     = (collision_count > 1) ? `.${collision_count}` : ''
  const output_file_extension_suffix     = is_debug ? `.${input_filename_extension}.txt` : `.${input_filename_extension}`

  return output_language_codes.map(output_language_code => `${output_filename_prefix}${input_filename_without_extension}${output_file_extension_prefix}.${output_language_code}${output_file_extension_suffix}`)
}

const process_filepath = async function(argv_vals, filepath, collision_count) {
  const {input_dirpath, input_filename, output_dirpath, output_filenames, format} = filepath
  const input_filepath = path.join(input_dirpath, input_filename)
  let output_filepath

  let formatter
  switch(format) {
    case 'srt':
      formatter = lib_srt
      break
    case 'vtt':
      formatter = lib_vtt
      break
    default:
      return null
  }

  const input_text = fs.readFileSync(input_filepath, {encoding: 'utf8'})
  if (!input_text)
    return null

  const input_strings_array = formatter.extract_strings_array(input_text)
  if (!input_strings_array || !Array.isArray(input_strings_array) || !input_strings_array.length)
    return null

  let debug_output_filenames
  if (argv_vals["--debug"]) {
    const debug_output_language_codes = [
      argv_vals["--input-language"],
      ...argv_vals["--output-language"]
    ]
    debug_output_filenames = get_output_filenames(debug_output_language_codes, filepath, collision_count, true)

    const debug_output_filename = debug_output_filenames.shift()
    output_filepath = path.join(output_dirpath, debug_output_filename)
    fs.writeFileSync(output_filepath, JSON.stringify(input_strings_array, null, 2), {encoding: 'utf8', flag: 'w'})
  }

  for (let i=0; i < argv_vals["--output-language"].length; i++) {
    const output_language_code = argv_vals["--output-language"][i]
    const translated_strings_array = await translate(
      argv_vals["--api-key"],
      argv_vals["--api-url"],
      argv_vals["--input-language"],
      output_language_code,
      input_strings_array
    )

    if (!translated_strings_array || !Array.isArray(translated_strings_array) || !translated_strings_array.length || (translated_strings_array.length !== input_strings_array.length))
      continue

    if (argv_vals["--debug"]) {
      output_filepath = path.join(output_dirpath, debug_output_filenames[i])
      fs.writeFileSync(output_filepath, JSON.stringify(translated_strings_array, null, 2), {encoding: 'utf8', flag: 'w'})
    }

    const output_text = formatter.replace_strings_array(input_text, translated_strings_array)
    if (!output_text)
      continue

    output_filepath = path.join(output_dirpath, output_filenames[i])
    fs.writeFileSync(output_filepath, output_text, {encoding: 'utf8', flag: 'w'})
  }
}

const get_input_format = function(input_filename) {
  let input_filename_extension = get_filename_extension(input_filename)

  if (!input_filename_extension)
    return null

  // normalize format to lowercase
  input_filename_extension = input_filename_extension.toLowerCase()

  switch(input_filename_extension) {
    case 'srt':
    case 'vtt':
      return input_filename_extension
    default:
      return null
  }
}

const process_subtitle_input_filepath = function(argv_vals, filepaths, relative_dirpath, input_filename) {
  const format = get_input_format(input_filename)
  if (!format)
    return

  const input_dirpath  = path.join(argv_vals["--input-path"], ...relative_dirpath)
  const output_dirpath = argv_vals["--mirror-input-dirs"]
    ? path.join(argv_vals["--output-path"], ...relative_dirpath)
    : argv_vals["--output-path"]

  filepaths.push({input_dirpath, input_filename, output_dirpath, format})
}

const process_subtitle_input_dirpath = function(argv_vals, filepaths, relative_dirpath) {
  const input_dirpath = path.join(argv_vals["--input-path"], ...relative_dirpath)
  const dir           = fs.readdirSync(input_dirpath, {encoding: 'utf8', withFileTypes: true})

  dir.forEach(dirent => {
    if (dirent.isDirectory() && (dirent.name !== '.') && (dirent.name !== '..') && argv_vals["--recurse-input-dirs"])
      process_subtitle_input_dirpath(argv_vals, filepaths, /* relative_dirpath= */ [...relative_dirpath, dirent.name])
    else if (dirent.isFile())
      process_subtitle_input_filepath(argv_vals, filepaths, relative_dirpath, /* input_filename= */ dirent.name)
  })
}

const get_filepaths = function(argv_vals) {
  const filepaths = []  // [{input_dirpath, input_filename, output_dirpath, format}]

  if (argv_vals["--input-file"]) {
    process_subtitle_input_filepath(argv_vals, filepaths, /* relative_dirpath= */ [], /* input_filename= */ argv_vals["--input-file"])
  }
  else {
    process_subtitle_input_dirpath( argv_vals, filepaths, /* relative_dirpath= */ [])
  }

  return filepaths
}

const process_cli = async function(argv_vals){
  const filepaths = get_filepaths(argv_vals)  // [{input_dirpath, input_filename, output_dirpath, format}]

  const promises   = []
  const collisions = {}
  filepaths.forEach(filepath => {
    let collision_count = 0
    if (argv_vals["--recurse-input-dirs"] && !argv_vals["--mirror-input-dirs"]) {
      collision_count = (collisions[filepath.input_filename]) ? collisions[filepath.input_filename] : 0
      collision_count++
      collisions[filepath.input_filename] = collision_count
    }
    filepath.output_filenames = get_output_filenames(argv_vals["--output-language"], filepath, collision_count, false)

    if (argv_vals["--recurse-input-dirs"] && argv_vals["--mirror-input-dirs"]) {
      // no need to check whether directory already exists;
      // polyfill library will silently ignore an error when e.code is 'EEXIST'
      mkdirSync(filepath.output_dirpath, {recursive: true})
    }

    const promise = process_filepath(argv_vals, filepath, collision_count)
    promises.push(promise)
  })

  return Promise.all(promises)
}

module.exports = process_cli
