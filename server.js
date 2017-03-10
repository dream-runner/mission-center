var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.config')

var app = new (require('express'))()
var port = 3000
var ctx = process.env.CTX_ENV ? process.env.CTX_ENV : ''

var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

app.get("/", function(req, res) {
    res.sendFile(__dirname + '/index.html')
})

/* 新云审批接口 */
app.get(ctx + "/process/listTodo", function(req, res){
	res.sendFile(__dirname + '/mock/listTodo.json');
});

app.get(ctx + "/tc/listcopy", function(req, res){
	res.sendFile(__dirname + '/mock/listCopy.json');
});

app.get(ctx + "/process/listDone", function(req, res){
	res.sendFile(__dirname + '/mock/listDone.json');
});
/* /新云审批接口 */

app.get(ctx + "/tc/curtasks", function(req, res) {
	setTimeout(function () {
		res.sendFile(__dirname + '/mock/ongoing.json')
	}, 2000)
})

app.get(ctx + "/tc/copytasks", function(req, res) {
	setTimeout(function () {
		res.sendFile(__dirname + '/mock/chaosong.json')
	}, 2000)
})

app.get(ctx + "/tc/histasks", function(req, res) {
	setTimeout(function () {
		res.sendFile(__dirname + '/mock/done0.json')
	}, 2000)
})

app.get(ctx + "/tc/getMine", function(req, res) {
  setTimeout(function () {
    res.sendFile(__dirname + '/mock/mine3.json')
  }, 2000)
})

app.get(ctx + "/tc/getSearchPagedItem", function(req, res) {
  setTimeout(function () {
    res.sendFile(__dirname + '/mock/mine3.json')
  }, 2000)
})

app.get(ctx + "/tc/getItems", function(req, res) {
  setTimeout(function () {
    res.sendFile(__dirname + '/mock/items.json')
  }, 2000)
})

app.get(ctx + "/tc/getSearchItems", function(req, res) {
  setTimeout(function () {
    res.sendFile(__dirname + '/mock/items.json')
  }, 2000)
})

app.post(ctx + "/iform_ctr/iform_design_ctr/queryFormList", function(req, res) {
  setTimeout(function () {
    res.sendFile(__dirname + '/mock/formList.json')
  }, 2000)
})

app.get(ctx + "/tc/getbo", function(req, res) {
  setTimeout(function () {
    res.sendFile(__dirname + '/mock/getbo.json')
  }, 2000)
})

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
  	var path = 'http://localhost:' + port
    console.info("==> 🌎  Listening on port %s. Open up %s/ in your browser.", port, path)
  }
})
