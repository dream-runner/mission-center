var webpack = require('webpack')
var config = require('./webpack.config.prod')

var compiler = webpack(config)
compiler.run(function(){
    if(err) {
        console.error(err.stack || err);
        if(err.details) console.error(err.details);
    }
})
