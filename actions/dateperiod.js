import { OPEN_DATEPERIODPICKER, CLOSE_DATEPERIODPICKER, ON_STARTTIME_CHENGE, ON_ENDTIME_CHENGE} from '../constants/ActionTypes';
import { getCurNavKey } from './nav';


export function onStartTimeChange(startTime) {
	return{
		type:ON_STARTTIME_CHENGE,
		startTime
	}
}
export function onEndTimeChange(endTime) {
	return{
		type:ON_ENDTIME_CHENGE,
		endTime
	}
}
export function toggleDateperiodPicker(actType,clickFootPrint) {
	const act = actType?{type:OPEN_DATEPERIODPICKER, actType,clickFootPrint}:{type:CLOSE_DATEPERIODPICKER, actType}
	return act

}
