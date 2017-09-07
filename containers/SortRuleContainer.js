import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Tab from '../components/Tab'
import { changeSortRule, toggleDropdown, getCurSortText } from '../actions/sort'
import { getList } from '../actions/list'

class SortRuleContainer extends Component {
    render() {
        const {
            items,
            cur,
            isFetching,
            isOpen,
            changeSortRule,
            toggleDropdown,
            getCurSortText,
            getList
        } = this.props
        const wrapClassName = isOpen ? "dropdown open" : "dropdown"
        return (
            <li className={ wrapClassName }>
                <a className="dropdown-toggle" href="#" onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    toggleDropdown()
                }}>{ getCurSortText() } < span className = "caret" ></span></a>
                <Tab items={ items }
                    cur={ cur }
                    className="dropdown-menu sort-rule-wrap"
                    onTabClicked={ this.onTabClicked.bind(this) }></Tab>
            </li>
        )
    }
    onTabClicked (e, checked) {
        const {cur, isFetching,changeSortRule, toggleDropdown, getList} = this.props
        e.preventDefault()
        e.stopPropagation()
        if (!isFetching && checked != cur) {
            changeSortRule(checked)
            toggleDropdown()
            getList()
        }
    }
}

SortRuleContainer.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired
    })).isRequired,
    isOpen: PropTypes.bool.isRequired,
    cur: PropTypes.number.isRequired,
    isFetching: PropTypes.bool.isRequired,
    changeSortRule: PropTypes.func.isRequired,
    toggleDropdown: PropTypes.func.isRequired,
    getCurSortText: PropTypes.func.isRequired,
    getList: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    let {
        items,
        cur,
        isOpen
    } = state.sort
    let {
        isFetching
    } = state.list
    return {
        items,
        cur,
        isOpen,
        isFetching
    }
}

export default connect(
    mapStateToProps,
    { changeSortRule, toggleDropdown, getCurSortText, getList }
)(SortRuleContainer)
