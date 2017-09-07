import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Tab from '../components/Tab';
import {toggleDropdown, hideMenu, setDropdownChecked, isFormFilerOn} from '../actions/dropdown';
// 切换下拉列表显示隐藏
import {setFormFilters} from '../actions/formFilters';
import {getList} from '../actions/list';
import {changeText,changeUnsearchText} from '../actions/search'
//弹框
import {Modal} from 'react-bootstrap'
//树
import Tree, {TreeNode} from 'rc-tree';
import Loading from '../components/Loading';
class DropdownContainer extends Component {
	componentWillUpdate() {
		const {setFormFilters,changeText,changeUnsearchText} = this.props;
		if (window.prev !== window.flag && window.prev !== null) {
			window.prev = null;
			setFormFilters({
				formNames: "",
				categoryId: ""
			});
			changeText("");
			changeUnsearchText("");// 用于辅助清除没有搜索的搜索框中的内容
			window.searchChanged = true;
			window.initTreeState = true;
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
			namesMap: {},    // 所有数据名字的集合对象,
			indexs: new Set()       // 用于记录被点的二级树所在的父节点所在的索引
		};
	}

// 判断是否加载过，有就展示，没有打开之后加载数据
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
		});
		// 如果我们没有选中任何选项，取消高亮，关闭
		// 如果formFilter里面的categoryId为空字符串，就不会亮，所以在有formsname的情况下，给category一个默认值，在获取数据时，把tempt去掉即可
		const str = !formsName.length ? "" : "tempt";
		setFormFilters({
			formNames: formsName.join(','),
			categoryId: !formsName.length && !this.state.checkedCategoryId ? "" : this.state.checkedCategoryId.replace('_par__', '') || str
		});
		// setDropdownChecked(name); 多此一举
		// 获取数据
		getList();
		this.closeFormPicker();
	}

	onShow = () => {
		this.setState({
			selectedCategoryId: '',
			checkedKeys: window.initTreeState ? [] : this.state.checkedKeys,
			checkedFormsId: window.initTreeState ? [] : this.state.checkedFormsId,
			checkedCategoryId: window.initTreeState ? "" : this.state.checkedCategoryId,
			indexs: window.initTreeState ? new Set() : this.state.indexs,
		})
		// 用于打开一级菜单，如果切换nav ，不用打开了
		if (!window.initTreeState) {
			if (!this.state.indexs.size)return;
			for (let k of this.state.indexs) {
				if (isNaN(k)) return;
				setTimeout(() => {
					this.refs[`selfDefine${k}`].refs.selectHandle.previousElementSibling.previousElementSibling.click();
				}, 0)
			}
		}
		window.initTreeState = false;

	}

	closeFormPicker() {
		this.setState({showFormPicker: false});
	}

	onChange = () => {
		alert(123);
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
		// 在点击结构上去的时候调用,展开结构
		let node = e.node.refs.selectHandle;
		node.parentNode.firstElementChild.click();
		// console.log('selected', info);
	}
	onCheck = (checkedKeys, e) => {
		//　选框被选中的时候调用
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
		if (checkedKeys.length != 0 && checkedFormsId.length != 0) {
			// alert('should add')
			if (e.checked) {
				// 添加一个进去
				let tempt = this.state.indexs;
				let node = e.node.refs.selectHandle;
				let index = parseInt(node.parentNode.parentNode.parentNode.className.slice(4));
				if (isNaN(index)) return;
				tempt.add(index);
				this.setState({
					indexs: tempt
				});
			} else {
				//　删除之前添加的
				let tempt = this.state.indexs;
				let node = e.node.refs.selectHandle;
				let index = parseInt(node.parentNode.parentNode.parentNode.className.slice(4));
				if (isNaN(index)) return;
				tempt.delete(index);
				this.setState({
					indexs: tempt
				});
			}
		} else {
			this.setState({
				indexs: new Set()
			});
		}
	}

	render() {
		const loop = (data) => {
			return data.map((item, index) => {
				if (item.children) {
					return <TreeNode title={item.name} className={`open${index}`} ref={`selfDefine${index}`}
													 key={item.key}>{loop(item.children)}</TreeNode>;
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
			</li>
		) : (<li className={ wrapClassName }>
			<a className="dropdown-toggle" href="#" onClick={(e) => {
				e.preventDefault()
				e.stopPropagation()
				toggleDropdown(name)
			}}>{ options[cur].text } <span className='caret'></span></a>
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
	setFormFilters,
	changeText,
	changeUnsearchText
})(DropdownContainer);
