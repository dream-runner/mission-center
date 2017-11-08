import { SHOW_MENU, HIDE_MENU, CHANGE_DROPDOWN_CHECKED, CHANGE_DROPDOWN_INIT,SET_SELECTEDFORMSID,SET_SELECTEDCATEGORYID } from '../constants/ActionTypes'
import { GETCATEGORY_REQUEST, GETCATEGORY_SUCCESS, GETCATEGORY_FAILURE} from '../constants/ActionTypes'
import guid from 'angular-uid'
import moment from 'moment'
const baseTimeFilter = [
	{
		text: '提交时间',
		key: 'all'
	}, {
		text: '今天',
		key: 'taskTime_today'
	}, {
		text: '昨天',
		key: 'taskTime_yesterday'
	}, {
		text: '本周',
		key: 'taskTime_thisWeek'
	}, {
		text: '上周',
		key: 'taskTime_lastWeek'
	}, {
		text: '本月',
		key: 'taskTime_thisMonth'
	}, {
		text: '更多',
		key: 'taskTime_more'
	}
]
const commonSortList = [
	{
		text: '按提交时间由远及近',
		key: 'sort-by-commitTime-asc'
	}, {
		text: '按提交时间由近及远',
		key: 'sort-by-commitTime-desc'
	}
]
const initialState = {
	"dropdownName": '',
	// 待审批页的全部状态 列表
	"filterDueDateOverdue": {
		key: guid(),
		remark: '待审批筛选',
		cur: 0,
		isOpen: false,
		options: [{
			text: '全部状态',
			key: 'all'
		}, {
			text: '正常',
			key: 'dueDate_normal'
		}, {
			text: '逾期',
			key: 'dueDateoverdue'
		}]
	},
	// 按表单过滤
	"filterCategoryIds": {
		key: guid(),
		remark: '根据类型筛选',
		cur: 0,            //  当前列表呗选中的项目
		isOpen: false, //  排序列表的下拉状态
		errorMsg: '',
		isFetching: false,
		options: [{         // 列表内容
			text: '全部类型',
			key: 'all'
		}],
	},
	// 按提交时间过滤
	"filterTaskDate": {
		startTime:moment(new Date()-0-(3600*24*1000)),
		endTime:moment(new Date()),
		key: guid(),
		remark: '按提交时间过滤',
		cur: 0,
		isOpen: false,
		options: baseTimeFilter.slice(0)
	},
	// 待审批页按接收时间
	"filterReceivingDate": {
		startTime:moment(new Date()-0-(3600*24*1000)),
		endTime:moment(new Date()),
		key: guid(),
		remark: '待审批按接收时间',
		cur: 0,
		isOpen: false,
		options: [{text: '接收时间',key: 'all'}].concat(baseTimeFilter.slice(1))
	},
	// 已审批按完成时间
	"filterCompletionDate": {
		startTime:moment(new Date()-0-(3600*24*1000)),
		endTime:moment(new Date()),
		key: guid(),
		remark: '已审批按完成时间',
		cur: 0,
		isOpen: false,
		options: [{text: '完成时间',key: 'all'}].concat(baseTimeFilter.slice(1))
	},
	// 已审批的全部状态列表
	"filterListDoneStatus": {
		key: guid(),
		remark: '根据状态筛选',
		cur: 0,
		isOpen: false,
		options: [{
			text: '全部状态',
			key: 'all'
		}, {
			text: '已完成',
			key: 'true'
		}, {
			text: '审批中',
			key: 'false'
		},{
			text: '已终止',
			key: 'stop'
		}]
	},
	"filterListMineStatus": {
		key: guid(),
		remark: '我发起的筛选',
		cur: 0,
		isOpen: false,
		options: [{
			text: '全部状态',
			key: 'all'
		}, {
			text: '已完成',
			key: 'completed'
		}, {
			text: '审批中',
			key: 'running'
		},{
			text: '草稿态',
			key: 'tempSave'
		},{
			text: '已终止',
			key: 'stop'
		}/* ,  {
	        text: '已提交',
	        key: 'submit'
	    }*/]
	},
	"sortListCompletion": {
		key: guid(),
		remark: '排序',
		cur: 0,
		isOpen: false,
		options: [{
			text: '按完成时间由近及远',
			key: 'sort-by-completionTime-desc'
		},
			{
			text: '按完成时间由远及近',
			key: 'sort-by-completionTime-asc'
		}].concat(commonSortList)
	},
	"sortListToDo": {
		key: guid(),
		remark: '排序',
		cur: 0,
		isOpen: false,
		options: [{
			text: '按接收时间由近及远',
			key: 'sort-by-receivingTime-desc'
		},
			{
			text: '按接收时间由远及近',
			key: 'sort-by-receivingTime-asc'
		}
		].concat(commonSortList)
	}
}

// 同时只能打开一个下拉框
function toggleOneOpen(state, action) {
	for(var k in state){
		if(state[k] && state[k].isOpen){
			state[k].isOpen = false;
		}
	}
	if(action.type === SHOW_MENU){
		return true;
	} else {
		return false;
	}
}

function setDropdownChecked(state, action) {
	switch (action.type) {
		case CHANGE_DROPDOWN_CHECKED:
			if (state == action.checked) {
				return state
			}
			return action.checked
		default:
			return state
	}
}
function setSelectedFormsId(state, action) {
	switch (action.type) {
		case SET_SELECTEDFORMSID:
			if (state == action.selectedFormsId) {
				return state
			}
			return action.selectedFormsId
		default:
			return state
	}
}
function setSelectedCategoryId(state, action) {
	switch (action.type) {
		case SET_SELECTEDCATEGORYID:
			if (state == action.selectedCategoryId) {
				return state
			}
			return action.selectedCategoryId
		default:
			return state
	}
}


function setOptions(state, action) {
	switch (action.type) {
		case GETCATEGORY_SUCCESS:
			return action.data
		default:
			return state
	}
}

function changeErrorMsg(state, action) {
	switch (action.type) {
		case GETCATEGORY_SUCCESS:
			return ''
		case GETCATEGORY_FAILURE:
			return action.message
		default:
			return state
	}
}

function changeIsFetching(state, action) {
	switch (action.type) {
		case GETCATEGORY_REQUEST:
			return true
		case GETCATEGORY_SUCCESS:
		case GETCATEGORY_FAILURE:
			return false
		default:
			return state
	}
}

function initDropdownIndex(state, action){
	// 应该返回新对象
	for (let k in state){
		if(state[k] && state[k].cur != 0){
			state[k].cur = 0;
		}
	}
	// return state;
	return Object.assign({},state);
}

export default function dropdown(state = initialState, action) {
	let name = action.name, dropdownName = '';
	if(action.type == CHANGE_DROPDOWN_INIT){
		return initDropdownIndex(state, action);
	} else {
		if(name && state[name]){
			dropdownName = name;
			state[name].isOpen = toggleOneOpen(state, action);
			state[name].cur = setDropdownChecked(state[name].cur, action);
			action.dateperiod && (state[name].startTime = action.dateperiod.startTime,state[name].endTime = action.dateperiod.endTime);
		} else {
			toggleOneOpen(state, action);
		}
		return {
			dropdownName: dropdownName,
			filterCategoryIds: {
				cur: state["filterCategoryIds"].cur,
				isOpen: state["filterCategoryIds"].isOpen,
				options: setOptions(state["filterCategoryIds"].options, action),
				errorMsg: changeErrorMsg(state["filterCategoryIds"].errorMsg, action),
				isFetching: changeIsFetching(state["filterCategoryIds"].isFetching, action)
			},
			sortListCompletion: state["sortListCompletion"],
			sortListToDo: state["sortListToDo"],
			filterCompletionDate: state["filterCompletionDate"],
			filterReceivingDate: state["filterReceivingDate"],
			filterTaskDate: state["filterTaskDate"],
			filterDueDateOverdue: state["filterDueDateOverdue"],
			filterDatetimePeriod: state["filterDatetimePeriod"],
			filterListDoneStatus: state["filterListDoneStatus"],
			filterListMineStatus: state["filterListMineStatus"]
		};
	}

}
