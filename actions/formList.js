import {
    SHOW_DIALOG,
    HIDE_DIALOG,
    GETFORMLIST_REQUEST,
    GETFORMLIST_SUCCESS,
    GETFORMLIST_FAILURE,
    SET_CUR_FORMLIST_ITEMS,
	SET_FORMLIST_TIP
} from '../constants/ActionTypes'
import forEach from 'lodash/forEach'

let flag = true
let timer = 0

function getListFailure(message) {
  return {
    type: GETFORMLIST_FAILURE,
    message
  }
}

function getListSuccess(json) {
  let { formCategories } = json
  let categories = formCategories || []
  return (dispatch) => {
    dispatch({
        type: GETFORMLIST_SUCCESS,
        categories
    })
  }
}

function checkFlag(fn) {
    if (typeof fn == 'function') {
        return function() {
            if (flag) {
                return fn.apply(this, [].slice.call(arguments))
            }
        }
    } else {
        if (flag) {
            return fn
        } else {
            return {type:"LOCK"}
        }
    }
}

export function hide() {
    return checkFlag({
        type: HIDE_DIALOG
    })
}

export function show() {
    return (dispatch, getState) => {
        let state = getState()
        dispatch({
            type: SHOW_DIALOG,
            id: state.formList.id
        })
        if (!state.formList.categories.length) {
            dispatch({
                type: GETFORMLIST_REQUEST
            })
            let data = new URLSearchParams()
            data.set('outage','false')
            return fetch(`${window.$ctx}/iform_ctr/iform_design_ctr/queryFormList`, {
                    method:'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                    },
                    credentials: 'include',
                    cache: 'no-cache',
                    body: data
                }).then( response => {
                    if (response.ok) {
                        response.text().then(text => {
                            if (text) {
                                // try {
                                    let json = JSON.parse(text)
                                    dispatch(getListSuccess(json))
                                // } catch (e) {
                                    // dispatch(getListFailure(`something error……\n${e.message}`))
                                // }
                            } else {
                                dispatch(getListFailure('Api return nothing……'))
                            }
                        })
                    } else {
                        dispatch(getListFailure(`something error……\n${response.status} ${response.statusText}`))
                    }
                })
        }
    }
}
export function checkForm (id) {
    return checkFlag((dispatch, getState) => {
        dispatch({
            type: SET_CUR_FORMLIST_ITEMS,
            id
        })
    })
}
export function primary () {
    return checkFlag((dispatch, getState) => {
        let state = getState()
        let curForm = state.formList.curForm
        if (curForm) {
            flag = false
            window.location.href = `${window.$ctx}/static/html/rt/fill-in.html?pk_bo=${curForm}`
        } else {
			dispatch({
				type: SET_FORMLIST_TIP,
				message: '请选择表单'
			})
			if(timer){
				clearTimeout(timer)
			}
			timer = setTimeout(()=>{
				dispatch({
					type: SET_FORMLIST_TIP,
					message: ''
				})
				timer = 0
			}, 2000)
		}
    })
}
