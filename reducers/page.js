 import {
    CHANGE_ACTIVEPAGE,CHANGE_PREPAGE,CHANGE_NEXTPAGE,GETLIST_SUCCESS,GET_ITEMS_SUCCESS, GET_ITEMS_FAILURE,IS_SEARCH
} from '../constants/ActionTypes'

const initialState = {
    items: 10, // 每页显示条数
    activePage: 1, // 当前页数
    isSearch:'n'
}

function getItems(state, action) {
    switch (action.type) {
        case GET_ITEMS_SUCCESS:
            return action.items
        case GET_ITEMS_FAILURE:
             return 20
        default:
            return state.items
    }
}

function issearch(state, action) {
    switch (action.type) {
        case IS_SEARCH:
            return 'y'
        default:
            return 'n'
    }
}


function changePage(state, action) {
    switch (action.type) {
        case CHANGE_ACTIVEPAGE:
            return action.activePage
        case CHANGE_PREPAGE:
            return action.activePage==0?0:state.activePage-1
        case CHANGE_NEXTPAGE:
            return action.activePage+1
        default:
            return state.activePage
    }
}



function changeItems(state, action) {
    switch (action.type) {
        case GET_LIST_ITEM:
            return action.items
        default:
            return state.items

    }
}


export default function page(state = initialState, action) {
    return {
        items: getItems(state, action),
        activePage: changePage(state, action),
        isSearch: issearch(state, action)
    }
}
