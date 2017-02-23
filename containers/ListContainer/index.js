import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Loading from '../../components/Loading'
import FilterContainer from '../FilterContainer'
import notFinishContainer from './notFinishContainer'
import FinishContainer from './FinishContainer'
import MineContainer from './MineContainer'

const data = [
    {
        tabName: '进行中',
        hasFilter: true,
        className: 'list-wrap',
        nodeClass: notFinishContainer
    },
    {
        tabName: '已完成',
        hasFilter: true,
        className: 'list-wrap',
        nodeClass: FinishContainer
    },
    {
        tabName: '我填写',
        hasFilter: false,
        className: 'card-list-wrap',
        nodeClass: MineContainer
    }
]

class ListContainer extends Component {
    render() {
        const {
            items,
            isFetching,
            errorMsg,
            cur
        } = this.props
        let _errorMsg = errorMsg ? errorMsg : ''
        let { nodeClass, className, hasFilter, tabName } = this.makeNode(cur)
        let _status
        if (!_errorMsg && !items.length) {
            _errorMsg = `还没有${tabName}的工作，喝点茶吧`
            _status = 'no-data'
        }
        return (
            <div className="row mission-center-content">
                { hasFilter ? <FilterContainer /> : undefined }
                <Loading className={ `row  ${className}` } errorMsg={ _errorMsg } status={ _status } isFetching={ isFetching }>
                    {React.createElement(nodeClass, {items: items})}
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
    isFetching: PropTypes.bool.isRequired,
    errorMsg: PropTypes.string.isRequired,
    cur: PropTypes.number.isRequired
}

function mapStateToProps(state) {
    let {
        items,
        errorMsg,
        isFetching
    } = state.list
    let cur = state.nav.cur
    return {
        items,
        isFetching,
        errorMsg,
        cur
    }
}

export default connect(
    mapStateToProps
)(ListContainer)
