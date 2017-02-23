import React, { Component, PropTypes } from 'react'
import { Pagination } from 'react-bootstrap'
import { connect } from 'react-redux'
import { change, prepage ,nextpage } from '../actions/page'

export default class Page extends Component {
    render() {
        let {onSelect,items,activePage} = this.props
        return (
            <Pagination
                prev
                next
                first
                last
                bsSize="large"
                items={items}
                maxButtons={5}
                activePage={activePage}
                onSelect={onSelect} />
        );
    }
}
