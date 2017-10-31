import {
	OPEN_DATEPERIODPICKER, CLOSE_DATEPERIODPICKER
} from '../constants/ActionTypes'

const initialState = {
	showDateperiodPicker:false
}

export default function dateperiodPicker(state = initialState, action) {
	switch (action.type) {
		case OPEN_DATEPERIODPICKER:
			return { showDateperiodPicker: true }
		default:
			return state
    }
}
