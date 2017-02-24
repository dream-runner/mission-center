### Features
* 可以当脚手架用，开发环境配置的很完善
* 用es6写的，webpack打包，babel编译，异步请求用的fetch API，可能存在兼容性问题，IE 8得换fetch-ie8，还得用es3ify-loader插件

### Usage
* 安装依赖：npm install，unix系统貌似得sudo
* 启动测试服务器，开发时用的：npm start
* 构建生产环境用的文件：npm run prod，构造成功后会自动同步到生产环境的代码苦衷，需要修改conf.js文件内cope插件的文件地址
* 构建打包文件：npm run build，构建包含了css和图片的打包文件，同时输出字体文件，只要接口对上了，放工程里直接就能用没有其他依赖

### Todo
* redux换成mobx
* webpack升级到webpack2

License
----

MIT
