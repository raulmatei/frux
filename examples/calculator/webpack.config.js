var path = require('path');

module.exports = {
  entry: {
    javascript: './index'
  },

  output: {
    filename: './dist/application.js'
  },

  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel-loader']
      },

      {
        test: /\.less$/,
        loader: "style!css!less"
      }
    ]
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      'frux': path.join(__dirname, '../../', 'src/frux')
    }
  }
};
