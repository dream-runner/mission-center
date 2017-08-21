import {
	GETLIST_REQUEST,
	GETLIST_SUCCESS,
	GETLIST_FAILURE
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

function getListFailure(message) {
	return {
		type: GETLIST_FAILURE,
		message
	}
}

function getListSuccess(json, navKey) {
	let {data = [], total, size, start} = json;
	return (dispatch) => {
		dispatch({
			type: GETLIST_SUCCESS,
			data,
			total,
			size,
			start,
			navKey,
		})
	}
}

// 初始化调用，获取展示列表的数据
export function getList(moduleName, param) {
	return (dispatch, getState) => {
		let state = getState();
		let curNavKey = dispatch(getCurNavKey());//待审批、待抄送、已审批，我发起，如curtasks
		let curSortKey = dispatch(getCurSortKey());// 排序方式 审批时间等，默认的
		let dropdownKey = '', queryStr = '';
		let tabNavData = {
			curtasks: [
				{key: 'taskDue', name: 'filterDueDateOverdue'},
				{key: 'taskDate', name: 'filterTaskDate'},
				{key: 'categoryIds', name: 'filterCategoryIds'}
			],
			histasks: [
				{key: 'isFinished', name: 'filterListDoneStatus'},
				{key: 'taskDate', name: 'filterTaskDate'},
				{key: 'categoryIds', name: 'filterCategoryIds'}
			],
			listcopy: [],
			getMine: []

		};

		switch (state.dropdown.dropdownName) {
			case 'filterDueDateOverdue':
				dropdownKey = dispatch(getFilterDropdownKey(state.dropdown.dropdownName));// 有点多此一举
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
		// 如果要点击更改，需要在这里更改queryStr，就是内部的cur
		for (let i = 0, len = tabNavData[curNavKey].length; i < len; i++) {
			// 初始化，state.dropdown.dropdownName=""  >> 查询的分类，各列表的内容
			if (tabNavData[curNavKey][i].name != state.dropdown.dropdownName) {
				// 获取state.dropdown["filterListDoneStatus"]等数据
				let tmp = state.dropdown[tabNavData[curNavKey][i].name];
				// 每个都不等于，第一次执行queryStr = "" + "" + "" ,有多个选择的时候，
				queryStr += tmp.options[tmp.cur].key === 'all' ? '' : `${tabNavData[curNavKey][i].key}=${tmp.options[tmp.cur].key}&`;
			}
		}
		if (moduleName && moduleName == 'search') {
			queryStr += param == '' ? '' : `searchedItem=${param}&`;
		}

		dispatch({
			type: GETLIST_REQUEST
		})
		/*sort=${curSortKey}&*/
		// iform_web/tc/curtasks  >> 决定了去哪拿数据
		return fetch(`${window.$ctx}/tc/${curNavKey}?${queryStr}_=${Date.now()}`, {
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
