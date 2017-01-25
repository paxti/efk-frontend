const path = require('path')
const express = require('express')

module.exports = {
  app: function () {
    const app = express()
    const indexPath = path.join(__dirname, 'index.html')
    const publicPath = express.static(path.join(__dirname, 'public'))
    const lighningPath = express.static(path.join(__dirname, './node_modules/@salesforce-ux/design-system/assets'))

    app.use('/public', publicPath)
    app.use('/assets', lighningPath)
    app.get('/', function (_, res) { res.sendFile(indexPath) })

    return app
  }
}
