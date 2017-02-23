import React, { Component, PropTypes } from 'react'
import map from 'lodash/map'

export default class Loading extends Component {
    render() {
        const { isFetching, errorMsg, children, className, status } = this.props
        let node
        if (isFetching) {
            node = (
                <div className="loading-wrap">
                    <div className="loading-spinner">
        				<div className="main-loader">
        					<div className="wBall wBall_1">
        						<div className="wInnerBall"> </div>
        					</div>
        					<div className="wBall wBall_2">
        						<div className="wInnerBall"> </div>
        					</div>
        					<div className="wBall wBall_3">
        						<div className="wInnerBall"> </div>
        					</div>
        					<div className="wBall wBall_4">
        						<div className="wInnerBall"> </div>
        					</div>
        					<div className="wBall wBall_5">
        						<div className="wInnerBall"> </div>
        					</div>
        				</div>
        			</div>
                </div>
            )
        } else if (errorMsg) {
            if (status == 'no-data') {
                node = (<div className="no-data">{errorMsg}</div>)
            } else {
                node = (<div className="alert alert-warning">{errorMsg}</div>)
            }
        } else {
            node = children
        }
        return (
        	<div className={className}>{node}</div>
        )
    }
}

Loading.propTypes = {
    isFetching: PropTypes.bool,
    errorMsg: PropTypes.string,
    status: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node
}
