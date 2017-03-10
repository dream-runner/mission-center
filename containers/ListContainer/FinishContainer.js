import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import List from '../../components/List'
import { show, getBo } from '../../actions/form'
import timeFilter from '../../filter/time'
import map from 'lodash/map'
import filter from 'lodash/filter'

class FinishContainer extends Component {
    render() {
			const { items } = this.props
			let node = map(items, (item, i) => {
				let {historicProcessInstance, dueDate, createTime} = item;
				// let uname = (historicProcessInstance && historicProcessInstance.startParticipant && historicProcessInstance.startParticipant.name)||'';
				let processInstance = historicProcessInstance;
				let processCurName = processInstance.startParticipant && processInstance.startParticipant.name ? <span className="uname">{processInstance.startParticipant.name.substr(-2,2)}</span> : '';
				let processCurAvatar = processInstance.startParticipant && processInstance.startParticipant.pic ? <span className="avatar"><img src={processInstance.startParticipant.pic} alt={processInstance.startParticipant.name} /></span> : '';
				let processTitle = processInstance.name || '';
				let processkeyFeature = this.getProcessKeyFeature(processInstance);
				let processStatus = this.getProcessStatus(processInstance);
				let processCreateTime = new Date(processInstance.startTime).format('yyyy-MM-dd HH:mm');
				let processDueDate = dueDate && dueDate < new Date() ? <span className="duedate">逾期</span> : '';
				let processHandlerText = `当前环节：`;
				return (
					<div key={i} className="item">
							<div className="box" onClick={this.showDetail(item)}>
								<div className="item-info">
									<div className="l">
										{processCurName}
										{processCurAvatar}
									</div>
									<div className="m">
										<div>
											<h3>{processTitle}{processDueDate}</h3>
											{processkeyFeature}
										</div>
									</div>
									<div className="r">
										<span className="item-info-cell">{`提交时间：${processCreateTime}`}</span>
									</div>
								</div>
								<div className="item-status">
										{processStatus}
								</div>
							</div>
					</div>
				)
			})

			return (<List>{node}</List>)
    }
		getProcessKeyFeature(processInstance){
			let str = '';
			if(processInstance.keyFeature){
				str = <ul className="remark-list"></ul>;
			}
			return str;
		}
		getProcessStatus(processInstance){
			let str = '';
			if(processInstance.endTime){
				if(processInstance.deleteReason === 'stop'){
					str = <span className="btn-tip btn-tip-stop">已终止</span>;
				} else if(processInstance.deleteReason) {
					str = <span className="btn-tip btn-tip-done">已完成</span>;
				} else {
					str = <span className="btn-tip btn-tip-doing">进行中</span>;
				}
			} else {
				str = <span className="btn-tip btn-tip-doing">进行中</span>;
			}
			return str;
		}
    showDetail(item) {
        return (e) => {
            e.preventDefault()
            this.props.getBo(item)
        }
    }
}

FinishContainer.propTypes = {
    items: PropTypes.array.isRequired
}

export default connect(
    ()=>({}),
    { show, getBo }
)(FinishContainer)
