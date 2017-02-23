import {
    CHANGE_SORT,
    SHOW_MENU,
    HIDE_MENU
} from '../constants/ActionTypes'
import guid from 'angular-uid'

const initialState = {
    id: guid(),
    items: [{
        text: '按分配时间由近到远排序',
        key: 'sort-by-divideTime-desc'
    }, {
        text: '按标题排序',
        key: 'sort-by-name'
    },  {
        text: '按分配时间由远到近排序',
        key: 'sort-by-divideTime-asc'
    }, {
        text: '按提交时间由近到远排序',
        key: 'sort-by-commitTime-desc'
    }, {
        text: '按提交时间由远到近排序',
        key: 'sort-by-commitTime-asc'
    }, {
        text: '按提交人排序',
        key: 'sort-by-submitterName'
    }],
    cur: 0,
    isOpen: false
}

function changeSort(state, action) {
    switch (action.type) {
        case CHANGE_SORT:
            if (state == action.sortId) {
                return state
            }
            return action.sortId
        default:
            return state
    }
}

function toggleOpen(state, action) {
    switch (action.type) {
        case SHOW_MENU:
            if (action.id && state.id == action.id) {
                return true
            }
            return state.isOpen
        case HIDE_MENU:
            return false
        default:
            return state.isOpen
    }
}

export default function sort(state = initialState, action) {
    return {
        id: state.id,
        items: state.items,
        cur: changeSort(state.cur, action),
        isOpen: toggleOpen(state, action)
    }
}
