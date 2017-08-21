import { SHOW_MENU, HIDE_MENU, CHANGE_DROPDOWN_CHECKED, CHANGE_DROPDOWN_INIT,SET_SELECTEDFORMSID,SET_SELECTEDCATEGORYID } from '../constants/ActionTypes'
import { GETCATEGORY_REQUEST, GETCATEGORY_SUCCESS, GETCATEGORY_FAILURE} from '../constants/ActionTypes'
import guid from 'angular-uid'

const initialState = {
		"dropdownName": '',
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
		"filterCategoryIds": {
			key: guid(),
			remark: '根据类型筛选',
			cur: 0,
	    isOpen: false,
			errorMsg: '',
	    isFetching: false,
			options: [{
	        text: '全部类型',
	        key: 'all'
	    }],
		},
		"filterTaskDate": {
			key: guid(),
			remark: '待审批筛选',
			cur: 0,
	    isOpen: false,
			options: [{
	        text: '全部时间',
	        key: 'all'
	    }, {
	        text: '今天',
	        key: 'taskTime_today'
	    }, {
	        text: '昨天',
	        key: 'taskTime_yesterday'
	    }, {
	        text: '两天前',
	        key: 'taskTime_2more'
	    }]
		},
		"filterDatetimePeriod": {
			key: guid(),
			remark: '根据时段筛选',
			cur: 0,
	    isOpen: false,
			options: [{
	        text: '本周',
	        key: 'thisWeek'
	    }, {
	        text: '上周',
	        key: 'preWeek'
	    }, {
	        text: '本月',
	        key: 'thisMonth'
	    }, {
					text: '上月',
					key: 'preMonth'
			}, {
	        text: '全部',
	        key: 'all'
	    }]
		},
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
	    },/* {
	        text: '已终止',
	        key: 'stop'
	    }*/]
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
	        key: 'true'
	    }, {
	        text: '进行中',
	        key: 'false'
	    },/* {
	        text: '已终止',
	        key: 'stop'
	    }, {
	        text: '草稿',
	        key: 'draft'
	    },  {
	        text: '已提交',
	        key: 'submit'
	    }*/]
		}
}

// 同时只能打开一个下拉框
function toggleOneOpen(state, action) {
		for(var k in state){
			if(state[k].isOpen){
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
	for (let k in state){
		if(state[k] && state[k].cur != 0){
			state[k].cur = 0;
		}
	}
	return state;
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
		} else {
			toggleOneOpen(state, action);
		}
	  return {
			"dropdownName": dropdownName,
			"filterCategoryIds": {
				cur: state["filterCategoryIds"].cur,
		    isOpen: state["filterCategoryIds"].isOpen,
				options: setOptions(state["filterCategoryIds"].options, action),
				errorMsg: changeErrorMsg(state["filterCategoryIds"].errorMsg, action),
				isFetching: changeIsFetching(state["filterCategoryIds"].isFetching, action)
			},
			"filterTaskDate": state["filterTaskDate"],
			"filterDueDateOverdue": state["filterDueDateOverdue"],
			"filterDatetimePeriod": state["filterDatetimePeriod"],
			"filterListDoneStatus": state["filterListDoneStatus"],
			"filterListMineStatus": state["filterListMineStatus"]
		};
	}

}
