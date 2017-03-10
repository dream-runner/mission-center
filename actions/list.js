import {
    GETLIST_REQUEST,
    GETLIST_SUCCESS,
    GETLIST_FAILURE
} from '../constants/ActionTypes'
import { getCurNavKey } from './nav'
import { getFilterDueDateOverdueKey, getFilterDatetimePeriodKey, getFilterListDoneStatusKey, getFilterListMineStatusKey } from './dropdown'
import { getCurSortKey } from './sort'

function getListFailure(message) {
    return {
        type: GETLIST_FAILURE,
        message
    }
}

function getListSuccess(json, navKey) {
    let { data = [], total = 0 } = json;
    return (dispatch) => {
        dispatch({
            type: GETLIST_SUCCESS,
            data,
            total,
            navKey
        })
    }
}


export function getList() {
    return (dispatch, getState) => {
        let state = getState();
        let curNavKey = dispatch(getCurNavKey());
        let curSortKey = dispatch(getCurSortKey());
				let filterDueDateOverdueKey, filterDatetimePeriodKey, filterListDoneStatusKey, filterListMineStatusKey, queryStr;
				switch(state.dropdown.dropdownName){
					case 'filterDueDateOverdue':
						filterDueDateOverdueKey = dispatch(getFilterDueDateOverdueKey());
						queryStr = filterDueDateOverdueKey === 'all' ? '' : `taskDue=${filterDueDateOverdueKey}&`;
						break;
					case 'filterDatetimePeriod':
						filterDatetimePeriodKey = dispatch(getFilterDatetimePeriodKey());
						break;
					case 'filterListDoneStatus':
						filterListDoneStatusKey = dispatch(getFilterListDoneStatusKey());
						break;
					case 'filterListMineStatus':
						filterListMineStatusKey = dispatch(getFilterListMineStatusKey());
						break;
					default:
						filterDueDateOverdueKey = dispatch(getFilterDueDateOverdueKey());
						queryStr = filterDueDateOverdueKey === 'all' ? '' : `taskDue=${filterDueDateOverdueKey}&`;
						break;
				}

        dispatch({
            type: GETLIST_REQUEST
        })
        return fetch(`${window.$ctx}/tc/${curNavKey}?${queryStr}sort=${curSortKey}&_=${Date.now()}`, {
                credentials: 'include',
				cache: 'no-cache'
            }).then( response => {
                if (response.ok) {
                    response.text().then(text => {
                        if (text) {
                            try {
                                let json = JSON.parse(text)
								if (json.status == 0) {
									dispatch(getListFailure(json.message))
								} else {
	                                dispatch(getListSuccess(json, curNavKey))
								}
                            } catch (e) {
                                dispatch(getListFailure(`${e.message}`))
                            }
                        } else {
                            dispatch(getListFailure('Api return nothing……'))
                        }
                    })
                } else {
                    dispatch(getListFailure(`${response.status} ${response.statusText}`))
                }
            }
        )
    }
}
