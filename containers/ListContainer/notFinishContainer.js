import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import List from '../../components/List'
import {getBo} from '../../actions/form'  // 获取模态框数据 ( 删除了 show, 没有用 )
import timeFilter from '../../filter/time'
import map from 'lodash/map'
import '../../utils/index'
import PageContainer from '../PageContainer'


class notFinishContainer extends Component {
	render() {
		const {items, pagination} = this.props;
		const showPagination = pagination.pageTotal > 1 ? <PageContainer items={pagination.pageTotal}/> : '';

		let node = map(items, (item, i) => {
			let {processInstance, dueDate, createTime, procInsStartTime} = item;
			if (!processInstance){
				console.error(`processInstance with id:${item.id} is null!`);
				return;
			}
			processInstance['parentVariables'] = item.variables;
			// let uname = (historicProcessInstance && historicProcessInstance.startParticipant && historicProcessInstance.startParticipant.name)||'';
			let processCurName = processInstance.startParticipant && processInstance.startParticipant.name ?
				<span className="uname">{processInstance.startParticipant.name.substr(-2, 2)}</span> : '';
			let processCurAvatar = processInstance.startParticipant && processInstance.startParticipant.pic ?
				<span className="avatar"><img src={processInstance.startParticipant.pic}
																			alt={processInstance.startParticipant.name}/></span> : '';
			let processTitle = processInstance.name || '';
			let processkeyFeature = this.getProcessKeyFeature(processInstance);
			let processStatus = this.getProcessStatus(processInstance);
			let processCreateTime = new Date(createTime).format('yyyy-MM-dd HH:mm');
			procInsStartTime = new Date(procInsStartTime).format('yyyy-MM-dd HH:mm');
			let dueDateTime = dueDate && new Date(dueDate).getTime();
			let processDueDate ='';
			if(item.outtime){
				processDueDate = <span className="sts-warning duedate">超期</span>;
			}else if(item.warning){
				processDueDate = <span className="sts-warning warning">预警</span>;
			}
			return (
				<div key={i} className="item tab-doing">
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
								<span className="item-info-cell">{`接收时间：${processCreateTime}`}</span>
							</div>
							<div className="r">
								{processStatus}
								<span className="item-info-cell">{`提交时间：${procInsStartTime}`}</span>
							</div>
						</div>
						<div className="item-status">
							{/*<button type="button" className="btn btn-default" onClick={this.clickHandler(item).bind(this)}>立即处理</button>*/}
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
	// 获取列表每项的数据描述
	getProcessKeyFeature(processInstance) {
		let str = null, list = null, keyFeatureStr = processInstance.keyFeature;
		try {
			list = JSON.parse(processInstance.keyFeature);
		} catch (e) {
		}
		if (list && Object.prototype.toString.call(list) == '[object Array]') {
			str = list.map((item, index) => {
				return <li key={index}>{item.key}:
					<span dangerouslySetInnerHTML={{__html:item.value.replace(/\$PRINTASHTML\$/g,'')}}></span>
				</li>
			});
		}
		return <ul className="remark-list">{str}</ul>;
	}

	// 获取任务完成状态
	getProcessStatus(processInstance) {
		let str = '';
		if (processInstance.completed) { // 已完成
			str = <span className="btn-tip btn-tip-done">已完成</span>;
		} else if (processInstance.ended) { // 已终止
			str = <span className="btn-tip btn-tip-stop">已终止</span>;
		} else { // 审批中
			// str = <span className="btn-tip btn-tip-doing"></span>;
			let taskAddApproved = false;
			if (processInstance.parentVariables) {
				processInstance.parentVariables.forEach((val) => {
					if ('counterSigning' === val.name && true === val.value) {
						taskAddApproved = true;
						return false;
					}
				})
			}
			taskAddApproved && (str = <span className="btn-tip btn-tip-addtother">加签中</span>);
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
	items: PropTypes.array.isRequired,
	pagination: PropTypes.object.isRequired
}

export default connect(
	() => ({}),
	{getBo}
)(notFinishContainer)
