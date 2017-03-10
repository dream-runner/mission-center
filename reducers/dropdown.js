import { SHOW_MENU, HIDE_MENU, CHANGE_DROPDOWN_CHECKED } from '../constants/ActionTypes'
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
	        text: '逾期',
	        key: 'dueDateoverdue'
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
	        key: 'done'
	    }, {
	        text: '进行中',
	        key: 'doing'
	    }, {
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
	        key: 'done'
	    }, {
	        text: '进行中',
	        key: 'doing'
	    }, {
	        text: '已终止',
	        key: 'stop'
	    }, {
	        text: '草稿',
	        key: 'draft'
	    },  {
	        text: '已提交',
	        key: 'submit'
	    }]
		}
}

function toggleOpen(state, action) {
    switch (action.type) {
        case SHOW_MENU:
            if (action.name && state) {
                return true
            }
            return state.isOpen
        case HIDE_MENU:
            return false
        default:
            return state.isOpen
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

export default function dropdown(state = initialState, action) {
	let name = action.name, dropdownName = '';
	if(name && state[name]){
		dropdownName = name;
		state[name].isOpen = toggleOpen(state[name], action);
		state[name].cur = setDropdownChecked(state[name].cur, action);
	}
  return {
		"dropdownName": dropdownName,
		"filterDueDateOverdue": state["filterDueDateOverdue"],
		"filterDatetimePeriod": state["filterDatetimePeriod"],
		"filterListDoneStatus": state["filterListDoneStatus"],
		"filterListMineStatus": state["filterListMineStatus"]
	};
}
