var webpack = require('webpack');

module.exports = {
  entry: {
    'frux': './src/frux',
    'frux.min': './src/frux'
  },

  output: {
    path: './dist',
    library: 'frux',
    libraryTarget: 'umd',
    filename: '[name].js'
  },

  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      }
    ]
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true
    })
  ],

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
      },
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom'
      }
    }
  ]
};
