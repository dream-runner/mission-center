import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Dialog from '../components/Dialog'
import Loading from '../components/Loading'
import { hide } from '../actions/form'
import { getList } from '../actions/list'

class FormContainer extends Component {
  render() {
    const { src, isOpen, hide, isFetching, errorMsg, getList } = this.props
    let _errorMsg = errorMsg ? errorMsg : ''
    let _status
    if (!_errorMsg && !src) {
        _errorMsg = '未查询到表单数据'
        _status = 'no-data'
    }

		// 提供给详情页面使用
		window.onHide = this.hideDialog.bind(this);

    return (
        <Dialog show={isOpen} onHide={this.hideDialog.bind(this)} dialogClassName="form-dialog" title="审批流程" noFooter={true}>
            <Loading className="form-iframe-wrap" errorMsg={_errorMsg} status={_status} isFetching={isFetching}>
                <iframe className="form-iframe" src={src}/>
            </Loading>
        </Dialog>
    )
  }
	hideDialog(){
		this.props.hide();
		this.props.getList();
	}
}


FormContainer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired,
  hide: PropTypes.func.isRequired,
  errorMsg: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
  let { isOpen, src, errorMsg, isFetching } = state.form
  return {
    isOpen,
    src,
    errorMsg,
    isFetching
  }
}

export default connect(
  mapStateToProps,
  { hide, getList }
)(FormContainer)
