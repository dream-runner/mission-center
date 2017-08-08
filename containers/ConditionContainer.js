import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
// 下拉菜单
import DropdownContainer from './DropdownContainer'
// 排序筛选
import SortRuleContainer from './SortRuleContainer'
// 搜索
import SearchContainer from './SearchContainer'
//弹框
// import { Modal } from 'react-bootstrap'
// //树
// import 'rc-tree-select/assets/index.css';
// import TreeSelect, { TreeNode, SHOW_PARENT } from 'rc-tree-select';
// import Loading from '../components/Loading';
// import { toggleDropdown, hideMenu, setDropdownChecked } from '../actions/dropdown';
//
// import { getList } from '../actions/list';





class ConditionContainer extends Component {
	render() {
		const { components,getList } = this.props;

		// const modalStyle = {
		// 	position: 'fixed',
		// 	zIndex: 1040,
		// 	top: 0, bottom: 0, left: 0, right: 0
		// };
        //
		// const backdropStyle = {
		// 		...modalStyle,
		// 	zIndex: 'auto',
		// 	backgroundColor: '#000',
		// 	opacity: 0.5
		// };
        //
		// const dialogStyle = function() {
		// 	let top = 50;
		// 	let left = 50;
        //
		// 	return {
		// 		position: 'absolute',
		// 		width: 600,
		// 		top: top + '%', left: left + '%',
		// 		transform: `translate(-${top}%, -${left}%)`,
		// 		border: '1px solid #e5e5e5',
		// 		backgroundColor: 'white',
		// 		boxShadow: '0 5px 15px rgba(0,0,0,.5)',
		// 		borderRadius:'4px',
		// 		paddingBottom:'20px',
		// 		paddingTop:'20px'
		// 	};
		// };

	  return (
				<div className="nav nav-tabs filter-wrap">

					<ul className="dropdown-wrap">
						{components.map((item, index)=>{
							if(item == 'filter-sort-condition'){
								return <SortRuleContainer key={index} name={item} />
							} else {
								return <DropdownContainer key={index} name={item} showFormPicker={()=>this.showFormPicker.apply(this)}/>
							}
						})}
					</ul>
					<SearchContainer />


					{/*<Modal*/}
					{/*aria-labelledby='modal-label'*/}
					{/*style={modalStyle}*/}
					{/*backdropStyle={backdropStyle}*/}
					{/*show={this.state.showFormPicker}*/}
					{/*onHide={this.close}*/}
					{/*onShow={this.onopen}*/}
					{/*className="form-pic-modal"*/}
					{/*>*/}
						{/*<div style={dialogStyle()} >*/}
								{/*<h4 id='modal-label'>选择类型</h4>*/}
								{/*<div className="modal-bd">*/}
										{/*<Loading className="form-iframe-wrap" isFetching={this.state.isFetching}>*/}
										{/*</Loading>*/}
										{/*<TreeSelect*/}
											{/*className="check-select"*/}
											{/*dropdownStyle={{ height: 200, overflow: 'auto',width:'100%' }}*/}
											{/*dropdownPopupAlign={{ overflow: { adjustY: 0, adjustX: 0 }, offset: [0, 2] }}*/}
											{/*onDropdownVisibleChange={this.onDropdownVisibleChange}*/}
											{/*placeholder={<i>请下拉选择</i>}*/}
											{/*searchPlaceholder="please search"*/}
											{/*treeLine maxTagTextLength={10}*/}
											{/*value={this.state.value}*/}
											{/*inputValue={null}*/}
											{/*treeData={this.state.gData}*/}
											{/*notFoundContent=""*/}
											{/*treeNodeFilterProp="title"*/}
											{/*treeCheckable showCheckedStrategy={SHOW_PARENT}*/}
											{/*onChange={this.onChange}*/}
											{/*onSelect={this.onSelect}*/}
										{/*/>*/}
								{/*</div>*/}
								{/*<button className="btn btn-primary" onClick={()=>{this.confirmPick.apply(this)}}>确定</button>*/}
								{/*<button className="btn btn-default" onClick={()=>{this.closeFormPicker.apply(this)}}>取消</button>*/}
						{/*</div>*/}
					{/*</Modal>*/}

				</div>
	  )
  }
	// constructor(props){
	// 	super(props);
	// 	this.state = { showFormPicker: false,
	// 		tsOpen: true,
	// 		visible: true,
	// 		multipleValue: [],
	// 		isFetching:false,
	// 		gData : []
	// 	};
	// }
	// onopen(){
	// 	document.querySelector('.rc-tree-select-search__field__placeholder').click();
	// }
  // showFormPicker=()=>{
	// 	let gData = [];
	// 	this.setState({isFetching:true});
	// 	fetch(
	// 		`${window.$ctx}/iform_ctr/iform_design_ctr/queryFormList`,
	// 		{method:'post'}
	// 	).then((response)=>{
	// 		response.text().then(text => {
	// 			gData = JSON.parse(text)['formCategories'];
	// 			gData = gData.map(function (val) {
	// 				val.label = val.name;
	// 				val.key = val.id;
	// 				val.value = val.id;
	// 				if(!!val.forms )val.children = val.forms.map(function (valIner) {
	// 					valIner.label = valIner.name;
	// 					valIner.key = valIner.id;
	// 					valIner.value = valIner.id;
	// 					return valIner;
	// 				})
	// 				return val;
	// 			})
	// 			this.setState({isFetching:false,gData:gData});
	// 		})
	// 	})
	// 	this.setState({showFormPicker:true});
	// }
	// confirmPick(){
	// 	const { getList} = this.props
	// 	setDropdownChecked('filterCategoryIds','asdfs')
	// 	getList()
	// 	this.closeFormPicker();
  //
	// }
	// closeFormPicker(){
	// 	this.setState({showFormPicker:false});
	// }
	// isLeaf(value) {
	// 	if (!value) {
	// 		return false;
	// 	}
	// 	let queues = [...this.state.gData];
	// 	while (queues.length) { // BFS
	// 		const item = queues.shift();
	// 		if (item.value === value) {
	// 			if (!item.children) {
	// 				return true;
	// 			}
	// 			return false;
	// 		}
	// 		if (item.children) {
	// 			queues = queues.concat(item.children);
	// 		}
	// 	}
	// 	return false;
	// }
	// onClick = () => {
	// 	this.setState({
	// 		visible: true,
	// 	});
	// }
  //
	// onClose = () => {
	// 	this.setState({
	// 		visible: false,
	// 	});
	// }
  //
  //
	// onChange = (value) => {
	// 	console.log('onChange', arguments);
	// 	this.setState({ value });
	// }
  //
	// onChangeChildren = (value) => {
	// 	console.log('onChangeChildren', arguments);
	// 	const pre = value ? this.state.value : undefined;
	// 	this.setState({ value: isLeaf(value) ? value : pre });
	// }
  //
  //
	// onMultipleChange = (value) => {
	// 	console.log('onMultipleChange', arguments);
	// 	this.setState({ multipleValue: value });
	// }
  //
	// onSelect = () => {
	// 	console.log(arguments);
	// }
  //
	// onDropdownVisibleChange = (visible, info) => {
	// 	console.log(visible, this.state.value, info);
	// 	if (Array.isArray(this.state.value) && this.state.value.length > 1
	// 		&& this.state.value.length < 3) {
	// 		alert('please select more than two item or less than one item.');
	// 		return false;
	// 	}
	// 	return true;
	// }
  //
	// filterTreeNode = (input, child) => {
	// 	return String(child.props.title).indexOf(input) === 0;
	// }
}


export default ConditionContainer
// export default connect(null,{getList,setDropdownChecked})(ConditionContainer);
