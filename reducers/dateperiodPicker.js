import {
	OPEN_DATEPERIODPICKER, CLOSE_DATEPERIODPICKER, ON_STARTTIME_CHENGE, ON_ENDTIME_CHENGE
} from '../constants/ActionTypes'
import moment from 'moment'

const initialState = {
	btnIndex:0,
	navName:'',
	showDateperiodPicker:false,
	startTime: moment(new Date()),
	endTime: moment(new Date())
}

export default function dateperiodPicker(state = initialState, action) {
	switch (action.type) {
		case OPEN_DATEPERIODPICKER:
			return {
				btnIndex:action.clickFootPrint.btnIndex,
				navName:action.clickFootPrint.navName,
				showDateperiodPicker: true,
				startTime:state.startTime,
				endTime:state.endTime
			}
		case CLOSE_DATEPERIODPICKER:
			return {
				showDateperiodPicker: false,
				btnIndex:state.btnIndex,
				navName:state.navName,
				startTime:state.startTime,
				endTime:state.endTime
			}
		case ON_STARTTIME_CHENGE:
			return {
				navName:state.navName,
				btnIndex:state.btnIndex,
				showDateperiodPicker: state.showDateperiodPicker,
				startTime:action.startTime,
				endTime:state.endTime,
			}
		case ON_ENDTIME_CHENGE:
			return {
				navName:state.navName,
				btnIndex:state.btnIndex,
				showDateperiodPicker: state.showDateperiodPicker,
				startTime:state.startTime,
				endTime:action.endTime
			}
		default:
			return state
    }
}
