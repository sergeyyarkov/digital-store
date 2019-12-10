var config = {
  // TODO: Add common Configuration
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  },
};

var mainApp = Object.assign({}, config, {
  entry: ['@babel/polyfill', './src/main/index.js'],
  output: {
    path: `${__dirname}/dist/public/js/main`,
    filename: 'main.js',
  },
  resolve: {
    extensions: ['.js']
  },
});

var adminApp = Object.assign({}, config,{
  entry: ['@babel/polyfill', './src/admin/index.js'],
  output: {
    path: `${__dirname}/dist/public/js/admin`,
    filename: 'admin.js',
  },
  resolve: {
    extensions: ['.js']
  },
});

module.exports = [mainApp, adminApp];
