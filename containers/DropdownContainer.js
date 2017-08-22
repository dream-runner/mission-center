import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Tab from '../components/Tab';
import {toggleDropdown, hideMenu, setDropdownChecked, isFormFilerOn} from '../actions/dropdown';
// 切换下拉列表显示隐藏
import {setFormFilters} from '../actions/formFilters';
import {getList} from '../actions/list';
//弹框
import {Modal} from 'react-bootstrap'
//树
import Tree, {TreeNode} from 'rc-tree';
import Loading from '../components/Loading';
class DropdownContainer extends Component {
	componentWillUpdate() {
		console.log(this.state);
		const {setFormFilters} = this.props;
		if (window.prev !== window.flag && window.flag && (window.prev || window.prev == 0)) {
			window.prev = null;
			setFormFilters({
				formNames: "",
				categoryId: ""
			});
			this.setState({
				checkedKeys: [],
				checkedCategoryId: '',
				checkedFormsId: [],
			});
		}

	}

	constructor(props) {
		super(props);
		this.state = {
			showFormPicker: false,
			multipleValue: [],
			isFetching: false,
			gData: [],
			treeData: [],
			checkedKeys: [],
			checkedCategoryId: '',
			checkedFormsId: [],
			namesMap: {}
		};
	}

	showFormPicker = () => {
		if (this.state.formsLoaded) {
			this.setState({showFormPicker: true});
			return;
		}
		let gData = [];
		this.setState({isFetching: true});
		fetch(
			`${window.$ctx}/iform_ctr/iform_design_ctr/queryFormList`,
			{
				method: 'post',
				credentials: 'include',
				cache: 'no-cache'
			}
		).then((response) => {
			response.text().then(text => {
				this.setState({formsLoaded: true});
				let namesMap = {}
				gData = JSON.parse(text)['formCategories'];
				gData = gData.map(function (val) {
					val.label = val.name;
					val.key = (val.id || 'other') + '_par__';
					val.value = val.id;
					if (!!val.forms) val.children = val.forms.map(function (valIner) {
						valIner.label = valIner.name;
						valIner.key = valIner.id + '_chl__';
						valIner.value = valIner.id;
						namesMap[valIner.id] = valIner.name;
						return valIner;
					})
					return val;
				})
				this.setState({isFetching: false, treeData: gData, checkedKeys: [], namesMap});
			})
		})
		this.setState({showFormPicker: true});
	}

	confirmPick(name) {
		const {getList, setFormFilters, formFilters} = this.props;
		let formsName = [];
		this.state.checkedFormsId.forEach((val) => {
			formsName.push(this.state.namesMap[val])
		})
		setFormFilters({formNames: formsName.join(','), categoryId: this.state.checkedCategoryId.replace('_par__', '')});
		setDropdownChecked(name);   // 选中
		// 获取数据
		getList('formFilters');
		this.closeFormPicker();
		console.log(this.state);
	}

	onShow = () => {
		this.setState({
			selectedCategoryId: ''
		})
	}

	closeFormPicker() {
		this.setState({showFormPicker: false});
	}

	generateTreeNodes = (treeNode) => {
		const arr = [];
		const key = treeNode.props.eventKey;
		for (let i = 0; i < 3; i++) {
			arr.push({name: `leaf ${key}-${i}`, key: `${key}-${i}`});
		}
		return arr;
	}

	setLeaf = (treeData, curKey, level) => {
		const loopLeaf = (data, lev) => {
			const l = lev - 1;
			data.forEach((item) => {
				if ((item.key.length > curKey.length) ? item.key.indexOf(curKey) !== 0 :
						curKey.indexOf(item.key) !== 0) {
					return;
				}
				if (item.children) {
					loopLeaf(item.children, l);
				} else if (l < 1) {
					item.isLeaf = true;
				}
			});
		};
		loopLeaf(treeData, level + 1);
	}

	getNewTreeData = (treeData, curKey, child, level) => {
		const loop = (data) => {
			if (level < 1 || curKey.length - 3 > level * 2) return;
			data.forEach((item) => {
				if (curKey.indexOf(item.key) === 0) {
					if (item.children) {
						loop(item.children);
					} else {
						item.children = child;
					}
				}
			});
		};
		loop(treeData);
		this.setLeaf(treeData, curKey, level);
	}

	onSelect = (info, e) => {
		console.log('selected', info);
	}
	onCheck = (checkedKeys, e) => {
		const {setFormFilters} = this.props
		let curKey = e.node.props.eventKey;
		let isParent = curKey.indexOf('_par__') > -1;
		let checkedFormsId = [];
		//父节点只允许单选
		if (isParent) {
			if (e.checked) {
				checkedKeys = [curKey]
				this.setState({checkedCategoryId: curKey})
			} else {
				this.setState({checkedCategoryId: ''})
			}
		} else {
			if (this.state.checkedCategoryId) {
				checkedKeys.splice(checkedKeys.indexOf(this.state.checkedCategoryId), 1);
				this.setState({checkedCategoryId: ''})
			}
		}
		checkedKeys.forEach((val, index) => {
			if (val.indexOf('_chl__') > -1) {
				checkedFormsId.push(val.replace('_chl__', ''))
			}
		})
		if (0 === checkedKeys.length && !this.state.checkedCategoryId) setFormFilters({formNames: '', categoryId: ''})
		this.setState({
			checkedKeys,
			checkedFormsId
		});
	}

	render() {
		const loop = (data) => {
			return data.map((item) => {
				if (item.children) {
					return <TreeNode title={item.name} key={item.key}>{loop(item.children)}</TreeNode>;
				}
				return (
					<TreeNode title={item.name} key={item.key} isLeaf={item.isLeaf}
										disabled={item.key === '0-0-0'}
					/>
				);
			});
		};
		const treeNodes = loop(this.state.treeData);
		const modalStyle = {
			position: 'fixed',
			zIndex: 1040,
			top: 0, bottom: 0, left: 0, right: 0
		};

		const backdropStyle = {
			...modalStyle,
			zIndex: '1000',
			backgroundColor: '#000',
			opacity: 0.5
		};

		const dialogStyle = function () {
			let top = 50;
			let left = 50;

			return {
				position: 'absolute',
				width: 600,
				top: top + '%', left: left + '%',
				transform: `translate(-${top}%, -${left}%)`,
				border: '1px solid #e5e5e5',
				backgroundColor: 'white',
				boxShadow: '0 5px 15px rgba(0,0,0,.5)',
				borderRadius: '4px',
				paddingBottom: '20px',
				paddingTop: '20px'
			};
		};


		const {isFetching, getList, name, dropdown, toggleDropdown, isFormFilerOn} = this.props;
		const {isOpen, cur, options} = dropdown[name];
		let wrapClassName = isOpen ? "dropdown open" : "dropdown";
		wrapClassName += ('filterCategoryIds' === name && isFormFilerOn() ? ' active' : '');
		return 'filterCategoryIds' === name ? (
			<li className={ wrapClassName }>
				<a className="dropdown-toggle" href="#" onClick={(e) => {
					e.preventDefault()
					e.stopPropagation()
					this.showFormPicker();
					toggleDropdown(name)
				}}>{ options[cur].text } < span className={'filterCategoryIds' === name ? '' : 'caret'}></span></a>
				<Modal
					aria-labelledby='modal-label'
					style={modalStyle}
					backdropStyle={backdropStyle}
					show={this.state.showFormPicker}
					onHide={this.close}
					onShow={this.onShow}
					className="form-pic-modal"
				>
					<div style={dialogStyle()}>
						<h4 id='modal-label'>选择类型</h4>
						<div className="modal-bd">
							<Loading className="form-iframe-wrap" isFetching={this.state.isFetching}>
							</Loading>
							<Tree
								onSelect={this.onSelect}
								onChange={this.onChange}
								checkable onCheck={this.onCheck} checkedKeys={this.state.checkedKeys}
								checkStrictly={true}
							>
								{treeNodes}
							</Tree>
						</div>
						<button className="btn btn-primary" onClick={() => {
							this.confirmPick.apply(this, [name])
						}}>确定
						</button>
						<button className="btn btn-default" onClick={() => {
							this.closeFormPicker.apply(this);
						}}>取消
						</button>
					</div>
				</Modal>
				{/*<Tab items={ options }*/}
				{/*cur={ cur }*/}
				{/*className="dropdown-menu sort-rule-wrap"*/}
				{/*name={name}*/}
				{/*onTabClicked={ this.onTabClicked.bind(this) }></Tab>*/}
			</li>
		) : (<li className={ wrapClassName }>
			<a className="dropdown-toggle" href="#" onClick={(e) => {
				e.preventDefault()
				e.stopPropagation()
				// if ('filterCategoryIds' === name) {
				// 	showFormPicker();
				// }
				// ;
				toggleDropdown(name)
			}}>{ options[cur].text } < span className={'filterCategoryIds' === name ? '' : 'caret'}></span></a>
			<Tab items={ options }
					 cur={ cur }
					 className={"dropdown-menu sort-rule-wrap"}
					 name={name}
					 onTabClicked={ this.onTabClicked.bind(this) }></Tab>
		</li>)

	}

	onTabClicked(e, checked) {
		const {cur, isFetching, setDropdownChecked, toggleDropdown, getList, name} = this.props
		e.preventDefault();
		e.stopPropagation();
		if (!isFetching && checked != cur) {
			setDropdownChecked(name, checked);
			hideMenu();
			getList();
		}
	}
}


function mapStateToProps(state) {
	const {isFetching} = state.list;
	return {
		isFetching,
		dropdown: state.dropdown,
		formFilters: state.formFilters
	};
}


export default connect(mapStateToProps, {
	toggleDropdown,
	hideMenu,
	setDropdownChecked,
	getList,
	isFormFilerOn,
	setFormFilters
})(DropdownContainer);
