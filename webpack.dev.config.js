const path = require('path')
const webpack = require('webpack')

module.exports = {
  devtool: 'eval',

  entry: [
    'webpack-hot-middleware/client',
    './src/index'
  ],

  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],

  module: {
    loaders: [
      { test: /\.js?$/,
        loader: 'babel',
        include: path.join(__dirname, 'src')
      },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.scss?$/,
        loader: 'style!css!sass',
        include: path.join(__dirname, 'src', 'styles') },
      {  test: /\.(jpg|png)$/,
        loader: 'url-loader' },

      { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file'}
      // { test: /\.js?$/,
      //   loader: 'babel',
      //   exclude: path.join(__dirname, 'node_modules') },
      // { test: /\.css$/, loader: "style-loader!css-loader" },
      // { test: /\.styl/,
      //   loader: 'style-loader!css-loader!stylus-loader' },
      // { test: /\.png$/,
      //   loader: 'file' },
      // { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
      //   loader: 'file'}
    ]
  }
}
