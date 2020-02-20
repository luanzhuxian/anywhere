const fs = require('fs')
const path = require('path')
const promisify = require('util').promisify
const pug = require('pug')
const { root } = require('../config/defaultConfig')
const mime = require('./mime')
const compress = require('./compress')
const range = require('./range')
const checkCacheValid = require('./cache')

const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)

module.exports = async (req, res, filePath, config) => {
  if (~filePath.indexOf('favicon.ico')) return res.end()

  try {
    const stats = await stat(filePath)

    if (stats.isFile()) {
      let rs
      const { code, start, end } = range(stats.size, req, res)
      const contentType = mime(filePath)

      res.statusCode = code
      res.setHeader('Content-Type', contentType)

      // 缓存
      if (checkCacheValid(stats, req, res)) {
        res.statusCode = 304
        res.end()
        return
      }

      // range
      if (code === 200) {
        rs = fs.createReadStream(filePath)
      } else {
        rs = fs.createReadStream(filePath, { start, end })
      }

      // 压缩
      if (filePath.match(config.compress)) {
        rs = compress(rs, req, res)
      }

      rs.pipe(res)
      // fs.readFile(filePath, (err, data) => {
      //   res.end(data)
      // })
      return
    }

    if (stats.isDirectory()) {
      const files = await readdir(filePath)

      // const root = path.join(__dirname, '../')
      const basename = path.basename(filePath)
      const dirname = path.relative(root, filePath)
      const tplPath = path.join(__dirname, '../template/dir.pug')
      const html = pug.renderFile(tplPath, {
        pretty: true,
        title: basename,
        dirname: dirname ? `/${dirname}` : '',
        files
      })

      res.statusCode = 200
      res.setHeader('Content-Type', 'text/html')
      res.end(html)
    }
  } catch (error) {
    console.error(error)
    res.statusCode = 400
    res.setHeader('Content-Type', 'text/plain')
    res.end(`no such file or directory, ${filePath} \n ${error.toString()}`)
  }


  // 回调
  // fs.stat(filePath, (err, stats) => {
  //   if (err) {
  //     res.statusCode = 400
  //     res.setHeader('Content-Type', 'text/plain')
  //     res.end(`${filePath} is not a directory or file`)
  //     return
  //   }
  //   if (stats.isFile()) {
  //     res.statusCode = 200
  //     res.setHeader('Content-Type', 'text/plain')
  //     fs.readFile(filePath, (err, data) => {
  //       res.end(data)
  //     })
  //     fs.createReadStream(filePath).pipe(res)
  //     return
  //   }
  //   if (stats.isDirectory()) {
  //     fs.readdir(filePath, (err, files) => {
  //       res.statusCode = 200
  //       res.setHeader('Content-Type', 'text/plain')
  //       res.end(files.join('\n'))
  //     })
  //   }
  // })
}
