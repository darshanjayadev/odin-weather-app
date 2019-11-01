const path = require('path')

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: '[name]',
    path: path.resolve(__dirname, 'dist')
  }
}
