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
      }
    ]
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  externals: [
    {
      'react': {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      }
    }
  ]
};
