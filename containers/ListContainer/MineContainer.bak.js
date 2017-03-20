import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import map from 'lodash/map'
import { show as formDialogShow } from '../../actions/form'
import { show as confirmDialogShow, hide as confirmDialogHide } from '../../actions/confirm'
import { getRandomColor } from '../../components/RandomColor'
import  PageContainer  from '../PageContainer'
import timeFilter from '../../filter/time'

class MineContainer extends Component {

		currentProcessStatus(index){
			return <span className="btn-tip btn-tip-doing"></span>;
		}

    render() {
		  const {items} = this.props;
		  return (
				<div className="table-list">
					{
						map(items, (item, i) => {
								if(!item.formdata)
									return
								let curHandlerText = '';
								let toolbarChildren;
								let statusClassName = '';
								let statusText = '';
								let timeText = '';
								let time = '';
								let bgcolor = getRandomColor(item.formdata.form.botype_name || '其他');

								switch (item.status.toString()) {
										case '0': // 末提交
												statusClassName = 'notSubmit'
												statusText = <span className="btn-tip btn-tip-doing">未提交</span>
												timeText = `填写时间：${timeFilter(item.formdata.form.createTime)}`
												toolbarChildren = (i) => [
														<li key={`toolbar-area-li-2-${i}`}><a href="#" onClick={this.edit(item)}>编辑</a></li>,
														<li key={`toolbar-area-li-1-${i}`}><a href="#" onClick={this.delete(item)}>删除</a></li>,
														<li key={`toolbar-area-li-0-${i}`}><a href="#" onClick={this.submit(item)}>提交</a></li>
												]
												break;
										case '1': // 处理中
												statusClassName = 'inHandle'
												statusText = <span className="btn-tip btn-tip-doing">进行中</span>;
												curHandlerText = `当前环节：${ item.proInsData && item.proInsData.curHandler ? (item.proInsData.curHandler) : undefined }`;
												try {
														timeText = `更新时间：${timeFilter(item.proInsData.historicProcessInstance.startTime)}`
												} catch(err) {
														time = timeFilter(item.formdata.form.createTime)
														timeText = `提交时间：${time ? time : '--'}`
												}
												toolbarChildren = (i) => [
														<li key={`toolbar-area-li-0-${i}`}><a href="#" onClick={this.check(item)}>查看</a></li>
												]
												break;
										case '2': // 已完成
												statusClassName = 'complate'
												statusText = <span className="btn-tip btn-tip-done">已完成</span>;
												try {
														if (item.proInsData&&item.proInsData.id) {
																timeText = `更新时间：${timeFilter(item.proInsData.historicProcessInstance.startTime)}`
														} else {
																timeText = `提交时间：${timeFilter(item.formdata.form.createTime)}`
														}
												} catch(err) {
														timeText = '提交时间：--'
												}
												toolbarChildren = (i) => [
														<li key={`toolbar-area-li-0-${i}`}><a href="#" onClick={this.check(item)}>查看</a></li>
												]
												break;
										case '3': // 已提交
												statusClassName = 'complate'
												statusText = <span className="btn-tip btn-tip-done">已提交</span>;
												timeText = `提交时间：${timeFilter(item.formdata.form.createTime)}`
												toolbarChildren = (i) => [
														<li key={`toolbar-area-li-0-${i}`}><a href="#" onClick={this.check(item)}>查看</a></li>
												]
												break;
										case '4': // 已保存
												statusClassName = 'complate'
												statusText = <span className="btn-tip btn-tip-done">已保存</span>;
												timeText = `提交时间：${timeFilter(item.formdata.form.createTime)}`
												toolbarChildren = (i) => [
														<li key={`toolbar-area-li-0-${i}`}><a href="#" onClick={this.check(item)}>查看</a></li>
												]
												break;

										default:
												break;
								}

								return (
									<div className="item">
										<div className="box">
											<div className="item-info">
												<div className="l">
													<span className="avatar"></span>
												</div>
												<div className="m">
													<div>
														<h3>{item.formdata.form.bo_name}</h3>
														<ul className="remark-list">
															{
											            map(item.formdata.fields, (field, i) => (
											                <li key={i}>{field.name}: {field.value}</li>
											            ))
											        }
														</ul>

													</div>
												</div>
												<div className="r">
													<p>
														<span className="item-info-cell">{timeText}</span>
														<span className="item-info-cell">{curHandlerText}</span>
													</p>
												</div>
											</div>
											<div className="item-status">
												{statusText}
											</div>
										</div>
									</div>
								)
						})
					}
		    	<PageContainer/>
		    </div>
			)
		}

    submit (item) {
        return (e) => {
            e.preventDefault()
            this.props.confirmDialogShow(`确认要删除"${item.title}"吗？`, () => {
                console.log(item)
                this.props.confirmDialogHide()
            })
        }
    }
    delete (item) {
        return (e) => {
            e.preventDefault()
            this.props.confirmDialogShow(`确认要提交"${item.title}"吗？`, () => {
                console.log(item)
                this.props.confirmDialogHide()
            })
        }
    }
    edit (item) {
        return (e) => {
            e.preventDefault()
            let url = `${window.$ctx}/static/html/rt/browse.html?pk_bo=${item.formdata.form.pk_bo}&pk_boins=${item.formdata.form.pk_boins}`
            this.props.formDialogShow(url)
        }
    }
    check (item) {
        return (e) => {
            e.preventDefault()
            let url = `${window.$ctx}/static/html/rt/browse.html?pk_bo=${item.formdata.form.pk_bo}&pk_boins=${item.formdata.form.pk_boins}`
            this.props.formDialogShow(url)
        }
    }
}

MineContainer.propTypes = {
    items: PropTypes.array.isRequired,
    formDialogShow: PropTypes.func.isRequired,
    confirmDialogShow: PropTypes.func.isRequired,
    confirmDialogHide: PropTypes.func.isRequired
}

export default connect(
    ()=>({}),
    { formDialogShow, confirmDialogShow, confirmDialogHide }
)(MineContainer)
