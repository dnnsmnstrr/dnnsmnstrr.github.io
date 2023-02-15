module.exports = function (config) {
  config.addPassthroughCopy('src/css')
  config.addPassthroughCopy('src/assets')
  config.addFilter('date_to_string', dateToString)

  return {
    dir: {
      input: "src",
      output: "./_site",
      layouts: "_layouts",
    }
  }
};


function dateToString(value) {
  const date = new Date(value)
  const formatter = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  })
  const parts = formatter.formatToParts(date)
  const month = parts[0].value
  const day = Number(parts[2].value)
  const year = parts[4].value
  const suffix = ['st', 'nd', 'rd'][day - 1] || 'th'

  return month + ' ' + day + suffix + ', ' + year
}