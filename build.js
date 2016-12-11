var autoprefixer = require('autoprefixer')
var cssnano = require('cssnano')
var fs = require('fs')
var htmlmin = require('html-minifier').minify
var postcss = require('postcss')
var sass = require('node-sass')

/**
 * Compile HTML
 * @param  {string} css
 */
var renderHtml = (css) => {
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

  fs.writeFileSync('index.html', minHtml)
}

// Compile CSS

const css = sass.renderSync({ file: 'scss/styles.scss' }).css.toString()

postcss([
  autoprefixer({ browsers: ['last 3 versions'], cascade: false }),
  cssnano
])
  .process(css)
  .then((result) => {
    renderHtml(result.css)
  })
