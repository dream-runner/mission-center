import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import List from '../../components/List'
import { show, getBo } from '../../actions/form'
import timeFilter from '../../filter/time'
import map from 'lodash/map'
import filter from 'lodash/filter'
import PageContainer from '../PageContainer'

class FinishContainer extends Component {
    render() {
			const { items, pagination } = this.props;
			const showPagination = pagination.pageTotal > 1 ? <PageContainer items={pagination.pageTotal} /> : '';
			let node = map(items, (item, i) => {
				let {historicProcessInstance, dueDate, createTime, endTime:processCompleteTime} = item;
				// let uname = (historicProcessInstance && historicProcessInstance.startParticipant && historicProcessInstance.startParticipant.name)||'';
				let processInstance = historicProcessInstance;
				let processCurName = processInstance.startParticipant && processInstance.startParticipant.name ? <span className="uname">{processInstance.startParticipant.name.substr(-2,2)}</span> : '';
				let processCurAvatar = processInstance.startParticipant && processInstance.startParticipant.pic ? <span className="avatar"><img src={processInstance.startParticipant.pic} alt={processInstance.startParticipant.name} /></span> : '';
				let processTitle = processInstance.name || '';
				let processkeyFeature = this.getProcessKeyFeature(processInstance);
				let processStatus = this.getProcessStatus(item);
				let processCreateTime = new Date(processInstance.startTime).format('yyyy-MM-dd HH:mm');
				processCompleteTime = new Date(processCompleteTime).format('yyyy-MM-dd HH:mm');
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
										<span className="item-info-cell">{`完成时间：${processCompleteTime}`}</span>
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

			return (
				<div className="main-list-wrap">
					<List>{node}</List>
					{showPagination}
				</div>
			)
    }

		getProcessKeyFeature(processInstance){
			let str = null, list = null, keyFeatureStr = processInstance.keyFeature;
			try{list = JSON.parse(processInstance.keyFeature);}catch(e){}
			if(list && Object.prototype.toString.call(list) == '[object Array]' ){
				str = list.map((item,index) =>{
					return <li key={index}>{item.key}:{item.value}</li>
				});
			}
			return <ul className="remark-list">{str}</ul>;
		}
		getProcessStatus(processMainInfo){
			// 已审批中的状态逻辑：
			// 已完成 processFinished=true且历史流程中的deleteReason!=delete
			// 已中止 processFinished=true且deleteReason==delete
			// 审批中 processFinished=false
			let str = '';
			if(processMainInfo.processFinished){
				if(processMainInfo.historicProcessInstance.deleteReason && (processMainInfo.historicProcessInstance.deleteReason.toLocaleLowerCase().indexOf('delete') > -1||processMainInfo.historicProcessInstance.deleteReason.toLocaleLowerCase().indexOf('stop') > -1)){
					str = <span className="btn-tip btn-tip-stop">{'OUTTIMEDELETED'===processMainInfo.deleteReason?'超期终止':'已终止'}</span>;
				} else{
					str = <span className="btn-tip btn-tip-done">已完成</span>;
				}
      } else if('REJECTTOSTART' === processMainInfo.deleteReason){
          str = <span className="btn-tip btn-tip-done">驳回草稿</span>;
			} else if('REJECTTOSTARTSUSPENSION' === processMainInfo.deleteReason){
				str = <span className="btn-tip btn-tip-doing">任务挂起</span>;
			} else {
				str = <span className="btn-tip btn-tip-doing">审批中</span>;
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
    items: PropTypes.array.isRequired,
		pagination: PropTypes.object.isRequired
}

export default connect(
    ()=>({}),
    { show, getBo }
)(FinishContainer)
