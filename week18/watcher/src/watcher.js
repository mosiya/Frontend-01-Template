const fsevents = require('fsevents')
// const webpack = require('webpack')
// const httpServer = require('http-server')

const { exec } = require('child_process')

exec('http-server')

const stop = fsevents.watch(__dirname, (path, flags, id) => {
  const info = fsevents.getInfo(path, flags, id)
  console.log('webpack')
  exec('webpack')
})
