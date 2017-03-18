import { GETCATEGORY_REQUEST, GETCATEGORY_SUCCESS, GETCATEGORY_FAILURE } from '../constants/ActionTypes';
import { getCurNavKey } from './nav';

function getCategoryFailure(message) {
    return {
        type: GETCATEGORY_FAILURE,
        message
    }
}

function getCategorySuccess(json, navKey) {
    let data = json;
    return (dispatch) => {
        dispatch({
            type: GETCATEGORY_SUCCESS,
            data,
            navKey
        })
    }
}

export function getCategory() {
		let curNavKey = getCurNavKey();
    return (dispatch, getState) => {
        let state = getState();
        dispatch({type: GETCATEGORY_REQUEST});

        return fetch(`${window.$ctx}/tc/category?_=${Date.now()}`, {
        	credentials: 'include',
					cache: 'no-cache'
        }).then( response => {
					if (response.ok) {
					    response.text().then(text => {
				        if (text) {
			            try {
		                let json = JSON.parse(text)
										if (json.status == 0) {
											dispatch(getCategoryFailure(json.message))
										} else {
										  dispatch(getCategorySuccess(json, curNavKey))
										}
				          } catch (e) {
				              dispatch(getCategoryFailure(`${e.message}`))
				          }
					      } else {
				            dispatch(getCategoryFailure('Api return nothing……'))
				        }
					    })
					} else {
					    dispatch(getCategoryFailure(`${response.status} ${response.statusText}`))
					}
        }
      )
    }
}
