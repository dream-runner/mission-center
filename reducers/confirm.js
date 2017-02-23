import {
    SHOW_DIALOG,
    HIDE_DIALOG,
} from '../constants/ActionTypes'
import guid from 'angular-uid'

const initialState = {
    id: guid(),
    isOpen: false,
    content: '',
    callBack: () => {}
}

function toggleOpen(state, action) {
    switch (action.type) {
        case SHOW_DIALOG:
            if (action.id && state.id == action.id) {
                return true
            }
            return state.isOpen
        case HIDE_DIALOG:
            return false
        default:
            return state.isOpen
    }
}

function setContent(state, action) {
    switch (action.type) {
        case SHOW_DIALOG:
            return action.content || initialState.content
        default:
            return state
    }
}

function setCallBack(state, action) {
    switch (action.type) {
        case SHOW_DIALOG:
            return action.callBack || initialState.callBack
        default:
            return state
    }
}

export default function formList(state = initialState, action) {
    return {
        id: state.id,
        isOpen: toggleOpen(state, action),
        content: setContent(state.content, action),
        callBack: setCallBack(state.callBack, action)
    }
}
