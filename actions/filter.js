import { CHANGE_FILTER } from '../constants/ActionTypes'

export function changeFilter(filterId) {
    return {
        type: CHANGE_FILTER,
        filterId
    }
}

export function getCurFilterKey() {
    return (dispatch, getState) => {
        var state = getState()
        return state.filter.items[state.filter.cur].key
    }
}
