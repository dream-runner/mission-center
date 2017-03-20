import { CHANGE_NAV } from '../constants/ActionTypes'

export function changeNav(navId) {
  return {
    type: CHANGE_NAV,
    navId
  }
}

export function getCurNavKey() {
  return (dispatch, getState) => {
    var state = getState()
    return state.nav.items[state.nav.cur].key
  }
}
