const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const fs = require('fs')
const htmlmin = require('html-minifier').minify
const path = require('path')
const postcss = require('postcss')
const sass = require('sass')

/**
 * Compile HTML
 * @param {string} css
 */
const renderHtml = (css) => {
  const banner = fs
    .readFileSync(path.resolve(__dirname, '../src/html/_banner.html'))
    .toString()
    .trim()

  const html = fs
    .readFileSync(path.resolve(__dirname, '../src/html/index.html'))
    .toString()
    .replace('<style />', '<style>' + css + '</style>')

  const minHtml = htmlmin(html, {
    collapseBooleanAttributes: true,
    collapseWhitespace: true,
    minifyJS: true,
    removeComments: true,
    removeEmptyAttributes: true,
    removeRedundantAttributes: true,
  })

  fs.writeFileSync(
    path.resolve(__dirname, '../docs/index.html'),
    banner + minHtml
  )
}

// Compile CSS
const css = sass
  .renderSync({ file: path.resolve(__dirname, '../src/scss/styles.scss') })
  .css.toString()

postcss([autoprefixer({ cascade: false }), cssnano])
  .process(css, {
    from: undefined,
  })
  .then((result) => {
    renderHtml(result.css)
  })
