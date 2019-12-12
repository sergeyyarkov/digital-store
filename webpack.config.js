const path = require('path');

module.exports = {
  entry: {
    admin: ['@babel/polyfill', './src/admin/index.js'],
    main: ['@babel/polyfill', './src/main/index.js']
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, '/dist/public/js/')
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  },
  devServer: {
    contentBase: './dist/public/js',
    proxy: {
      "/": 'http://localhost:3000'
    },
  }
}