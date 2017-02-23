import {
    SHOW_DIALOG,
    HIDE_DIALOG,
    GETFORM_SRC_REQUEST,
    GETFORM_SRC_SUCCESS,
    GETFORM_SRC_FAILURE
} from '../constants/ActionTypes'
import guid from 'angular-uid'

const initialState = {
    id: guid(),
    isOpen: false,
    src: 'about:blank',
    errorMsg: '',
    isFetching: false
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

function setSrc(state, action) {
    switch (action.type) {
        case SHOW_DIALOG:
            return action.src || initialState.src
        default:
            return state
    }
}

function changeIsFetching(state, action) {
    switch (action.type) {
        case GETFORM_SRC_REQUEST:
            return true
        case GETFORM_SRC_SUCCESS:
        case GETFORM_SRC_FAILURE:
            return false
        default:
            return state
    }
}

function changeErrorMsg(state, action) {
    switch (action.type) {
        case GETFORM_SRC_SUCCESS:
            return ''
        case GETFORM_SRC_FAILURE:
            return action.message
        default:
            return state
    }
}

export default function form(state = initialState, action) {
    return {
        id: state.id,
        isOpen: toggleOpen(state, action),
        src: setSrc(state.src, action),
        errorMsg: changeErrorMsg(state.errorMsg, action),
        isFetching: changeIsFetching(state.isFetching, action)
    }
}
