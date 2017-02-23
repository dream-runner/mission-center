import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Tab from '../components/Tab'
import { changeNav, openFormList } from '../actions/nav'
import { changeSortRule } from '../actions/sort'
import { changeFilter } from '../actions/filter'
import { getList } from '../actions/list'
import { getItems } from '../actions/page'
import { show } from '../actions/formList'


class NavContainer extends Component {
    render() {
        const {
            items,
            cur,
            isFetching,
            changeNav,
            openFormList,
            getList,
            show
        } = this.props
        return (
            <nav className="navbar navbar-default nav-wrap">
                <div className="collapse navbar-collapse">
                    <Tab items={ items }
                        cur={ cur }
                        className ="nav navbar-nav"
                        onTabClicked = { this.onTabClicked.bind(this) }></Tab>
                    <div className="navbar-form navbar-right">
                        <button type="button" className="btn btn-default" onClick = { show }>
                            <i className="iconfont icon-pencil"></i> 填表单
                        </button >
                    </div>
                </div>
            </nav>
        )
    }

    onTabClicked (e, checked) {
        const {cur, isFetching, changeNav, changeSortRule, changeFilter, getList, getItems} = this.props
        e.preventDefault()
        if (!isFetching && checked != cur) {
            changeNav(checked)
            changeSortRule(0)
            changeFilter(0)
            if("我填写的"==e.target.innerText)
                 getItems()
            else
                 getList()
        }
    }

}

NavContainer.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        needTotal: PropTypes.bool.isRequired,
        total: PropTypes.number.isRequired
    })).isRequired,
    cur: PropTypes.number.isRequired,
    isFetching: PropTypes.bool.isRequired,
    changeNav: PropTypes.func.isRequired,
    openFormList: PropTypes.func.isRequired,
    getList: PropTypes.func.isRequired,
    getItems: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    let {
        items,
        cur
    } = state.nav
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
    { changeNav,changeSortRule, changeFilter, openFormList, getList, show, getItems }
)(NavContainer)
