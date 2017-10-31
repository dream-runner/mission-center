import React, { Component, PropTypes } from 'react'
import { Modal, Button} from 'react-bootstrap'

import ReactDatepicker from 'react-datepicker'
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class Datepicker extends Component{
	constructor(props){
		super(props);
		this.state={
			startTime:moment(new Date('2017-05-10'))
		}
	}
	render(){
		const {show, startTime, endTime, onStartTimeChange, onEndTimeChange} = this.props;
		return (
				<Modal show={show}>
					<div className="date-picker-modal">
						<ReactDatepicker placeholderText="请选择起始时间" dateFormat="YYYY-MM-DD" selected={this.state.startTime} onChange={onStartTimeChange.bind(this)}/>  --
						<ReactDatepicker placeholderText="请选择结束时间" onChange={ onEndTimeChange.bind(this) }/>
					</div>
					<Modal.Footer onClick={()=>{}}>
						<Button>取消</Button>
						<Button bsStyle="primary">确定</Button>
					</Modal.Footer>
				</Modal>
			);
	}
}
export default Datepicker;
