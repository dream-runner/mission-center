var path = require('path')
var webpack = require('webpack')
var ctx = process.env.CTX_ENV ? process.env.CTX_ENV : ''
var CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  devtool: 'source-map',
  entry: [
    './index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'CTX_ENV': JSON.stringify(ctx)
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new CopyWebpackPlugin([
      {
        from: './style/index.css',
        to: '/Users/zhengxingcheng/work/yonyou/iweb_cloudform/iform_parent/iform_parent/design/src/main/webapp/static/css/design/mission-center.css'
      },
      {
        from: './img/**',
        to: '/Users/zhengxingcheng/work/yonyou/iweb_cloudform/iform_parent/iform_parent/design/src/main/webapp/static/'
      },
      {
        from: {
          glob: '**/*',
          dot: true
        },
        to: '/Users/zhengxingcheng/work/yonyou/iweb_cloudform/iform_parent/iform_parent/design/src/main/webapp/static/js/design/mission-center'
      }
    ],
    {
      ignore: [
        {
          glob: '**/node_modules/**/*',
          dot: true
        },
        '**/.DS_Store',
        '**/*test*'
      ],
      copyUnmodified: true
    }),
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch-ie8'
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [ 'babel' ],
        exclude: /node_modules/,
        include: __dirname
    }/*,
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loaders: "style!css?module&localIdentName=[hash:base64:5]&-url",
        include: __dirname
    },*/
    ]
  }
}
