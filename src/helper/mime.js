const path = require('path')

const mimeTypes = {
  'html': 'text/html',
  'xml': 'text/xml',
  'css': 'text/css',
  'js': 'text/javascript',
  'txt': 'text/plain',
  'gif': 'image/gif',
  'jpeg': 'image/jpeg',
  'jpg': 'image/jpg',
  'ico': 'image/ico',
  'png': 'image/png',
  'svg': 'image/svg+xml',
  'tiff': 'image/tiff',
  'json': 'application/json',
  'pdf': 'application/pdf',
  'swf': 'application/x-shockwave-flash',
  'wav': 'audio/x-wav',
  'wma': 'audio/x-ms-wma',
  'wmv': 'image/x-ms-wmv'
}

module.exports = (filePath) => {
  let ext = path.extname(filePath).split('.').pop().toLowerCase()

  if (!ext) {
    ext = filePath
  }

  return mimeTypes[ext] || mimeTypes['txt']
}
