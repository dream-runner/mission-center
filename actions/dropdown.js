import { CHANGE_DROPDOWN_CHECKED, CHANGE_SORT, SHOW_MENU, HIDE_MENU } from '../constants/ActionTypes'

export function getFilterDueDateOverdueKey() {
	return (dispatch, getState) => {
    let state = getState();
		return state.dropdown['filterDueDateOverdue'].options[state.dropdown['filterDueDateOverdue'].cur].key;
  }
}

export function getFilterDatetimePeriodKey() {
	return (dispatch, getState) => {
    let state = getState();
		return state.dropdown['filterDatetimePeriod'].options[state.dropdown['filterDatetimePeriod'].cur].key;
  }
}

export function getFilterListDoneStatusKey() {
	return (dispatch, getState) => {
    let state = getState();
		return state.dropdown['filterListDoneStatus'].options[state.dropdown['filterListDoneStatus'].cur].key;
  }
}

export function getFilterListMineStatusKey() {
	return (dispatch, getState) => {
		let state = getState();
		return state.dropdown['filterListMineStatus'].options[state.dropdown['filterListMineStatus'].cur].key;
	}
}

export function setDropdownChecked(name, checked){
	return {
		type: CHANGE_DROPDOWN_CHECKED,
		name,
		checked
	};
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
