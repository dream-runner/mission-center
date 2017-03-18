import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { changeText } from '../actions/search'
import { search } from '../actions/page'
import {getList } from '../actions/list'

class SearchContainer extends Component {
    render() {
        const { changeText, search, searchText } = this.props
        return (
	         <div className="search-bar">
						 	<form action="#" method="get" onSubmit={this.onSearchClicked.bind(this)}>
	            	<input type="text" name="sText" ref="sText" className="search-text" placeholder="搜索" />
								<span className="btn-search"><i className="iconfont icon-sousuo"></i></span>
							</form>
	         </div>
        )
    }

    onSearchClicked(e) {
				e.preventDefault();
				let searchText = this.refs.sText.value;
				let { getList } = this.props;
        getList('search', searchText);
     }

    handleChange(){
         let {changeText} = this.props
         let text = arguments[0].target.value?arguments[0].target.value:''
         changeText(text)
    }

}


SearchContainer.propTypes = {
    changeText: PropTypes.func.isRequired,
    search: PropTypes.func.isRequired,
    searchText:PropTypes.string.isRequired
}


const mapStateToProps = (state) => {
    let {
        searchText
    } = state.search
    return {
        searchText
    }
}

export default connect(
    mapStateToProps,
    {changeText,search, getList}
)(SearchContainer)
