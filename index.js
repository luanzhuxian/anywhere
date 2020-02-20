const yargs = require('yargs')
const Server = require('./src/app')

const argv = yargs
  .usage('anywhere [options]')
  .option('r', {
    alias: 'root',
    describe: 'root path',
    default: process.cwd()
  })
  .option('h', {
    alias: 'host',
    describe: 'host',
    default: '127.0.0.1'
  })
  .option('p', {
    alias: 'port',
    describe: 'port',
    default: 8080
  })
  .version()
  .alias('v', 'version')
  .help()
  .argv

const server = new Server(argv)
server.start()

