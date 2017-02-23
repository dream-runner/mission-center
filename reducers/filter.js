import {
    CHANGE_FILTER
} from '../constants/ActionTypes'

const initialState = {
    items: [{
        text: '本周',
        key: 'thisWeek',
    }, {
        text: '上周',
        key: 'preWeek',
    }, {
        text: '本月',
        key: 'thisMonth',
    }, {
        text: '上月',
        key: 'preMonth'
    }, {
        text: '更多',
        key: 'all'
    }],
    cur: 0
}

function changeFilter(state, action) {
    switch (action.type) {
        case CHANGE_FILTER:
            if (state == action.filterId) {
                return state
            }
            return action.filterId
        default:
            return state
    }
}

export default function filter(state = initialState, action) {
    return {
        items: state.items,
        cur: changeFilter(state.cur, action)
    }
}
