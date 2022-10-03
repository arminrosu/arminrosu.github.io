import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import { readFile, writeFile } from 'fs/promises'
import { minify as htmlmin } from 'html-minifier'
import postcss from 'postcss'
import sass from 'sass'

/**
 * Compile HTML
 * @param {string} css
 */
async function compileHTML(css) {
  const banner = (
    await readFile('./src/html/_banner.html', {
      encoding: 'utf-8',
    })
  ).trim()

  const html = (
    await readFile('./src/html/index.html', {
      encoding: 'utf-8',
    })
  ).replace('<style />', '<style>' + css + '</style>')

  const minHtml = htmlmin(html, {
    collapseBooleanAttributes: true,
    collapseWhitespace: true,
    minifyJS: true,
    removeComments: true,
    removeEmptyAttributes: true,
    removeRedundantAttributes: true,
  })

  return writeFile('./docs/index.html', banner + minHtml, {
    encoding: 'utf-8',
  })
}

async function compileCSS() {
  const css = sass.compile('./src/scss/styles.scss').css

  return postcss([autoprefixer({ cascade: false }), cssnano]).process(css, {
    from: undefined,
  })
}

async function build() {
  const css = await compileCSS()
  await compileHTML(css)
}

build()
