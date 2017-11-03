import {
	GETLIST_REQUEST,
	GETLIST_SUCCESS,
	GETLIST_FAILURE,
	CHANGE_ACTIVEPAGE
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
import moment from 'moment'

function getListFailure(message) {
	return {
		type: GETLIST_FAILURE,
		message
	}
}

function getListSuccess(json, navKey) {
	let {data = [], total, size, start, unReadCount} = json;
	return (dispatch) => {
		dispatch({
			type: GETLIST_SUCCESS,
			data,
			total,
			size,
			start,
			navKey,
			unReadCount
		})
	}
}

function dateFormat(date) {
	let res = moment(date).format('YYYY-MM-DD');
	return res;
}

// 初始化调用，获取展示列表的数据
export function getList(moduleName, param) {
	return (dispatch, getState) => {
		let state = getState();
		let curNavKey = dispatch(getCurNavKey());//待审批、待抄送、已审批，我发起，如curtasks
		let curSortKey = dispatch(getCurSortKey());// 排序方式 审批时间等，默认的
		let dropdownKey = '', queryStr = '';
		const dropdownName = state.dropdown.dropdownName;
		let tabNavData = {
			curtasks: [
				{key: 'taskDue', name: 'filterDueDateOverdue'},
				{key: 'taskDate', name: 'filterTaskDate'},
				{key: 'receivingDate', name: 'filterReceivingDate'},
				{key: 'categoryIds', name: 'filterCategoryIds'},
				{key: 'sort', name: 'sortListToDo'}
			],
			histasks: [
				{key: 'isFinished', name: 'filterListDoneStatus'},
				{key: 'taskDate', name: 'filterTaskDate'},
				{key: 'completionDate', name: 'filterCompletionDate'},
				{key: 'categoryIds', name: 'filterCategoryIds'},
				{key: 'sort', name: 'sortListCompletion'},
			],
			listcopy: [
				{key: 'isFinished', name: 'filterListDoneStatus'},
				{key: 'taskDate', name: 'filterTaskDate'},
				{key: 'categoryIds', name: 'filterCategoryIds'}
			],
			getMine: [
				{key: 'processStatus', name: 'filterListMineStatus'},
				{key: 'taskDate', name: 'filterTaskDate'},
				{key: 'categoryIds', name: 'filterCategoryIds'}
			]

		};

		switch (dropdownName) {
			case 'filterDueDateOverdue':
				dropdownKey = dispatch(getFilterDropdownKey(state.dropdown.dropdownName));
				queryStr = dropdownKey === 'all' ? '' : `taskDue=${dropdownKey}&`;
				break;
			case 'filterCategoryIds':
				dropdownKey = dispatch(getFilterDropdownKey(state.dropdown.dropdownName));
				break;
			case 'filterTaskDate':
				dropdownKey = dispatch(getFilterDropdownKey(state.dropdown.dropdownName));
				queryStr = dropdownKey === 'all' ? '' : `taskDate=${dropdownKey}&`;
				queryStr += dropdownKey !== 'taskTime_more' ? '' : `taskBeginDate=${dateFormat(state.dropdown[dropdownName].startTime)}&taskEndDate=${dateFormat(state.dropdown[dropdownName].endTime)}&`;
				break;
			case 'filterReceivingDate':
			case 'filterCompletionDate':
				dropdownKey = dispatch(getFilterDropdownKey(state.dropdown.dropdownName));
				queryStr = dropdownKey === 'all' ? '' : `rcvOrCompEndDate=${dropdownKey}&`;
				queryStr += dropdownKey !== 'taskTime_more' ? '' : `rcvOrCompBeginDate=${dateFormat(state.dropdown[dropdownName].startTime)}&rcvOrCompEndDate=${dateFormat(state.dropdown[dropdownName].endTime)}&`;
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
				queryStr = dropdownKey === 'all' ? '' : `processStatus=${dropdownKey}&`;
				break;
			case 'sortListToDo':
			case 'sortListCompletion':
				dropdownKey = dispatch(getFilterDropdownKey(state.dropdown.dropdownName));
				queryStr = `sort=${dropdownKey}&`;
				break;
			default:
				queryStr = '';
				break;
		}

		for (let i = 0, len = tabNavData[curNavKey].length; i < len; i++) {
			if (tabNavData[curNavKey][i].name != state.dropdown.dropdownName) {
				let tmp = state.dropdown[tabNavData[curNavKey][i].name];
				queryStr += tmp.options[tmp.cur].key === 'all' ? '' : `${tabNavData[curNavKey][i].key}=${tmp.options[tmp.cur].key}&`;
				if('taskTime_more' === tmp.options[tmp.cur].key){
					let navName = tabNavData[curNavKey][i].name;
					queryStr += 'filterTaskDate' ===  navName? `taskBeginDate=${dateFormat(state.dropdown[navName].startTime)}&taskEndDate=${dateFormat(state.dropdown[navName].endTime)}&` : `rcvOrCompBeginDate=${dateFormat(state.dropdown[navName].startTime)}&rcvOrCompEndDate=${dateFormat(state.dropdown[navName].endTime)}&`;
				}
			}
		}
		if (moduleName && moduleName == 'search') {
			queryStr += param == '' ? '' : `searchedItem=${param}&`;
		} else if (!(window.prev !== window.flag && window.prev !== null)) {
			// 因为在页数只有一页的时候，由详情页返回调用的还是getList，所有如果有searchText需要加上
			queryStr += state.search.searchText == "" ? "" : `searchedItem=${state.search.searchText}&`;
		}

		dispatch({
			type: GETLIST_REQUEST
		});
		/*sort=${curSortKey}&*/
		// iform_web/tc/curtasks  >> 决定了去哪拿数据
		// 如果是全部类型获取数据
		dispatch({
			type: CHANGE_ACTIVEPAGE,
			activePage: 1
		})
		let fetchParam = {
			credentials: 'include',
			cache: 'no-cache',
			method: 'post'
		};
		// 去掉之前我们为了使筛选项高亮的tempt字符串（dropdownContainer）
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



