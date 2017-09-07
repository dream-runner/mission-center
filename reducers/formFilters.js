const initialState = {
	categoryId: '',
	formNames: ''
}
function changeVal(state, val) {
	if (val || val == "") {
		return val;
	} else {
		return state;
	}
}

export default function formFilters(state = initialState, action) {
	if (action.type == 'SET_FORM_FILTERS') {
		state.categoryId = changeVal(state.categoryId, action.data.categoryId)
		state.formNames = changeVal(state.formNames, action.data.formNames)
	}
	return {
		categoryId: state.categoryId,
		formNames: state.formNames
	}
}
