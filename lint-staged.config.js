module.exports = {
  // don't pass staged files as an argument to this script
  '*': () => [
    'yarn prettier --loglevel silent --write .',
    'yarn build',
    'git add .',
  ],
}
