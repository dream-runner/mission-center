import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Loading from '../../components/Loading'
import FilterContainer from '../FilterContainer'
import ConditionContainer from '../ConditionContainer'
import NotFinishContainer from './notFinishContainer'
import FinishContainer from './FinishContainer'
import MineContainer from './MineContainer'
import SearchContainer from '../SearchContainer'
import CopyContainer from './copyContainer'

const data = [
    {
        tabName: '待审批',
        hasFilter: true,
        className: 'list-wrap',
				components: ['filterDueDateOverdue','filterTaskDate','filterCategoryIds'/*,'filter-sort-condition'*/],
        nodeClass: NotFinishContainer
    },
		{
        tabName: '抄送的',
        hasFilter: false,
        className: 'list-wrap',
				components: [''],
        nodeClass: CopyContainer
    },
    {
        tabName: '已审批',
        hasFilter: true,
        className: 'list-wrap',
				components: ['filterListDoneStatus','filterTaskDate','filterCategoryIds'/*,'filter-sort-condition'*/],
        nodeClass: FinishContainer
    },
    {
        tabName: '我发起的',
        hasFilter: false,
        className: 'list-wrap',
				components: [''],
        nodeClass: MineContainer
    }
]

class ListContainer extends Component {
    render() {
        const {
            items,
						pagination,
            isFetching,
            errorMsg,
            cur
        } = this.props
        let _errorMsg = errorMsg ? errorMsg : ''
        let { nodeClass, className, hasFilter, tabName, components } = this.makeNode(cur)
        let _status
        if (!_errorMsg && !items.length) {
            _errorMsg = `还没有${tabName}的工作，喝点茶吧`
            _status = 'no-data'
        }

        return (
            <div className="row mission-center-content">
                { /*hasFilter ? <FilterContainer /> : <SearchContainer/>*/ }
								{hasFilter ? <ConditionContainer components={components} /> : <div className="nav nav-tabs filter-wrap"><SearchContainer /></div>}
                <Loading className={ `row  ${className}` } errorMsg={ _errorMsg } status={ _status } isFetching={ isFetching }>
                    {React.createElement(nodeClass, {items: items, pagination: pagination})}
                </Loading>
            </div>
        )
    }

    makeNode (cur) {
        return data[cur]
    }
}

ListContainer.propTypes = {
    items: PropTypes.array.isRequired,
		pagination: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    errorMsg: PropTypes.string.isRequired,
    cur: PropTypes.number.isRequired
}

function mapStateToProps(state) {
    let {
        items,
				pagination,
        errorMsg,
        isFetching
    } = state.list
    let cur = state.nav.cur
    return {
        items,
				pagination,
        isFetching,
        errorMsg,
        cur
    }
}

export default connect(mapStateToProps)(ListContainer)
