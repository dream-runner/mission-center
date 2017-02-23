import { CHANGE_NAV } from '../constants/ActionTypes'

export function changeNav(navId) {
  return {
    type: CHANGE_NAV,
    navId
  }
}

export function openFormList() {
  return () => {
    window.location.href = `${window.$ctx}/iform_ctr/iform_design_ctr/design`
  }
}

export function getCurNavKey() {
  return (dispatch, getState) => {
    var state = getState()
    return state.nav.items[state.nav.cur].key
  }
}
