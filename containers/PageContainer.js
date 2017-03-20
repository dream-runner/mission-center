import React, {Component, PropTypes} from 'react'
import {Pagination} from 'react-bootstrap'
import {connect} from 'react-redux'
import Page from '../components/Page'
import {change, prepage, nextpage} from '../actions/page'

class PageContainer extends Component {
		render() {
				const {activePage, items, change, isSearch} = this.props
				return (<Page bsSize="small" items={items} activePage={activePage} onSelect={this.clickHandler(isSearch).bind(this)}/>)
		}

		clickHandler(isSearch) {
			let { change } = this.props;
				return (e) => {
					change(e, isSearch)
				}
		}

}

function mapStateToProps(state) {
		let {activePage, isSearch} = state.page
		return {activePage, isSearch}
}

export default connect(mapStateToProps, {change, prepage, nextpage})(PageContainer)
