import React, { Component, PropTypes } from 'react'
import CSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import Dialog from '../components/Dialog'
import Loading from '../components/Loading'
import { hide, toggleCategory, checkForm, primary } from '../actions/formList'
import forEach from 'lodash/forEach'
import color from '../components/Color'

class FormListContainer extends Component {
  render() {
    const { categories, curForm, isFetching, errorMsg, isOpen, hide, primary, tip } = this.props
    let _errorMsg = errorMsg ? errorMsg : ''
    let _status
    if (!_errorMsg && !categories.length) {
        _errorMsg = '没有找到能填写的表单'
        _status = 'no-data'
    }
    let toggleCategory = this.toggleCategory.bind(this)
    let checkForm = this.checkForm.bind(this)
    let forms = []
    let index = 0
    let l = color.length - 1
    forEach(categories, (category, i) => {
        forEach(category.forms, (form, j) => {
            forms.push(
                <li className={form.id == curForm ? "form active" : "form"} key={i+','+j}>
                    <a href="#" onClick={checkForm(form.id)}>
                        <div className="form-title">
                            <span>{form.name}</span>
                        </div>
                        <span className="category-title" style={{background: color[(index++)%l]}}>{category.name}</span>
                    </a>
                </li>
            )
        })
    })

    return (
        <Dialog show={isOpen} onHide={hide} onPrimary={primary} dialogClassName="form-list-dialog" title="表单列表">
			<CSSTransitionGroup className="form-list-tip-wrap" component="div" transitionName="form-list-tip" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
			{tip ? <div className="alert alert-warning form-list-tip">{tip}</div> : undefined}
			</CSSTransitionGroup>
            <Loading errorMsg={_errorMsg} status={_status} isFetching={isFetching}>
                <ul className="forms-list clearfix">{forms}</ul>
            </Loading>
        </Dialog>
    )
  }
  toggleCategory (id) {
      return (e) => {
          e.preventDefault()
          this.props.toggleCategory(id)
      }
  }
  checkForm (id) {
      return (e) => {
          e.preventDefault()
          this.props.checkForm(id)
      }
  }
}


FormListContainer.propTypes = {
  categories: PropTypes.array.isRequired,
  curForm: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  errorMsg: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired,
  primary: PropTypes.func.isRequired,
  tip: PropTypes.string.isRequired,
}

function mapStateToProps(state) {
  let { categories, curForm, isOpen, errorMsg, isFetching, tip } = state.formList
  return {
    categories,
    curForm,
    isOpen,
    errorMsg,
    isFetching,
	tip
  }
}

export default connect(
  mapStateToProps,
  { hide, toggleCategory, checkForm, primary }
)(FormListContainer)
