import { CHANGE_SORT, SHOW_MENU, HIDE_MENU } from '../constants/ActionTypes'

export function changeSortRule(sortId) {
  return {
    type: CHANGE_SORT,
    sortId
  }
}

export function toggleDropdown() {
  return (dispatch, getState) => {
    let state = getState()
    if (state.sort.isOpen) {
      dispatch(hideMenu())
    } else {
      dispatch(showMenu(state.sort.id))
    }
  }
}
export function hideMenu() {
	return {
    type: HIDE_MENU
  }
}

export function showMenu(id) {
  return {
    type: SHOW_MENU,
    id
  }
}

export function getCurSortText() {
  return (dispatch, getState) => {
    var state = getState()
    return state.sort.items[state.sort.cur].text
  }
}
export function getCurSortKey() {
  return (dispatch, getState) => {
    var state = getState()
    return state.sort.items[state.sort.cur].key
  }
}
