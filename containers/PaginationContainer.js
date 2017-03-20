import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Page from '../components/Page'
import { change, prepage ,nextpage } from '../actions/page'



export default class PaginationContainer extends Component {
   render() {
    let {items} = this.props
		 return (
			  <div>
				<Page
				  bsSize="small"
				  items={items}
				  activePage={this.state.activePage}
				  onSelect={this.handleSelect} />
				<br />
			  </div>
		);
  }
}
