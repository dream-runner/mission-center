
import { CHANGE_SEARCH_TEXT,CHANGE_UNSEARCH_TEXT } from '../constants/ActionTypes'


export function changeText(text){
    return (dispatch) => {
        dispatch({
            type: CHANGE_SEARCH_TEXT,
            text
        })
    }
}
export function changeUnsearchText(text){
	return (dispatch) => {
		dispatch({
			type: CHANGE_UNSEARCH_TEXT,
			text
		})
	}
}
