import {
    CHANGE_SEARCH_TEXT
} from '../constants/ActionTypes'


const initialState = {
	    searchText:''
}

function changeText(state, action) {
    switch (action.type) {
        case CHANGE_SEARCH_TEXT:
            return action.text 
        default:
            return state.searchText
    }
}


export default function search(state = initialState, action) {
    return {
        searchText:changeText(state,action)
    }
}