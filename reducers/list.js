import {
    CHANGE_NAV,
    CHANGE_SORT,
    CHANGE_FILTER,
    GETLIST_REQUEST,
    GETLIST_SUCCESS,
    GETLIST_FAILURE
} from '../constants/ActionTypes'

const initialState = {
    items: [],
    cur: 0,
    errorMsg: '',
    isFetching: false
}

function setItems(state, action) {
    switch (action.type) {
        case GETLIST_SUCCESS:
            return action.data
        default:
            return state
    }
}

function changeErrorMsg(state, action) {
    switch (action.type) {
        case CHANGE_NAV:
        case CHANGE_SORT:
        case CHANGE_FILTER:
        case GETLIST_SUCCESS:
            return ''
        case GETLIST_FAILURE:
            return action.message
        default:
            return state
    }
}

function changeIsFetching(state, action) {
    switch (action.type) {
        case GETLIST_REQUEST:
            return true
        case GETLIST_SUCCESS:
        case GETLIST_FAILURE:
            return false
        default:
            return state
    }
}

export default function list(state = initialState, action) {
    return {
        items: setItems(state.items, action),
        errorMsg: changeErrorMsg(state.errorMsg, action),
        isFetching: changeIsFetching(state.isFetching, action)
    }
}
