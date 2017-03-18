import {
    GETCATEGORY_REQUEST,
    GETCATEGORY_SUCCESS,
    GETCATEGORY_FAILURE
} from '../constants/ActionTypes'

const initialState = {
    items: [],
    cur: 0,
    errorMsg: '',
    isFetching: false
}

function setItems(state, action) {
    switch (action.type) {
        case GETCATEGORY_SUCCESS:
            return action.data
        default:
            return state
    }
}

function changeErrorMsg(state, action) {
    switch (action.type) {
        case GETCATEGORY_SUCCESS:
            return ''
        case GETCATEGORY_FAILURE:
            return action.message
        default:
            return state
    }
}

function changeIsFetching(state, action) {
    switch (action.type) {
        case GETCATEGORY_REQUEST:
            return true
        case GETCATEGORY_SUCCESS:
        case GETCATEGORY_FAILURE:
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
