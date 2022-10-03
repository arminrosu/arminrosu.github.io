import autoprefixer from 'autoprefixer'
import MarkdownIt from 'markdown-it'
import mia from 'markdown-it-abbr'
import mila from 'markdown-it-link-attributes'
import miis from 'markdown-it-imsize'
import cssnano from 'cssnano'
import { readFile, writeFile } from 'fs/promises'
import { minify as htmlmin } from 'html-minifier'
import postcss from 'postcss'
import sass from 'sass'

async function compileCSS() {
  const css = sass.compile('./src/scss/styles.scss').css

  return postcss([autoprefixer({ cascade: false }), cssnano]).process(css, {
    from: undefined,
  })
}

/**
 * Compile HTML
 * @param {string} html - Markdown compiled HTML.
 * @param {string} css - SASS compiled CSS.
 */
async function compileHTML(html, css) {
  const banner = (
    await readFile('./src/html/_banner.html', {
      encoding: 'utf-8',
    })
  ).trim()

  const htmlTemplate = (
    await readFile('./src/html/index.html', {
      encoding: 'utf-8',
    })
  )
    .replace('<style />', '<style>' + css + '</style>')
    .replace('<body />', '<body>' + html + '</body>')

  const minHtml = htmlmin(htmlTemplate, {
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

async function compileMarkdown() {
  const markdown = (
    await readFile('./src/markdown/index.md', {
      encoding: 'utf-8',
    })
  )
    // Prettier comments-out abbreviations: https://github.com/prettier/prettier/issues/5686
    .replace(/\\\*\[/g, '*[')

  const md = new MarkdownIt({})
  md.use(mia)
  md.use(mila, {
    attrs: {
      target: '_blank',
      rel: 'noopener',
    },
  })
  md.use(miis)

  return md.render(markdown)
}

async function build() {
  const html = await compileMarkdown()
  const css = await compileCSS()
  await compileHTML(html, css)
}

build()
