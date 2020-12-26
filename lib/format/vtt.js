const regex = {
  "is_time_range": /^((?:[\d]+:)?(?:[\d]+:)(?:[\d]+)(?:\.[\d]+)?\s+--\>\s+(?:[\d]+:)?(?:[\d]+:)(?:[\d]+)(?:\.[\d]+)?)(?:\s.*)?$/,
  "voice_tags":    /^\<v[\.\s][^\>]+\>/ig,
  "other_tags":    /\<([^\>\s]+)[^\>]*\>(.*?)\<\/\1\s*\>/ig
}

const extract_strings_array = function(input_text) {
  let strings_array = []

  const lines = input_text.split(/\r?\n/).map(line => line.trim())

  const state = {
    active_string: [],
    is_string_block: false
  }

  for (let i=0; i < lines.length; i++) {
    const is_string_start = (regex.is_time_range.test(lines[i]))
    const is_empty_line   = (lines[i] === '')

    if (state.is_string_block) {
      if (!is_empty_line) {
        state.active_string.push( lines[i] )
        continue
      }
      else {
        strings_array.push( state.active_string.join(' ') )
        state.active_string = []
        state.is_string_block = false
        continue
      }
    }

    if (is_string_start) {
      state.is_string_block = true
      continue
    }
  }
  if (state.is_string_block) {
    strings_array.push( state.active_string.join(' ') )

    state.active_string = null
    state.is_string_block = false
  }

  // remove html tags used to style the subtitles text
  strings_array = strings_array.map(str => {
    let new_str = str
    new_str = new_str.replace(regex.voice_tags, '')
    while (regex.other_tags.test(new_str)) {
      new_str = new_str.replace(regex.other_tags, '$2')
    }
    return new_str
  })

  return strings_array
}

const replace_strings_array = function(input_text, translated_strings_array) {
  const output_lines = ['WEBVTT','']

  const lines = input_text.split(/\r?\n/).map(line => line.trim())

  const state = {
    is_string_block: false
  }

  for (let i=0; i < lines.length; i++) {
    const is_string_start = (regex.is_time_range.test(lines[i]))

    if (is_string_start) {
      const time_range = lines[i].replace(regex.is_time_range, '$1')

      output_lines.push(time_range)
      output_lines.push(translated_strings_array.shift())
      output_lines.push('')
    }
  }

  const  output_text = output_lines.join("\r\n")
  return output_text
}

module.exports = {extract_strings_array, replace_strings_array}
