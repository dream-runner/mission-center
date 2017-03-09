import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Tab from '../components/Tab';
import { toggleDropdown } from '../actions/dropdown';
import { getList } from '../actions/list';

class DropdownContainer extends Component {
  render() {
    const { isFetching, getList, name, dropdown, toggleDropdown } = this.props;
		const { isOpen, cur, options } = dropdown[name];
		const wrapClassName = isOpen ? "dropdown open" : "dropdown";
    return (
			<li className={ wrapClassName }>
					<a className="dropdown-toggle" href="#" onClick={(e) => {
							e.preventDefault()
							e.stopPropagation()
							toggleDropdown(name)
					}}>{ options[cur].text } < span className = "caret" >< /span></a>
					<Tab items={ options }
							cur={ cur }
							className="dropdown-menu sort-rule-wrap"
							name = {name}
							onTabClicked={ this.onTabClicked.bind(this) }></Tab>
			</li>
    )
  }

	onTabClicked (e, checked) {
			const {cur, isFetching, changeSortRule, toggleDropdown, getList, name} = this.props
			e.preventDefault()
			e.stopPropagation()
			if (!isFetching && checked != cur) {
					toggleDropdown(name)
					getList()
			}
	}
}


function mapStateToProps(state) {
	const { isFetching } = state.list;
  return {
		isFetching,
		dropdown: state.dropdown
	};
}

export default connect(mapStateToProps, {toggleDropdown, getList})(DropdownContainer);
