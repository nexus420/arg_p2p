const path = require('path')

const ROOT = path.join(__dirname, '..')
const APP_PATH = path.join(ROOT, 'app')

module.exports = {
  app: APP_PATH,
  javascript: path.join(APP_PATH, 'js'),
  images: path.join(APP_PATH, 'img'),
  svg: path.join(APP_PATH, 'svg'),
  build: path.join(ROOT, 'build')
}
