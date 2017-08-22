const initialState = {
	categoryId: '',
	formNames: '',
	keys: [],
	formsId: []
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
		// state.categoryId = action.data.categoryId
		// state.formNames = action.data.formNames
		// state.formsId = action.data.formsId
		// state.keys = action.data.keys
		console.log(action.data);
		state.categoryId = changeVal(state.categoryId, action.data.categoryId)
		state.formNames = changeVal(state.formNames, action.data.formNames)
		state.formsId = changeVal(state.formsId, action.data.formsId)
		state.keys = changeVal(state.keys, action.data.keys)
	}
	return {
		categoryId: state.categoryId,
		formNames: state.formNames,
		keys: state.keys,
		formsId: state.formsId
	}
}
