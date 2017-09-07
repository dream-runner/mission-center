import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {changeText,changeUnsearchText} from '../actions/search'
import {search} from '../actions/page'
import {getList} from '../actions/list'

class SearchContainer extends Component {
	componentWillReceiveProps () {
		if (window.searchChanged) {
			window.searchChanged = false;
			this.refs.sText.value = "";
		}
	}
	render() {
		const {changeText, search, searchText,unsearchText} = this.props;
		return (
			<div className="search-bar">
				<form action="#" method="get" onSubmit={this.onSearchClicked.bind(this)}>
					<input type="text" name="sText" ref="sText" onKeyUp={this.onKeyUp.bind(this)} className="search-text" placeholder="搜索"/>
					<span className="btn-search"><i className="iconfont icon-sousuo"></i></span>
				</form>
			</div>
		)
	}
	onKeyUp (e) {
		let {changeUnsearchText} = this.props;
		changeUnsearchText(e.target.value);
	}

	onSearchClicked(e) {
		e.preventDefault();
		let searchText = this.refs.sText.value.trim();
		let {getList, changeText} = this.props;
		changeText(searchText);
		getList('search', searchText);
	}
}


SearchContainer.propTypes = {
	changeText: PropTypes.func.isRequired,
	search: PropTypes.func.isRequired,
	searchText: PropTypes.string.isRequired
}


const mapStateToProps = (state) => {
	let {
		searchText,
		unsearchText
	} = state.search
	return {
		searchText,
		unsearchText
	}
}

export default connect(
	mapStateToProps,
	{changeText, search, getList, changeUnsearchText}
)(SearchContainer)
