import { CHANGE_DROPDOWN_CHECKED, CHANGE_DROPDOWN_INIT, CHANGE_SORT, SHOW_MENU, HIDE_MENU,SET_SELECTEDFORMSID,SET_SELECTEDCATEGORYID } from '../constants/ActionTypes'
import { GETCATEGORY_REQUEST, GETCATEGORY_SUCCESS, GETCATEGORY_FAILURE } from '../constants/ActionTypes';
import { getCurNavKey } from './nav';
import map from 'lodash/map';

function getCategoryFailure(message) {
    return {
        type: GETCATEGORY_FAILURE,
        message
    }
}

function getCategorySuccess(json, navKey) {
    let data = [{key: 'all', text: '全部类型'}];
		map(json,function(item,index){
			data.push({key: item.id, text: item.name});
		});
    return (dispatch) => {
        dispatch({
            type: GETCATEGORY_SUCCESS,
            data,
            navKey
        })
    }
}

export function getCategory() {
		let curNavKey = getCurNavKey();
    return (dispatch, getState) => {
        let state = getState();
        dispatch({type: GETCATEGORY_REQUEST});

        return fetch(`${window.$ctx}/tc/category?_=${Date.now()}`, {
        	credentials: 'include',
					cache: 'no-cache'
        }).then( response => {
					if (response.ok) {
					    response.text().then(text => {
				        if (text) {
			            try {
		                let json = JSON.parse(text)
										if (json.status == 0) {
											dispatch(getCategoryFailure(json.message))
										} else {
										  dispatch(getCategorySuccess(json, curNavKey))
										}
				          } catch (e) {
				              dispatch(getCategoryFailure(`${e.message}`))
				          }
					      } else {
				            dispatch(getCategoryFailure('Api return nothing……'))
				        }
					    })
					} else {
					    dispatch(getCategoryFailure(`${response.status} ${response.statusText}`))
					}
        }
      )
    }
}

export function getFilterDropdownKey(name){
	return (dispatch, getState) => {
    let state = getState();
		return state.dropdown[name].options[state.dropdown[name].cur].key;
  }
}

export function setDropdownChecked(name, checked){
	return {
		type: CHANGE_DROPDOWN_CHECKED,
		name,
		checked
	};
}

export function initDropdownIndex(){
	return {
		type: CHANGE_DROPDOWN_INIT
	}
}

export function toggleDropdown(name) {
	return (dispatch, getState) => {
    let state = getState();
		state.dropdown[name].isOpen ? dispatch(hideMenu(name)) : dispatch(showMenu(name));
  }
}
export function isFormFilerOn() {
	return (dispatch, getState) => {
    let state = getState();
    // debugger
		return (!!state.formFilters.formsName || !!state.formFilters.categoryId)
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
