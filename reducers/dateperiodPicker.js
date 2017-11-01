import {
	OPEN_DATEPERIODPICKER, CLOSE_DATEPERIODPICKER, ON_STARTTIME_CHENGE, ON_ENDTIME_CHENGE
} from '../constants/ActionTypes'
import moment from 'moment'

const initialState = {
	showDateperiodPicker:false,
	startTime: moment(new Date()),
	endTime: moment(new Date())
}

export default function dateperiodPicker(state = initialState, action) {
	switch (action.type) {
		case OPEN_DATEPERIODPICKER:
			return {
				showDateperiodPicker: true,
				startTime:state.startTime,
				endTime:state.endTime
			}
		case CLOSE_DATEPERIODPICKER:
			return {
				showDateperiodPicker: false,
				startTime:state.startTime,
				endTime:state.endTime
			}
		case ON_STARTTIME_CHENGE:
			return {
				showDateperiodPicker: state.showDateperiodPicker,
				startTime:action.startTime,
				endTime:state.endTime
			}
		case ON_ENDTIME_CHENGE:
			return {
				showDateperiodPicker: state.showDateperiodPicker,
				startTime:state.startTime,
				endTime:action.endTime
			}
		default:
			return state
    }
}
