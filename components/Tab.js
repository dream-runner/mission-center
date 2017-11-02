import React, { Component, PropTypes } from 'react'
import Datepicker from './modals/Datepicker'
import {connect} from 'react-redux';
import {toggleDateperiodPicker} from '../actions/dateperiod';


export  class Tab extends Component {
  render() {
    const { name,items, btnIndex, navName, onTabClicked ,cur, children, className, startTime, endTime, showDateperiodPicker, toggleDateperiodPicker, curSelectedDateperiod} = this.props;
    return (
      <ul className={className}>
        {items.map(({ needTotal, text, total, key, unReadCount }, i) => {
        	let k = ((val)=>{return val})(i)
					if(key == 'listcopy'){
						text = needTotal && unReadCount ? `${text}(${unReadCount})` : text
					} else {
						text = needTotal && total ? `${text}(${total})` : text
					}
          let className = cur == i ? 'active' : ''
          return (
          	<li key={i} className={className}>
							<a href="#" onClick={(e)=>{
								//按自定义时间区间筛选时，弹出日期选择框
								if(['filterTaskDate','filterReceivingDate','filterCompletionDate'].indexOf(name)>-1 && i===items.length-1){
									toggleDateperiodPicker(1,{navName:name,btnIndex:i})
									return false;
								}
								onTabClicked(e, {btnIndex:i})
							}
							}>{text}</a>
							<Datepicker show={showDateperiodPicker} onCancel={()=>{toggleDateperiodPicker(0)}} onConfirm={(e)=>{
								onTabClicked(e,{btnIndex,navName},{startTime,endTime});
								toggleDateperiodPicker(0)
							}}/>
						</li>
					)
        })}
        { children }
      </ul>
    )
  }
}

Tab.propTypes = {
  items: PropTypes.array,   // 待审批　抄送等　对象数组 ||  dropdown 对应筛选的options数据
  cur: PropTypes.number,　　　//  当前是那一个被选中
  className: PropTypes.string,　//　类名 bootstrap的
  onTabClicked: PropTypes.func,  // 点击触发的事件
  children: PropTypes.node  // 子元素
}



function mapStateToProps(state) {
	return {
		showDateperiodPicker:state.dateperiodPicker.showDateperiodPicker,
		startTime:state.dateperiodPicker.startTime,
		endTime:state.dateperiodPicker.endTime,
		btnIndex:state.dateperiodPicker.btnIndex,
		navName:state.dateperiodPicker.navName
	};
}

export default connect(mapStateToProps, {
	toggleDateperiodPicker
})(Tab);
