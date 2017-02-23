import {
    SHOW_DIALOG,
    HIDE_DIALOG
} from '../constants/ActionTypes'

export function hide() {
    return {
        type: HIDE_DIALOG
    }
}

export function show(content, callBack) {
    return (dispatch, getState) => {
        let state = getState()
        let id = state.confirm.id
        dispatch({
            type: SHOW_DIALOG,
            id,
            content,
            callBack
        })
    }
}
