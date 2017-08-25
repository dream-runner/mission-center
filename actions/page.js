import {
	CHANGE_ACTIVEPAGE,
	CHANGE_PREPAGE,
	CHANGE_NEXTPAGE,
	GETLIST_REQUEST,
	GETLIST_SUCCESS,
	GETLIST_FAILURE,
	GET_ITEMS_SUCCESS,
	GET_ITEMS_FAILURE,
	IS_SEARCH
} from '../constants/ActionTypes'
import {
	getCurNavKey
} from './nav'
import {
	getFilterDropdownKey
} from './dropdown'
import {
	getCurSortKey
} from './sort'


export function getItems() {
	return (dispatch, getState) => {
		dispatch({
			type: GETLIST_REQUEST
		})
		return fetch(`${window.$ctx}/tc/getItems`, {
			credentials: 'include',
			cache: 'no-cache'
		}).then(response => {
			if (response.ok) {
				response.text().then(text => {
					if (text) {
						try {
							let json = JSON.parse(text)
							if (json.status == 0) {
								dispatch(getListFailure(json.message))
							} else {
								if (json.items == 0) {
									dispatch(getListSuccess(json, 1))
								} else {
									fetch(`${window.$ctx}/tc/getMine?activePage=1`, {
										credentials: 'include',
										cache: 'no-cache'
									}).then(response => {
										if (response.ok) {
											response.text().then(data => {
												if (data) {
													try {
														let datajson = JSON.parse(data)
														if (datajson.status == 0) {
															dispatch(getListFailure(datajson.message))
														} else {
															dispatch(getItemsSuccess(json))
															dispatch(getListSuccess(datajson, 1))
															dispatch(getActivePage(1))
														}
													} catch (e) {
														dispatch(getListFailure(`${e.message}`))
													}
												} else {
													dispatch(getListFailure('搜索数据为空，请修改搜索条件'))
												}
											})
										} else {
											dispatch(getListFailure(`${response.status} ${response.statusText}`))
										}

									})

								}

							}
						} catch (e) {
							dispatch(getItemsFailure(`${e.message}`))
						}
					} else {

						dispatch(getItemsFailure('搜索数据为空，请修改搜索条件'))
					}
				})
			} else {
				dispatch(getItemsFailure(`${response.status} ${response.statusText}`))
			}

		})
	}
}


export function search(searchText) {
	return (dispatch, getState) => {
		let encodedSearchText = encodeURI(encodeURI(searchText))
		dispatch({
			type: GETLIST_REQUEST
		})
		return fetch(`${window.$ctx}/tc/getSearchItems?searchItems=${encodedSearchText}`, {
			credentials: 'include',
			cache: 'no-cache'
		}).then(response => {
			if (response.ok) {
				response.text().then(text => {
					if (text) {
						try {
							let json = JSON.parse(text)
							if (json.status == 0) {
								dispatch(getItemsFailure(json.message))
							} else {
								if (json.items == 0) {
									dispatch(getListSuccess(json, 1))
								} else {
									fetch(`${window.$ctx}/tc/getSearchPagedItem?activePage=1`, {
										credentials: 'include',
										cache: 'no-cache'
									}).then(response => {
										if (response.ok) {
											response.text().then(data => {
												if (data) {
													try {
														let datajson = JSON.parse(data)
														if (datajson.status == 0) {
															dispatch(getListFailure(datajson.message))
														} else {
															dispatch(getItemsSuccess(json))
															dispatch(getListSuccess(datajson, 1))
															dispatch(getActivePage(1))
															dispatch(issearch())
														}
													} catch (e) {
														dispatch(getListFailure(`${e.message}`))
													}
												} else {
													dispatch(getListFailure('搜索数据为空，请修改搜索条件'))
												}
											})
										} else {
											dispatch(getListFailure(`${response.status} ${response.statusText}`))
										}

									})
								}

							}
						} catch (e) {
							dispatch(getItemsFailure(`${e.message}`))
						}
					} else {

						dispatch(getItemsFailure('搜索数据为空，请修改搜索条件'))
					}
				})
			} else {
				dispatch(getItemsFailure(`${response.status} ${response.statusText}`))
			}

		})
	}
}


function getItemsSuccess(json) {
	let {
		items = 10
	} = json
	return (dispatch) => {
		dispatch({
			type: GET_ITEMS_SUCCESS,
			items
		})
	}
}


function getItemsFailure(message) {
	return {
		type: GET_ITEMS_FAILURE,
		message
	}
}


function issearch(json) {
	return (dispatch) => {
		dispatch({
			type: IS_SEARCH,
		})
	}
}


export function change(activePage, issearch) {
	if (issearch == 'y')
		return getSearchList(activePage)
	else
		return getListNew('pagination', activePage);
}


export function getListNew(moduleName, activePage) {
	return (dispatch, getState) => {
		// alert('listnew');
		let state = getState();
		let curNavKey = dispatch(getCurNavKey());
		let curSortKey = dispatch(getCurSortKey());
		let pagination = state.list.pagination;
		let dropdownKey = '',
			queryStr = '';
		let tabNavData = {
			curtasks: [{
				key: 'taskDue',
				name: 'filterDueDateOverdue'
			},
				{
					key: 'taskDate',
					name: 'filterTaskDate'
				},
				{
					key: 'categoryIds',
					name: 'filterCategoryIds'
				}
			],
			histasks: [{
				key: 'isFinished',
				name: 'filterListDoneStatus'
			},
				{
					key: 'taskDate',
					name: 'filterTaskDate'
				},
				{
					key: 'categoryIds',
					name: 'filterCategoryIds'
				}
			],
			listcopy: [
				{key: 'isFinished', name: 'filterListDoneStatus'},
				{key: 'taskDate', name: 'filterTaskDate'},
				{key: 'categoryIds', name: 'filterCategoryIds'}
			],
			getMine: [
				{key: 'isFinished', name: 'filterListDoneStatus'},
				{key: 'taskDate', name: 'filterTaskDate'},
				{key: 'categoryIds', name: 'filterCategoryIds'}
			]

		};

		switch (state.dropdown.dropdownName) {
			case 'filterDueDateOverdue':
				dropdownKey = dispatch(getFilterDropdownKey(state.dropdown.dropdownName));
				queryStr = dropdownKey === 'all' ? '' : `taskDue=${dropdownKey}&`;
				break;
			case 'filterCategoryIds':
				dropdownKey = dispatch(getFilterDropdownKey(state.dropdown.dropdownName));
				queryStr = dropdownKey === 'all' ? '' : `categoryIds=${dropdownKey}&`;
				break;
			case 'filterTaskDate':
				dropdownKey = dispatch(getFilterDropdownKey(state.dropdown.dropdownName));
				queryStr = dropdownKey === 'all' ? '' : `taskDate=${dropdownKey}&`;
				break;
			case 'filterDatetimePeriod':
				dropdownKey = dispatch(getFilterDropdownKey(state.dropdown.dropdownName));
				queryStr = dropdownKey === 'all' ? '' : `filter=${dropdownKey}&`;
				break;
			case 'filterListDoneStatus':
				dropdownKey = dispatch(getFilterDropdownKey(state.dropdown.dropdownName));
				queryStr = dropdownKey === 'all' ? '' : `isFinished=${dropdownKey}&`;
				break;
			case 'filterListMineStatus':
				dropdownKey = dispatch(getFilterDropdownKey(state.dropdown.dropdownName));
				queryStr = dropdownKey === 'all' ? '' : `isFinished=${dropdownKey}&`;
				break;
			default:
				queryStr = '';
				break;
		}

		for (let i = 0, len = tabNavData[curNavKey].length; i < len; i++) {
			if (tabNavData[curNavKey][i].name != state.dropdown.dropdownName) {
				let tmp = state.dropdown[tabNavData[curNavKey][i].name];
				queryStr += tmp.options[tmp.cur].key === 'all' ? '' : `${tabNavData[curNavKey][i].key}=${tmp.options[tmp.cur].key}&`;
			}
		}

		if (moduleName && moduleName == 'search') {
			queryStr += param == '' ? '' : `searchedItem=${param}&`;
		}

		if (moduleName && moduleName == 'pagination') {
			let pageSize = pagination.pageSize;
			let pageStart = (activePage - 1) * pageSize;
			let searchText = state.search.searchText + '';
			queryStr += pageStart == 0 ? "" : `size=${pageSize}&start=${pageStart}&`;
			queryStr += searchText ? `searchedItem=${searchText}&` : '';
		}

		dispatch({
			type: GETLIST_REQUEST
		})

		/*sort=${curSortKey}&*/
		let fetchParam = {
			credentials: 'include',
			cache: 'no-cache',
			method: 'post'
		};

		queryStr += (state.formFilters.categoryId.replace('tempt', "") ? `categoryIds=${state.formFilters.categoryId.replace('tempt', "")}&` : '');
		state.formFilters.formNames && (fetchParam.body = JSON.stringify({processInstanceNames: state.formFilters.formNames}));

		return fetch(`${window.$ctx}/tc/${curNavKey}?${queryStr}_=${Date.now()}`, fetchParam).then(response => {
			if (response.ok) {
				response.text().then(text => {
					if (text) {
						try {
							let json = JSON.parse(text)
							if (json.status == 0) {
								dispatch(getListFailure(json.message))
							} else {
								dispatch(getListSuccess(json, curNavKey))
								dispatch(getActivePage(activePage));

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
		})
	}
}


export function getList(activePage) {
	return (dispatch, getState) => {
		dispatch({
			type: GETLIST_REQUEST
		})
		return fetch(`${window.$ctx}/tc/getMine?activePage=${activePage}`, {
			credentials: 'include',
			cache: 'no-cache'
		}).then(response => {
			if (response.ok) {
				response.text().then(text => {
					if (text) {
						try {
							let json = JSON.parse(text)
							if (json.status == 0) {
								dispatch(getListFailure(json.message))
							} else {
								dispatch(getListSuccess(json, activePage))
								dispatch(getActivePage(activePage))
							}
						} catch (e) {
							dispatch(getListFailure(`${e.message}`))
						}
					} else {
						dispatch(getListFailure('搜索数据为空，请修改搜索条件'))
					}
				})
			} else {
				dispatch(getListFailure(`${response.status} ${response.statusText}`))
			}
		})
	}
}

export function getSearchList(activePage) {
	return (dispatch, getState) => {
		dispatch({
			type: GETLIST_REQUEST
		})
		return fetch(`${window.$ctx}/tc/getSearchPagedItem?activePage=${activePage}`, {
			credentials: 'include',
			cache: 'no-cache'
		}).then(response => {
			if (response.ok) {
				response.text().then(text => {
					if (text) {
						try {
							let json = JSON.parse(text)
							if (json.status == 0) {
								dispatch(getListFailure(json.message))
							} else {
								dispatch(getListSuccess(json, activePage))
								dispatch(getActivePage(activePage))
								dispatch(issearch())
							}
						} catch (e) {
							dispatch(getListFailure(`${e.message}`))
						}
					} else {
						dispatch(getListFailure('搜索数据为空，请修改搜索条件'))
					}
				})
			} else {
				dispatch(getListFailure(`${response.status} ${response.statusText}`))
			}
		})
	}
}

function getActivePage(activePage) {
	return (dispatch) => {
		dispatch({
			type: CHANGE_ACTIVEPAGE,
			activePage
		})
	}
}

export function initActivePage(activePage) {
	return {
		type: CHANGE_ACTIVEPAGE,
		activePage
	}
}

function getListSuccess(json, navKey) {
	let {
		data = [], total = 0
	} = json
	return (dispatch) => {
		dispatch({
			type: GETLIST_SUCCESS,
			data,
			total,
			navKey
		})
	}
}

function getListFailure(message) {
	return {
		type: GETLIST_FAILURE,
		message
	}
}

export function prepage() {
	return (dispatch, getState) => {
		let state = getState()
		dispatch({
			state
		})
	}


}

export function nextpage() {
	return (dispatch, getState) => {
		let state = getState()
		dispatch({
			state
		})
	}
}
