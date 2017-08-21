import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Tab from '../components/Tab';
import {toggleDropdown, setDropdownChecked, hideDropdown} from '../actions/dropdown'; // 切换下拉列表打开关闭，设置对应下拉列表的选中项
import {getList} from '../actions/list';// 获取list列表数据

class DropdownContainer extends Component {
	render() {
		const {isFetching, getList, name, dropdown, toggleDropdown} = this.props;
		// name ：FilterDueDateOverDue dropdown数据
		const {isOpen, cur, options} = dropdown[name];
		const wrapClassName = isOpen ? "dropdown open" : "dropdown";
		// TODO  点击一个的时候需要把别的关闭，需要记录状态
		return (
			<li className={ wrapClassName }>
				{/*<a className="dropdown-toggle" href="#" onClick={(e) => {*/}
				{/*e.preventDefault()*/}
				{/*e.stopPropagation()*/}
				{/*toggleDropdown(name)*/}
				{/*}}>{ options[cur].text } <span className="caret"></span></a>*/}
				<a className="dropdown-toggle" href="#"
					 onClick={(e) => this.onLinkClicked.call(this, e, name)}>{ options[cur].text } <span className="caret"></span></a>
				<Tab items={ options }
						 cur={ cur }
						 className="dropdown-menu sort-rule-wrap"
						 name={name}
						 onTabClicked={ this.onTabClicked.bind(this) }></Tab>
			</li>
		)
	}

	// 第一次点击，打开自己，如果点击别人，就打开别人，关闭自己，如果点击自己，关闭自己
	onLinkClicked(e, name) {
		e.preventDefault();
		e.stopPropagation();
		const {components, hideDropdown, toggleDropdown} = this.props;
		if (window.clickedname && window.clickedname !== name) {
			components.forEach((item, index) => {
				if (item !== name) {
					hideDropdown(item);
				}
			})
		}
		toggleDropdown(name);
		window.clickedname = name;
	}

	onTabClicked(e, checked) {
		const {cur, isFetching, setDropdownChecked, toggleDropdown, getList, name} = this.props
		e.preventDefault();
		e.stopPropagation();
		if (!isFetching && checked != cur) {
			setDropdownChecked(name, checked); // 设置下拉列表选中
			toggleDropdown(name);      // 关闭下拉列表
			getList();               // 获取数据
		}
	}
}


function mapStateToProps(state) {
	const {isFetching} = state.list;
	return {
		isFetching,
		dropdown: state.dropdown
	};
}

export default connect(mapStateToProps, {toggleDropdown, setDropdownChecked, getList, hideDropdown})(DropdownContainer);
