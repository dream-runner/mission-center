import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Dialog from '../components/Dialog'
import { hide } from '../actions/confirm'

class ConfirmContainer extends Component {
  render() {
    const { isOpen, hide, content, callBack } = this.props
    return (
        <Dialog show={isOpen} onHide={hide} onPrimary={callBack} title="" dialogClassName="mission-center-confirm" title="">
            { content }
        </Dialog>
    )
  }
}


ConfirmContainer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
  callBack: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  let { isOpen, content, callBack } = state.confirm
  return {
    isOpen,
    content,
    callBack
  }
}

export default connect(
  mapStateToProps,
  { hide }
)(ConfirmContainer)
