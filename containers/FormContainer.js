import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Dialog from '../components/Dialog'
import Loading from '../components/Loading'
import { hide } from '../actions/form'

class FormContainer extends Component {
  render() {
    const { src, isOpen, hide, isFetching, errorMsg } = this.props
    let _errorMsg = errorMsg ? errorMsg : ''
    let _status
    if (!_errorMsg && !src) {
        _errorMsg = '未查询到表单数据'
        _status = 'no-data'
    }
    return (
        <Dialog show={isOpen} onHide={()=>{hide()}} dialogClassName="form-dialog" title="" noFooter={true}>
            <Loading className="form-iframe-wrap" errorMsg={_errorMsg} status={_status} isFetching={isFetching}>
                <iframe className="form-iframe" src={src}/>
            </Loading>
        </Dialog>
    )
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
  { hide }
)(FormContainer)
