const { cache } = require('../config/defaultConfig')
const { maxAge, expires, cacheControl, lastModified, etag } = cache

function refresh (stats, res) {
  if (expires) {
    res.setHeader('Expires', (new Date(Date.now() + maxAge).toUTCString()))
  }

  if (cacheControl) {
    res.setHeader('Cache-Control', `public, max-age=${maxAge}`)
  }

  if (lastModified) {
    res.setHeader('Last-Modified', stats.mtime.toUTCString())
  }

  if (etag) {
    res.setHeader('Etag', `${stats.size}-${stats.mtime}`)
  }
}

module.exports = (stats, req, res) => {
  refresh(stats, res)

  const lastModified = req.headers['if-modified-since']
  const etag = req.headers['if-none-match']

  // 第一次请求
  if (!lastModified && !etag) {
    return false
  }

  if (lastModified && lastModified !== res.getHeader('Last-Modified')) {
    return false
  }

  if (etag && etag !== res.getHeader('Etag')) {
    return false
  }

  return true
}
