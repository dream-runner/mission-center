import React, { Component, PropTypes } from 'react'
import { Modal } from 'react-bootstrap'

import ReactDatepicker from 'react-datepicker'
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class Datepicker extends Component{
	render(){
		const show = true;
		return (
				<Modal show={show} className="">
					<div className="date-picker">
						<ReactDatepicker placeholderText="请选择起始时间"/>--
						<ReactDatepicker placeholderText="请选择结束时间"/>
					</div>
				</Modal>
			);
	}
}
export default Datepicker;
