import {
	CHANGE_SEARCH_TEXT,
	CHANGE_UNSEARCH_TEXT
} from '../constants/ActionTypes'


const initialState = {
	searchText: '',
	unsearchText: ''
}

function changeText(state, action) {
	switch (action.type) {
		case CHANGE_SEARCH_TEXT:
			return action.text
		default:
			return state.searchText
	}
}
function changeUnsearchText(state, action) {
	switch (action.type) {
		case CHANGE_UNSEARCH_TEXT:
			return action.text
		default:
			return state.unsearchText
	}
}


export default function search(state = initialState, action) {
	return {
		searchText: changeText(state, action),
		unsearchText: changeUnsearchText(state,action)
	}
}
