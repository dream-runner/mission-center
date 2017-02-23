import {
    SHOW_DIALOG,
    HIDE_DIALOG,
    GETFORMLIST_REQUEST,
    GETFORMLIST_SUCCESS,
    GETFORMLIST_FAILURE,
    SET_CUR_FORMLIST_ITEMS,
	SET_FORMLIST_TIP
} from '../constants/ActionTypes'
import guid from 'angular-uid'
import map from 'lodash/map'

const initialState = {
    id: guid(),
    isOpen: false,
    isFetching: false,
    errorMsg: '',
    categories: [],
    curForm: '',
	tip: ''
}

function setCategories(state, action) {
    switch (action.type) {
        case GETFORMLIST_SUCCESS:
            return action.categories
        default:
            return state
    }
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

function changeErrorMsg(state, action) {
    switch (action.type) {
        case GETFORMLIST_SUCCESS:
            return ''
        case GETFORMLIST_FAILURE:
            return action.message
        default:
            return state
    }
}

function changeIsFetching(state, action) {
    switch (action.type) {
        case GETFORMLIST_REQUEST:
            return true
        case GETFORMLIST_SUCCESS:
        case GETFORMLIST_FAILURE:
            return false
        default:
            return state
    }
}
function setCurForm(state, action) {
    switch (action.type) {
        case SET_CUR_FORMLIST_ITEMS:
            return action.id
        default:
            return state
    }
}

function setTip(state, action) {
	switch (action.type) {
		case SET_FORMLIST_TIP:
			return action.message
		default:
			return state
	}
}

export default function formList(state = initialState, action) {
    return {
        id: state.id,
        isOpen: toggleOpen(state, action),
        isFetching: changeIsFetching(state.isFetching, action),
        errorMsg: changeErrorMsg(state.errorMsg, action),
        categories: setCategories(state.categories, action),
        curForm: setCurForm(state.curForm, action),
		tip: setTip(state.tip, action)
    }
}
