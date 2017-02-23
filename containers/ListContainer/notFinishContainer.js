import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import List from '../../components/List'
import { getBo } from '../../actions/form'
import timeFilter from '../../filter/time'
import map from 'lodash/map'

class notFinishContainer extends Component {
    render() {
        const { items } = this.props
        let node = map(items, (item, i) => {
            let {
                    name,
                    processDefinitionName,
                    historicProcessInstance,
                    startTime
                } = item
            return (
                <div key={i} className="item">
                    <div className="item-info">
                        <h3>
                            <span className="link">{`【${name}】`}</span>
                            {processDefinitionName}
                        </h3>
                        <span className="item-info-cell">{`分配时间:${startTime && timeFilter(startTime) || ''}`}</span>
                        <span className="item-info-cell">{`提交时间:${historicProcessInstance && historicProcessInstance.startTime && timeFilter(historicProcessInstance.startTime) || ''}`}</span>
                        <span className="item-info-cell">{`提交人:${(historicProcessInstance && historicProcessInstance.startParticipant && historicProcessInstance.startParticipant.name)||''}`}</span>
                    </div>
                    <div className="button-area">
                        <button type="button" className="btn btn-default" onClick={this.clickHandler(item).bind(this)}>立即处理</button>
                    </div>
                </div>
            )
        })
        return (
            <List>{node}</List>
        )
    }
    clickHandler(item) {
        return (e) => {
            e.preventDefault()
            this.props.getBo(item)
        }
    }
}

notFinishContainer.propTypes = {
    items: PropTypes.array.isRequired
}

export default connect(
    ()=>({}),
    { getBo }
)(notFinishContainer)
