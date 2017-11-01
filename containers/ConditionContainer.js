import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux';
// 下拉菜单
import DropdownContainer from './DropdownContainer'
// 排序筛选
import SortRuleContainer from './SortRuleContainer'
// 搜索
import SearchContainer from './SearchContainer'

class ConditionContainer extends Component {
		render() {
		const {components, getList} = this.props;
		return (
			<div className="nav nav-tabs filter-wrap">

				<SearchContainer />
				<ul className="dropdown-wrap">
					{components.map((item, index) => {
						if (item == 'filter-sort-condition') {
							return <SortRuleContainer key={index} name={item}/>
						} else {
							return <DropdownContainer key={index} name={item} showFormPicker={() => this.showFormPicker.apply(this)}/>
						}
					})}
				</ul>
			</div>
		)
	}
}


export default ConditionContainer
// export default connect(null,{getList,setDropdownChecked})(ConditionContainer);
