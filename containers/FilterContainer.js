import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Tab from '../components/Tab'
import SortRuleContainer from './SortRuleContainer'
import { changeFilter } from '../actions/filter'
import { getList } from '../actions/list'

class FilterContainer extends Component {
    render() {
        const {
            items,
            cur,
            isFetching,
            changeFilter,
            getList
        } = this.props
        return (
            <Tab items = { items }
                cur = { cur }
                className = { "nav nav-tabs filter-wrap" }
                onTabClicked = { this.onTabClicked.bind(this) }>
                <SortRuleContainer />
            </Tab>
        )
    }
    onTabClicked (e, checked) {
        const { cur, isFetching, changeFilter, getList } = this.props
        e.preventDefault()
        if (!isFetching && checked != cur) {
            changeFilter(checked)
            getList()
        }
    }
}

FilterContainer.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired
    })).isRequired,
    cur: PropTypes.number.isRequired,
    isFetching: PropTypes.bool.isRequired,
    changeFilter: PropTypes.func.isRequired,
    getList: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    let {
        items,
        cur
    } = state.filter
    let {
        isFetching
    } = state.list
    return {
        items,
        cur,
        isFetching
    }
}

export default connect(
    mapStateToProps,
    { changeFilter, getList }
)(FilterContainer)
