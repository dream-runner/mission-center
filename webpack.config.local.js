var path = require('path')
var webpack = require('webpack')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var bufferreplace = function(buf, substr, newSubstr) {
	if (!Buffer.isBuffer(buf)) {
		buf = Buffer(buf);
	}
	var idx = buf.indexOf(substr);
	if (~idx) {
		if (!Buffer.isBuffer(newSubstr)) {
			newSubstr = Buffer(newSubstr);
		}
		var before = buf.slice(0, idx);
		var after = bufferreplace(buf.slice(idx + substr.length), substr, newSubstr);
		var len = idx + newSubstr.length + after.length;
		buf = Buffer.concat([before, newSubstr, after], len);
	}
	return buf;
}

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
				'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
				'CTX_ENV': JSON.stringify(process.env.CTX_ENV)
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false
			}
		}),
		new CopyWebpackPlugin([
			{
				from: './style/bootstrap-reset.css',
				to: 'D:/work/iweb_cloudform/iform_parent/iform_parent/design/src/main/webapp/static/css/design/bootstrap-reset.css'
			},
			{
				from: './style/index.css',
				to: 'D:/work/iweb_cloudform/iform_parent/iform_parent/design/src/main/webapp/static/css/design/mission-center.css',
				transform: function(content, path) {
					return bufferreplace(content, "url('../img", "url('../../img");
				}
			},
			{
				from: './img/**',
				to: 'D:/work/iweb_cloudform/iform_parent/iform_parent/design/src/main/webapp/static/'
			},
			{
				from: './dist/**',
				to: 'D:/work/iweb_cloudform/iform_parent/iform_parent/design/src/main/webapp/static/js/design/mission-center/'
			}
		], {
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
			}
		]
	}
}
