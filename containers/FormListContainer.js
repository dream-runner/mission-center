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
    if ((!_errorMsg && !categories.length) || ((categories.length === 1) && (categories[0].forms.length === 0))) {
        _errorMsg = '没有找到能填写的表单'
        _status = 'no-data'
    }
    let toggleCategory = this.toggleCategory.bind(this)
    let checkForm = this.checkForm.bind(this)
    let formLists = []
    let index = 0
    let l = color.length - 1
    forEach(categories, (category, i) => {
        let forms = []
        forEach(category.forms, (form, j) => {
						var icon = form.icon ? form.icon : 'icon-1',
								descripsion = form.descripsion ? form.descripsion : form.name;
            forms.push(
                <li onClick={this.doubleClickHandle(form.id).bind(this)} className={form.id == curForm ? "item active" : "item"} key={i+','+j}>
                    <a href="#" title={form.name}>
												<div className="content">
													<div className="title"><span>{form.name}</span></div>
													<div className="pic"><span className={`fillin-avatar avatar-${icon}`}></span></div>
                        	<div className="txt"><span>{descripsion}</span></div>
												</div>
                    </a>
                </li>
            )
        })
// <<<<<<< HEAD
//         formLists.push((
//             <div className="categories-list">
//                 <h2 className="category">{category.name}<span className="category-count">({forms.length})</span></h2>
//                 <ul className="forms-list clearfix">{forms}</ul>
//             </div>
//         ))
//     })
//
//     return (
//         <Dialog show={isOpen} onHide={hide} onPrimary={primary} dialogClassName="form-list-dialog" title="表单列表">
// 			<CSSTransitionGroup className="form-list-tip-wrap" component="div" transitionName="form-list-tip" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
// 			{tip ? <div className="alert alert-warning form-list-tip">{tip}</div> : undefined}
// 			</CSSTransitionGroup>
//             <Loading errorMsg={_errorMsg} status={_status} isFetching={isFetching}>
//                 {formLists}
//             </Loading>
// =======
				if(forms.length > 0){
					formLists.push((
	            <div className="categories-list" key={i}>
	                <h2 className="category">{category.name}<span className="category-count">({forms.length})</span></h2>
	                <ul className="forms-list clearfix">{forms}</ul>
	            </div>
	        ));
				}

    })

    return (
        <Dialog show={isOpen} onHide={hide} onPrimary={primary} noFooter={true} dialogClassName="form-list-dialog" title="选择表单">
					<CSSTransitionGroup className="form-list-tip-wrap" component="div" transitionName="form-list-tip" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
					{tip ? <div className="alert alert-warning form-list-tip">{tip}</div> : undefined}
					</CSSTransitionGroup>
          <Loading errorMsg={_errorMsg} status={_status} isFetching={isFetching}>
              {formLists}
          </Loading>
{/*>>>>>>> 1b5017fac4d6307635c56f157d7b4b542ad35978*/}
        </Dialog>
    )
  }

	doubleClickHandle(id){
		return (e) => {
			this.props.checkForm(id);
			this.props.primary();
		}
	}

  toggleCategory (id) {
      return (e) => {
          e.preventDefault()
          this.props.toggleCategory(id)
      }
  }
  checkForm (id) {
      return (e) => {
          e.preventDefault();
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
