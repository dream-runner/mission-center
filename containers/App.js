import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import NavContainer from './NavContainer'
import ListContainer from './ListContainer'
import FormListContainer from './FormListContainer'
import FormContainer from './FormContainer'
import ConfirmContainer from './ConfirmContainer'
import { hideMenu } from '../actions/sort'

class App extends Component {
    render() {
        const {
            hideMenu
        } = this.props
        return (
            <div className="container" onClick={ hideMenu }>
                <NavContainer/>
                <ListContainer/>
                <FormListContainer/>
                <FormContainer/>
                <ConfirmContainer/>
            </div>
        )
    }
}

App.propTypes = {
    hideMenu: PropTypes.func
}

export default connect(
    () => ({}),
    { hideMenu }
)(App)
