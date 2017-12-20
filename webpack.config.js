const path = require('path');
const webpack = require('webpack');

const srcPath = path.resolve(__dirname, './src/frux');
const distPath = path.resolve(__dirname, './dist');

module.exports = {
  entry: {
    'frux': srcPath,
    'frux.min': srcPath,
  },

  output: {
    path: distPath,
    library: 'frux',
    libraryTarget: 'umd',
    filename: '[name].js',
  },

  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
    ],
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true,
    }),
  ],

  resolve: {
    extensions: [
      '.js',
      '.jsx',
    ],
  },

  externals: [
    {
      'react': {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react',
      },
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom',
      },
    },
  ],
};
