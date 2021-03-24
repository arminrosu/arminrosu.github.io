const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const fs = require('fs')
const htmlmin = require('html-minifier').minify
const postcss = require('postcss')
const sass = require('sass')

/**
 * Compile HTML
 * @param  {string} css
 */
const renderHtml = (css) => {
  const banner = fs.readFileSync('html/_banner.html').toString().trim()

  const html = fs.readFileSync('html/index.html')
    .toString()
    .replace('<style />', '<style>' + css + '</style>')

  const minHtml = htmlmin(html, {
    collapseBooleanAttributes: true,
    collapseWhitespace: true,
    minifyJS: true,
    removeComments: true,
    removeEmptyAttributes: true,
    removeRedundantAttributes: true
  })

  fs.writeFileSync('index.html', banner + minHtml)
}

// Compile CSS

const css = sass.renderSync({ file: 'scss/styles.scss' }).css.toString()

postcss([
  autoprefixer({ cascade: false }),
  cssnano
])
  .process(css)
  .then((result) => {
    renderHtml(result.css)
  })
