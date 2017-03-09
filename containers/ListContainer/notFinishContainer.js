import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import List from '../../components/List'
import { show, getBo } from '../../actions/form'
import timeFilter from '../../filter/time'
import map from 'lodash/map'
import '../../utils/index'

class notFinishContainer extends Component {
    render() {
        const { items } = this.props
        let node = map(items, (item, i) => {
            let {processInstance, dueDate, createTime} = item;
						// let uname = (historicProcessInstance && historicProcessInstance.startParticipant && historicProcessInstance.startParticipant.name)||'';
						let processCurName = processInstance.startParticipant && processInstance.startParticipant.name ? processInstance.startParticipant.name : '';
						let processTitle = processInstance.name || '';
						let processkeyFeature = this.getProcessKeyFeature(processInstance);
						let processStatus = this.getProcessStatus(processInstance);
						let processCreateTime = new Date(createTime).format('yyyy-MM-dd HH:mm');
						let processDueDate = dueDate && dueDate < new Date() ? <span className="duedate">逾期</span> : '';
						return (
                <div key={i} className="item">
                    <div className="box" onClick={this.showDetail(item)}>
											<div className="item-info">
												<div className="l">
													<span className="avatar">{processCurName.substr(-2,2)}</span>
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
	                        {/*<button type="button" className="btn btn-default" onClick={this.clickHandler(item).bind(this)}>立即处理</button>*/}
	                    </div>
                    </div>
                </div>
            )
        })
        return (
            <List>{node}</List>
        )
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
			if(processInstance.completed){ // 已完成
				str = <span className="btn-tip btn-tip-done">已完成</span>;
			} else if(processInstance.ended){ // 已终止
				str = <span className="btn-tip btn-tip-stop">已终止</span>;
			} else { // 审批中
				str = <span className="btn-tip btn-tip-doing">审批中</span>;
			}
			return str;
		}
    showDetail(item) {
        return (e) => {
            e.preventDefault();
            this.props.getBo(item);
        }
    }
}

notFinishContainer.propTypes = {
    items: PropTypes.array.isRequired
}

export default connect(
    ()=>({}),
    { show, getBo }
)(notFinishContainer)
