import {
    CHANGE_NAV,
    GETLIST_SUCCESS,
    CHANGE_SEARCH_TEXT
} from '../constants/ActionTypes'
import find from 'lodash/find'
import map from 'lodash/map'

const initialState = {
    items: [{
        text: '待审批',
        key: 'curtasks',
        needTotal: true,
        total: 0
    }, {
        text: '抄送的',
        key: 'copytasks',
        needTotal: true,
        total: 0
    }, {
        text: '已审批',
        key: 'histasks',
        needTotal: false,
        total: 0
    }, {
        text: '我发起的',
        key: 'getMine',
        needTotal: false,
        total: 0
    }],
    cur: 0
}

function changeNav(state, action) {
    switch (action.type) {
        case CHANGE_NAV:
            if (state == action.navId) {
                return state
            }
            return action.navId
        default:
            return state
    }
}

function setTotal(state, action) {
    switch (action.type) {
        case GETLIST_SUCCESS:
            return map([...state], (v) => {
                if (v.key == action.navKey) {
                    v.total = action.total
                }
                return Object.assign({}, v);
            })
        default:
            return state
    }
}




export default function nav(state = initialState, action) {
    return {
        items: setTotal(state.items, action),
        cur: changeNav(state.cur, action),
    }
}
