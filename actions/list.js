import {
    GETLIST_REQUEST,
    GETLIST_SUCCESS,
    GETLIST_FAILURE
} from '../constants/ActionTypes'
import { getCurNavKey } from './nav'
import { getCurFilterKey } from './filter'
import { getCurSortKey } from './sort'

function getListFailure(message) {
    return {
        type: GETLIST_FAILURE,
        message
    }
}

function getListSuccess(json, navKey) {
    let { data = [], total = 0 } = json;
    return (dispatch) => {
        dispatch({
            type: GETLIST_SUCCESS,
            data,
            total,
            navKey
        })
    }
}


export function getList() {
    return (dispatch, getState) => {
        let state = getState()
        let curNavKey = dispatch(getCurNavKey())
        let curFilterKey = dispatch(getCurFilterKey())
        let curSortKey = dispatch(getCurSortKey())
        dispatch({
            type: GETLIST_REQUEST
        })
        return fetch(`${window.$ctx}/tc/${curNavKey}?filter=${curFilterKey}&sort=${curSortKey}&_=${Date.now()}`, {
                credentials: 'include',
				cache: 'no-cache'
            }).then( response => {
                if (response.ok) {
                    response.text().then(text => {
                        if (text) {
                            try {
                                let json = JSON.parse(text)
								if (json.status == 0) {
									dispatch(getListFailure(json.message))
								} else {
	                                dispatch(getListSuccess(json, curNavKey))
								}
                            } catch (e) {
                                dispatch(getListFailure(`${e.message}`))
                            }
                        } else {
                            dispatch(getListFailure('Api return nothing……'))
                        }
                    })
                } else {
                    dispatch(getListFailure(`${response.status} ${response.statusText}`))
                }
            }
        )
    }
}
