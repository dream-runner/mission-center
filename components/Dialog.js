import React, { Component, PropTypes } from 'react'
import { Modal, Button } from 'react-bootstrap'

export default class Dialog extends Component {
    render() {
        const { show, onHide, onPrimary, children, title, dialogClassName, noFooter } = this.props

				window.onHide = onHide;

        return (
            <Modal show={show} onHide={onHide} dialogClassName={dialogClassName}  bsSize="large">
								<Modal.Header closeButton>
                    <Modal.Title>{ title }</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    { children }
                </Modal.Body>
                {noFooter ? undefined : (<Modal.Footer>
                    <Button bsStyle="primary" onClick={onPrimary}><i className="iconfont icon-confirm"></i> 确定</Button>
                    <Button onClick={onHide}>取消</Button>
                </Modal.Footer>)}
            </Modal>
        )
    }
}

Dialog.propTypes = {
    title: PropTypes.string,
    show: PropTypes.bool,
    onHide: PropTypes.func,
    onPrimary: PropTypes.func,
    children: PropTypes.any,
    dialogClassName: PropTypes.string
}
