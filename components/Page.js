import React, {Component, PropTypes} from 'react'
import {Pagination} from 'react-bootstrap'
import {connect} from 'react-redux'
import {change, prepage, nextpage} from '../actions/page'

export default class Page extends Component {
		render() {
				let {onSelect, items, activePage, bsSize} = this.props;
				return (
						<div className="pagination-wrap">
								<Pagination prev next first last bsSize items={items} maxButtons={5} activePage={activePage} onSelect={onSelect}/>
						</div>
				);
		}
}
