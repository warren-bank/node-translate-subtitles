const regex = {
  "is_index":      /^\d+$/,
  "is_time_range": /^(?:[\d]+:)?(?:[\d]+:)(?:[\d]+)(?:,[\d]+)?\s+--\>\s+(?:[\d]+:)?(?:[\d]+:)(?:[\d]+)(?:,[\d]+)?$/,
  "style_tags":    /(?:\<[\/]?(?:b|i|font)[^\>]*\>)/ig
}

const extract_strings_array = function(input_text) {
  let strings_array = []

  const lines = input_text.split(/\r?\n/).map(line => line.trim())

  let active_string = []
  for (let i=0; i < lines.length; i++) {
    const is_marker_start = (
         ((i + 1) < lines.length)
      && (regex.is_index.test(lines[i]))
      && (regex.is_time_range.test(lines[i+1]))
    )

    if (is_marker_start) {
      if (active_string.length) {
        strings_array.push( active_string.join(' ') )

        active_string = []
      }

      i++
    }
    else if (lines[i]) {
      active_string.push( lines[i] )
    }
  }
  if (active_string.length) {
    strings_array.push( active_string.join(' ') )

    active_string = null
  }

  // remove html tags used to style the subtitles text
  strings_array = strings_array.map(str => str.replace(regex.style_tags, ''))

  return strings_array
}

const replace_strings_array = function(input_text, translated_strings_array) {
  const output_lines = []

  const lines = input_text.split(/\r?\n/).map(line => line.trim())

  let counter = 1
  for (let i=0; i < lines.length; i++) {
    const is_marker_start = (
         ((i + 1) < lines.length)
      && (regex.is_index.test(lines[i]))
      && (regex.is_time_range.test(lines[i+1]))
    )

    if (is_marker_start) {
      output_lines.push(counter)  // output_lines.push(lines[i])
      output_lines.push(lines[i+1])
      output_lines.push(translated_strings_array.shift())
      output_lines.push('')

      counter++
      i++
    }
  }

  const  output_text = output_lines.join("\r\n")
  return output_text
}

module.exports = {extract_strings_array, replace_strings_array}
