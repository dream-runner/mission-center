import { SET_SELECTEDCATEGORYID,
	SET_SELECTEDFORMSID } from '../constants/ActionTypes'

export function setSelectedFormsId(data) {
    return {
        type: SET_SELECTEDFORMSID,
        data
    }
}
export function setSelectedCategoryId(data) {
    return {
        type: SET_SELECTEDCATEGORYID,
        data
    }
}

