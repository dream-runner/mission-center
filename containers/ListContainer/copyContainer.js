import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import List from '../../components/List'
import { show, getBo } from '../../actions/form'
import timeFilter from '../../filter/time'
import map from 'lodash/map'
import PageContainer from '../PageContainer'

class copyContainer extends Component {
	render() {
			const { items, pagination } = this.props;
			const showPagination = pagination.pageTotal > 1 ? <PageContainer items={pagination.pageTotal} /> : '';
			let node = map(items, (item, i) => {
				let {title, historicProcessInstance, taskStatus, dueDate, createTime} = item;
				let processInstance = historicProcessInstance;
				if(!processInstance){
					console.info('historicProcessInstance数据异常为null',item);
					return;
				}
				let processCurRead = taskStatus == '0' ? <span className="unread" ref="unread" data-status="0"><i>未读</i></span> : <span className="read" ref="read" data-status="1"><i>已读</i></span>
				let processCurName = processInstance.startParticipant && processInstance.startParticipant.name ? <span className="uname">{processInstance.startParticipant.name.substr(-2,2)}</span> : '';
				let processCurAvatar = processInstance.startParticipant && processInstance.startParticipant.pic ? <span className="avatar"><img src={processInstance.startParticipant.pic} alt={processInstance.startParticipant.name} /></span> : '';
				let processTitle = title || '';
				let processkeyFeature = this.getProcessKeyFeature(processInstance);
				let processStatus = this.getProcessStatus(processInstance);
				let processCreateTime = new Date(createTime).format('yyyy-MM-dd HH:mm');
					return (
							<div key={i} className="item">
								<div className="box" onClick={this.showDetail(item)}>
									<div className="item-info">
										<div className="l">
										{processCurRead}
										{processCurName}
										{processCurAvatar}
										</div>
										<div className="m">
											<div>
												<h3>{processTitle}</h3>
												{processkeyFeature}
											</div>
										</div>
										<div className="r">
											<span className="item-info-cell">{`接收时间：${processCreateTime}`}</span>
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
	getProcessStatus(processInstance){
		let str = '';
		if(processInstance.state === 'end'){ // 已完成
			str = <span className="btn-tip btn-tip-done">已完成</span>;
		} else if(processInstance.state === 'delete'){ // 已中止
			str = <span className="btn-tip btn-tip-stop">已终止</span>;
		} else if(processInstance.deleteReason == 'REJECTTOSTART'){
				str = <span className="btn-tip btn-tip-done">驳回草稿</span>;
		} else { // 审批中
			str = <span className="btn-tip btn-tip-doing">审批中</span>;
		}
		return str;
	}
	showDetail(item) {
		return (e) => {
			e.preventDefault();
				if(item.taskStatus == '0'){
					if(this.refs.unread.getAttribute('data-status') == '0'){
						e.currentTarget.className = 'box hadread';
					}
				}
				this.props.getBo(item);
		}
	}
}

copyContainer.propTypes = {
    items: PropTypes.array.isRequired,
		pagination: PropTypes.object.isRequired
}

export default connect(
    ()=>({}),
    { show, getBo }
)(copyContainer)
