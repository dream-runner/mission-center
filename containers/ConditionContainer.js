import React, { Component, PropTypes } from 'react'
// 下拉菜单
import DropdownContainer from './DropdownContainer'
// 排序筛选
import SortRuleContainer from './SortRuleContainer'
// 搜索
import SearchContainer from './SearchContainer'

class ConditionContainer extends Component {
	render() {
		const { components } = this.props;
	  return (
				<div className="nav nav-tabs filter-wrap">
					<ul className="dropdown-wrap">
						{components.map(function(item, index){
							if(item == 'filter-sort-condition'){
								return <SortRuleContainer key={index} name={item} />
							} else {
								return <DropdownContainer key={index} name={item} components={components} />
							}
						})}
					</ul>
					<SearchContainer />
				</div>
	  )
  }
}

export default ConditionContainer
