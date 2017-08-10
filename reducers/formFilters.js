import {
	SET_SELECTEDCATEGORYID,
	SET_SELECTEDFORMSID
} from '../constants/ActionTypes'

const initialState = {
  selectedFormsId:[],
	selectedCategoryId:''
}

function setSelectedFormsId(state, action) {
    state.selectedFormsId = action.selectedFormsId
}
function setSelectedCategoryId(state, action) {
	state.selectedCategoryId = action.selectedCategoryId
}



export default function formFilters(state = initialState, action) {
    return {
			selectedFormsId: setSelectedFormsId(state, action),
			selectedCategoryId: setSelectedCategoryId(state, action),
    }
}
