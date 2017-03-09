import { CHANGE_SORT, SHOW_MENU, HIDE_MENU } from '../constants/ActionTypes'


export function getCurrentDropdown(id){
	return {

	}
}

export function toggleDropdown(name) {
	return (dispatch, getState) => {
    let state = getState();
		state.dropdown[name].isOpen ? dispatch(hideMenu(name)) : dispatch(showMenu(name));
  }
}

export function hideMenu(name) {
  return {
    type: HIDE_MENU,
		name
  }
}

export function showMenu(name) {
  return {
    type: SHOW_MENU,
    name
  }
}
