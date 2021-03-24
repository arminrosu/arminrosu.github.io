module.exports = {
  // don't pass staged files as an argument to this script
  '*': () => [
    'yarn build',
    'git add index.html'
  ]
}
