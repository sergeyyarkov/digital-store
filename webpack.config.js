module.exports = {
  entry: ['@babel/polyfill', './src/js/index.js'],
  output: {
    path: `${__dirname}/dist/public/js`,
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  }
};
