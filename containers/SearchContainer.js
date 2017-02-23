import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { changeText } from '../actions/search'
import { search } from '../actions/page'


class SearchContainer extends Component {
    render() {
        const {          
            changeText,
            search,
            searchText
        } = this.props
        return (
                    <div className="nav nav-tabs filter-wrap ">
                     <div className="search-bar">
                        <input type="text" name="sText" className="search-text" onChange={this.handleChange.bind(this)} />
                        <button type="button" className="search-btn" onClick = {this.onSearchClicked.bind(this)}>
                            <i className="iconfont icon-sousuo"></i> 搜索
                        </button >
                     </div> 
                    </div>
        )
    }

    onSearchClicked(e) {
        const {searchText, search} = this.props
        search(searchText);
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
    {changeText,search}
)(SearchContainer)


