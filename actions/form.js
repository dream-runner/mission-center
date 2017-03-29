import {
    SHOW_DIALOG,
    HIDE_DIALOG,
    GETFORM_SRC_REQUEST,
    GETFORM_SRC_SUCCESS,
    GETFORM_SRC_FAILURE
} from '../constants/ActionTypes'
import { getCurNavKey } from './nav';

function getFailure(message) {
    return (dispatch) => {
        dispatch({
            type: GETFORM_SRC_FAILURE,
            message
        })
        dispatch(show())
    }
}

function getSuccess(copyToId, taskId, pk_bo, pk_boins,processDefinitionId,processInstanceId) {
    let src = '';
		if(copyToId){
			src = `${window.$ctx}/static/html/rt/browse.html?copyToId=${copyToId}&taskId=${taskId}&pk_bo=${pk_bo}&pk_boins=${pk_boins}&processDefinitionId=${processDefinitionId}&processInstanceId=${processInstanceId}`
		} else {
			src = `${window.$ctx}/static/html/rt/browse.html?taskId=${taskId}&pk_bo=${pk_bo}&pk_boins=${pk_boins}&processDefinitionId=${processDefinitionId}&processInstanceId=${processInstanceId}`
		}
		return (dispatch) => {
        dispatch({
            type: GETFORM_SRC_SUCCESS
        })
        dispatch(show(src))
    }
}

export function hide() {
    return {
        type: HIDE_DIALOG
    }
}

export function show(src) {
    return (dispatch, getState) => {
        let state = getState()
        let id = state.form.id
        dispatch({
            type: SHOW_DIALOG,
            id,
            src
        })
    }
}

export function getBo(item) {
    return (dispatch, getState) => {
				dispatch(show());
        let { taskId, id, processDefinitionId, processInstanceId, procssInstId } = item;
				// 我抄送的 参数为 processDefinitionId = historicProcessInstance.processDefinitionId, procssInstId taskdId
				// 我发起的 参数为 processInstanceId = id
				processDefinitionId = processDefinitionId || item.historicProcessInstance.processDefinitionId;
				processInstanceId = processInstanceId || procssInstId || id;
				taskId = taskId || id;

				let curNavKey = dispatch(getCurNavKey());
				let copyToId = 0, url = '';
				if(curNavKey == 'listcopy'){
					copyToId = id;
					url = `${window.$ctx}/tc/getbo?processDefinitionId=${processDefinitionId}&processInstanceId=${processInstanceId}&copyToId=${copyToId}&_=${Date.now()}`
				} else {
					url = `${window.$ctx}/tc/getbo?processDefinitionId=${processDefinitionId}&processInstanceId=${processInstanceId}&_=${Date.now()}`
				}

        dispatch({
            type: GETFORM_SRC_REQUEST
        })

        return fetch(url, {
                credentials: 'include',
				cache: 'no-cache'
            }).then( response => {
                if (response.ok) {
                    response.text().then(text => {
                        if (text) {
                            try {
                                let json = JSON.parse(text)
                                let { pk_bo, pk_boins } = json
                                if (pk_bo) {
                                    dispatch(getSuccess(copyToId, taskId, pk_bo, pk_boins,processDefinitionId,processInstanceId))
                                } else {
                                    dispatch(getFailure(`${json.message}`))
                                }
                            } catch (e) {
                                dispatch(getFailure(`${e.message}`))
                            }
                        } else {
                            dispatch(getFailure('Api return nothing……'))
                        }
                    })
                } else {
                    dispatch(getFailure(`${response.status} ${response.statusText}`))
                }
            } )
    }
}
