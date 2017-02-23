import React, { Component, PropTypes } from 'react'
import map from 'lodash/map'

export default class Page extends Component {
    render() {
        const { hasNext, children } = this.props
        let node = [children]
        return (
        	<div>{
				[
					children,
					hasNext ? (<button type="button" onClick={this.nextPage.bind(this)}>加载更多</button>) : undefined
				]
			}</div>
        )
    },
	nextPage() {
		
	}
}

Loading.propTypes = {
	hasNext: propTypes.bool,
    children: PropTypes.node
}
