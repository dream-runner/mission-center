
import { CHANGE_SEARCH_TEXT } from '../constants/ActionTypes'


export function changeText(text){
    return (dispatch) => {
        dispatch({
            type: CHANGE_SEARCH_TEXT,
            text
        })
    }
}