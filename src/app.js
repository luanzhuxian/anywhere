const http = require('http')
const path = require('path')
const chalk = require('chalk')
const config = require('./config/defaultConfig')
const route = require('./helper/route')
// const autoOpen = require('./helper/autoOpen')

const { NODE_ENV } = process.env
const { argv } = process

console.info('process.env.NODE_ENV', NODE_ENV)
console.info('process.argv', argv)

// const server = http.createServer((req, res) => {
//   res.statusCode = 200
//   res.setHeader('Content-Type', 'text/html')
//   res.write('<html>')
//   res.write('<body>')
//   res.write('<a>')
//   res.write('Hello World')
//   res.write('</a>')
//   res.write('</body>')
//   res.end('</html>')
// })

class Server {
  constructor (custmizeConfig) {
    this.config = Object.assign({}, config, custmizeConfig)
  }

  start () {
    const { host, port } = this.config

    const server = http.createServer(async (req, res) => {
      const { url } = req
      const filePath = path.join(this.config.root, url)

      route(req, res, filePath, this.config)
    })

    server.listen(port, host, () => {
      const addr = `http://${host}:${port}`

      console.info(chalk.green(`Server running at ${chalk.yellow(addr)}`))
      // autoOpen(addr)
    })
  }
}

module.exports = Server
