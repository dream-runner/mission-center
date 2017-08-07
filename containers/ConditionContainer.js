import React, { Component, PropTypes } from 'react'
// 下拉菜单
import DropdownContainer from './DropdownContainer'
// 排序筛选
import SortRuleContainer from './SortRuleContainer'
// 搜索
import SearchContainer from './SearchContainer'
import { Modal } from 'react-bootstrap'

class ConditionContainer extends Component {
	render() {
		const { components } = this.props;
		let rand = ()=> (Math.floor(Math.random() * 20) - 10);

		const modalStyle = {
			position: 'fixed',
			zIndex: 1040,
			top: 0, bottom: 0, left: 0, right: 0
		};

		const backdropStyle = {
				...modalStyle,
			zIndex: 'auto',
			backgroundColor: '#000',
			opacity: 0.5
	};

		const dialogStyle = function() {
			let top = 50 + rand();
			let left = 50 + rand();

			return {
				position: 'absolute',
				width: 400,
				top: top + '%', left: left + '%',
				transform: `translate(-${top}%, -${left}%)`,
				border: '1px solid #e5e5e5',
				backgroundColor: 'white',
				boxShadow: '0 5px 15px rgba(0,0,0,.5)',
				padding: 20
			};
		};
	  return (
				<div className="nav nav-tabs filter-wrap">
					<ul className="dropdown-wrap">
						{components.map(function(item, index){
							if(item == 'filter-sort-condition'){
								return <SortRuleContainer key={index} name={item} />
							} else {
								return <DropdownContainer key={index} name={item} />
							}
						})}
					</ul>
					<SearchContainer />

					<Modal
					aria-labelledby='modal-label'
					style={modalStyle}
					backdropStyle={backdropStyle}
					show={true}
					onHide={this.close}
				>
				<div style={dialogStyle()} >
						<h4 id='modal-label'>Text in a modal</h4>
					<p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
					</div>
					</Modal>

				</div>
	  )
  }
}

export default ConditionContainer
