var app = new (require('express'))()
var port = 3000

const base_headers = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'zh-CN,zh;q=0.8,en;q=0.6,ja;q=0.4',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Host': 'uas.yyuap.com',
    'Origin': 'https://uas.yyuap.com',
    'Pragma': 'no-cache',
    'Referer': 'https://uas.yyuap.com/cas/login?sysid=iform&verify_code=usercenter&service=http%3A%2F%2F172.20.13.92%3A8622%2Fiform_wb%2Fsso%2Flogin.jsp%3Fr%3DL2lmb3JtX3diLw',
    'Upgrade-Insecure-Requests': 1,
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.94 Safari/537.36'
}

app.get("/", function(req, res) {
	setTimeout(function () {
		res.sendFile(__dirname + '/mock/ongoing.json')
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
