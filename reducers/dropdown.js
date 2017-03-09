import { SHOW_MENU, HIDE_MENU } from '../constants/ActionTypes'
import guid from 'angular-uid'

const initialState = {
		"filter-status-nonapproval": {
			key: guid(),
			remark: '待审批筛选',
			cur: 0,
	    isOpen: false,
			options: [{
	        text: '全部状态',
	        key: 'all'
	    }, {
	        text: '逾期',
	        key: 'overdue'
	    }]
		},
		"filter-period-condition": {
			key: guid(),
			remark: '根据时段筛选',
			cur: 0,
	    isOpen: false,
			options: [{
	        text: '本周',
	        key: 'curr-week'
	    }, {
	        text: '上周',
	        key: 'prev-week'
	    }, {
	        text: '本月',
	        key: 'curr-month'
	    }, {
					text: '上月',
					key: 'prev-month'
			}, {
	        text: '全部',
	        key: 'all'
	    }]
		},
		"filter-status-condition": {
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
		"filter-status-mine": {
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

export default function dropdown(state = initialState, action) {
	let name = action.name;
	if(name && state[name]){
		state[name].isOpen = toggleOpen(state[name], action);
	}
  return {
		"filter-status-nonapproval": state["filter-status-nonapproval"],
		"filter-period-condition": state["filter-period-condition"],
		"filter-status-condition": state["filter-status-condition"],
		"filter-status-mine": state["filter-status-mine"]
	};
}
