import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import Tab from '../components/Tab'
import {changeNav} from '../actions/nav'   // 更改nav 的选中
import {changeSortRule} from '../actions/sort' // 更改排序的规则 时间顺序等
import {changeFilter} from '../actions/filter'  //切换 本周 上周 本月 上月 更多
import {getList} from '../actions/list'       //action用于 获取列表数据
import {getItems, initActivePage} from '../actions/page'  //用于 获取数据，, 设置当前页码
import {show} from '../actions/formList'    // 用于 模态框 加获取 修改list数据  发起审批
import {initDropdownIndex} from '../actions/dropdown'   // 用于 初始化dropdown数据
import {setFormFilters} from "../actions/formFilters"

class NavContainer extends Component {
	render() {
		const {
			items,
			cur,
			isFetching,
			changeNav,
			getList,
			show
		} = this.props
		return (
			<nav className="navbar navbar-default nav-wrap">
				<div className="collapse navbar-collapse">
					<Tab items={ items }
							 cur={ cur }
							 className="nav navbar-nav"
							 onTabClicked={ this.onTabClicked.bind(this) }></Tab>
					<div className="navbar-form navbar-right">
						<button type="button" className="btn btn-default" onClick={ show }>
							发起审批
						</button >
					</div>
				</div>
			</nav>
		)
	}

	onTabClicked(e, checked) {
		// 添加hideDropdown 解决nav切换，列表没收起来的bug，让所有列表收起来
		const {cur, isFetching, changeNav, changeSortRule, changeFilter, getList, getItems, initDropdownIndex, initActivePage, formFilters, setFormFilters} = this.props
		e.preventDefault()
		if (!isFetching && checked != cur) {
			changeNav(checked)
			changeSortRule(0)        // 排序规则
			changeFilter(0)          //  本周 上周 时间段的事件
			initDropdownIndex()    // 切换的时候，所有的下拉列表复原
			initActivePage(1)        // 设置当前页码
			setFormFilters({
				categoryId: "",
				formNames: "",
				checkedKeys: [],
				checkedFormsId: []
			});
			window.prev = window.flag || 0;
			window.flag = checked;

			// if("我发起的"==e.target.innerText)
			//      getItems()
			// else
			getList()       // 获取list数据
		}
	}

}

NavContainer.propTypes = {
	items: PropTypes.arrayOf(PropTypes.shape({
		text: PropTypes.string.isRequired,
		needTotal: PropTypes.bool.isRequired,
		total: PropTypes.number.isRequired
	})).isRequired,
	cur: PropTypes.number.isRequired,　　　　//　当前nav 被选中哪个
	isFetching: PropTypes.bool.isRequired,　　　//　是否在获取数据
	changeNav: PropTypes.func.isRequired,　　　//　更改nav 的选中
	getList: PropTypes.func.isRequired,    // 获取数据
	getItems: PropTypes.func.isRequired    //
}

const mapStateToProps = (state) => {
	let {
		items,
		cur
	} = state.nav
	let {
		isFetching
	} = state.list
	let {
		dropdown,
		formFilters
	} = state;
	return {
		items,
		cur,
		isFetching,
		dropdown,
		formFilters
	}
}

export default connect(
	mapStateToProps,
	{changeNav, changeSortRule, changeFilter, getList, show, getItems, initDropdownIndex, initActivePage, setFormFilters}
)(NavContainer)
