import React, { Component, PropTypes } from 'react'
import { Pagination } from 'react-bootstrap'
import { connect } from 'react-redux'
import { change, prepage ,nextpage } from '../actions/page'
import Page from '../components/Page'

class PageContainer extends Component {
    render() {
        const {
            activePage,
            items,
            change,
            isSearch
        } = this.props
        return (
            <Page
          bsSize="large"
          items={items}
          activePage={activePage}
          onSelect={this.clickHandler(isSearch).bind(this)} />
        )
    }

    clickHandler(isSearch) {
        return (e) => {
            this.props.change(e,isSearch)
        }
    }

}

function mapStateToProps(state) {
  let {
    activePage,
    items,
    isSearch
  } = state.page
  return {
    items,
    activePage,
    isSearch
  }
}

export default connect(
  mapStateToProps,
  { change, prepage ,nextpage}
)(PageContainer)