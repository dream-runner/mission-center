import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducer from './reducers'
import { getList } from './actions/list'
import App from './containers/App'

let middleware = []

if (process.env.CTX_ENV && !window.$ctx) {
    window.$ctx = process.env.CTX_ENV
}

if (process.env.NODE_ENV === "develop") {
    let logger = require('redux-logger')
    middleware.push(logger())
    require('bootstrap/dist/css/bootstrap.css')
    require('./style/index.css')
    require('./style/loading.css')
    require('./style/iconfont/iconfont.css')
}

if (process.env.NODE_ENV === "build") {
    require('bootstrap/dist/css/bootstrap.css')
    require('./style/index.css')
    require('./style/loading.css')
    require('./style/iconfont/iconfont.css')
}

middleware = [thunk].concat(middleware)

const store = createStore(
    reducer,
    applyMiddleware(...middleware)
)

store.dispatch(getList())

render(
	<Provider store={store}>
	    <App />
    </Provider>,
    document.getElementById('mission-center-root')
)
