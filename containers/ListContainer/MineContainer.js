import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import map from 'lodash/map'
import { show as formDialogShow } from '../../actions/form'
import { show as confirmDialogShow, hide as confirmDialogHide } from '../../actions/confirm'
import { getRandomColor } from '../../components/RandomColor'
import  PageContainer  from '../PageContainer'
import timeFilter from '../../filter/time'

class MineContainer extends Component {
    render() {
        const {
            items
        } = this.props
        return (
        <div>
            <ul>
                {
                    map(items, (item, i) => {
                        if(!item.formdata)
                            return;
                        let toolbarChildren
                        let statusClassName = ''
                        let statusText = ''
                        let timeText = ''
                        let time = ''
                        let bgcolor = getRandomColor(item.formdata.form.botype_name || '其他')
                        switch (item.status.toString()) {
                            case '0':
                                statusClassName = 'notSubmit'
                                statusText = '未提交'
                                timeText = `填写时间：${timeFilter(item.formdata.form.createTime)}`
                                toolbarChildren = (i) => [
                                    <li key={`toolbar-area-li-2-${i}`}><a href="#" onClick={this.edit(item)}>编辑</a></li>,
                                    <li key={`toolbar-area-li-1-${i}`}><a href="#" onClick={this.delete(item)}>删除</a></li>,
                                    <li key={`toolbar-area-li-0-${i}`}><a href="#" onClick={this.submit(item)}>提交</a></li>
                                ]
                                break;
                            case '1':
                                statusClassName = 'inHandle'
                                statusText = '处理中'
                                try {
                                    timeText = `提交时间：${timeFilter(item.proInsData.historicProcessInstance.startTime)}`
                                } catch(err) {
                                    time = timeFilter(item.formdata.form.createTime)
                                    timeText = `提交时间：${time ? time : '--'}`
                                }
                                toolbarChildren = (i) => [
                                    <li key={`toolbar-area-li-0-${i}`}><a href="#" onClick={this.check(item)}>查看</a></li>
                                ]
                                break;
                            case '2':
                                statusClassName = 'complate'
                                statusText = '已完成'
                                try {
                                    if (item.proInsData&&item.proInsData.id) {
                                        timeText = `提交时间：${timeFilter(item.proInsData.historicProcessInstance.startTime)}`
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
                            case '3':
                                statusClassName = 'complate'
                                statusText = '已提交'
                                timeText = `提交时间：${timeFilter(item.formdata.form.createTime)}`
                                toolbarChildren = (i) => [
                                    <li key={`toolbar-area-li-0-${i}`}><a href="#" onClick={this.check(item)}>查看</a></li>
                                ]
                                break;
                            case '4':
                                statusClassName = 'complate'
                                statusText = '已保存'
                                timeText = `创建时间：${timeFilter(item.formdata.form.createTime)}`
                                toolbarChildren = (i) => [
                                    <li key={`toolbar-area-li-0-${i}`}><a href="#" onClick={this.check(item)}>查看</a></li>
                                ]
                                break;

                            default:
                                break;
                        }
                        return (
                            <li key={`card-list-item${i}`} className="card-list-item">
                                <ul key={`info-area${i}`} className="info-area">
                                    <li key={`info-area-li-0-${i}`}>{timeText}</li>
                                    <li key={`info-area-li-1-${i}`} className={statusClassName}>{statusText}</li>
                                    { item.proInsData && item.proInsData.curHandler ? (<li key={`info-area-li-2-${i}`}>当前处理人: {item.proInsData.curHandler}</li>) : undefined }
                                </ul>
                                <h3 key={`h3${i}`}>
                                    <span key={`category-name${i}`} style={{"backgroundColor":bgcolor}} className="category-name">{item.formdata.form.botype_name || '其他'}</span>
                                    {item.formdata.form.bo_name}
                                </h3>
                                <ul key={`fields-area${i}`} className="fields-area clearfix">
                                    {
                                        map(item.formdata.fields, (field, i) => (
                                            <li key={i}>{field.name}: {field.value}</li>
                                        ))
                                    }
                                </ul>
                                <ul key={`toolbar-area${i}`} className="toolbar-area">
                                    {typeof toolbarChildren == 'function' ? toolbarChildren(i) : undefined}
                                </ul>
                            </li>
                        )
                    })
                }
            </ul>
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
