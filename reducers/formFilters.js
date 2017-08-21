const initialState = {
  categoryId:'',
	formNames:''
}

export default function formFilters(state = initialState, action) {
		if(action.type=='SET_FORM_FILTERS'){
			state.categoryId = action.data.categoryId
			state.formsName = action.data.formsName
		}
		return {
			categoryId: state.categoryId,
			formsName: state.formsName,
		}
}
