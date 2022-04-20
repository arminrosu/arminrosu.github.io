module.exports = {
  // don't pass staged files as an argument to this script
  '*': () => [
    'yarn lint:js --fix',
    'yarn lint:styles --fix',
    'yarn prettier --loglevel silent --write .',
    'yarn build',
    'git add .',
  ],
}
