import React, { Component, PropTypes } from 'react'
import { Modal, Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import { onStartTimeChange, onEndTimeChange } from "../../actions/dateperiod"

import ReactDatepicker from 'react-datepicker'
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class Datepicker extends Component{
	render(){
		const {show, itemIndex, startTime, endTime, onStartTimeChange, onEndTimeChange, onCancel, onConfirm} = this.props;
		return (
				<Modal show={show}>
					<div className="date-picker-modal">
						<ReactDatepicker placeholderText="请选择起始时间" dateFormat="YYYY-MM-DD" selected={startTime} onChange={onStartTimeChange.bind(this)}/>--
						<ReactDatepicker placeholderText="请选择结束时间" dateFormat="YYYY-MM-DD" selected={endTime} onChange={ onEndTimeChange.bind(this) }/>
					</div>
					<Modal.Footer onClick={()=>{}}>
						<Button onClick={onCancel}>取消</Button>
						<Button bsStyle="primary" onClick={onConfirm}>确定</Button>
					</Modal.Footer>
				</Modal>
			);
	}
}
function mapStateToProps(state) {
	return {
		startTime:state.dateperiodPicker.startTime,
		endTime:state.dateperiodPicker.endTime
	}
}
export default connect(mapStateToProps,{
	onStartTimeChange,
	onEndTimeChange
})(Datepicker);
