import { OPEN_DATEPERIODPICKER, CLOSE_DATEPERIODPICKER } from '../constants/ActionTypes';
import { getCurNavKey } from './nav';



export function toggleDateperiodPicker(actType) {
	const act = actType?{type:OPEN_DATEPERIODPICKER, actType}:{type:CLOSE_DATEPERIODPICKER, actType}
	return act

}
