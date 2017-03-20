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
		pagination: {
			pageTotal: 0, // 总页数
			pageSize: 10, // 每页显示条数
			pageCurrent: 0, // 当前第几页
			pageNumber: 0, // 总条数
		},
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

function setPagination(state, action){
	switch (action.type) {
		case GETLIST_SUCCESS:
			let { total, size, start } = action;
			state.pageTotal = Math.ceil(total / (state.pageSize - 1));
			state.pageNumber = total || state.pageNumber;
			state.pageCurrent = Math.ceil(start / (state.pageSize - 1)) || 1;
			return state;
		default:
			return state;
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
				pagination: setPagination(state.pagination, action),
        errorMsg: changeErrorMsg(state.errorMsg, action),
        isFetching: changeIsFetching(state.isFetching, action)
    }
}
