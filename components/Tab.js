import React, { Component, PropTypes } from 'react'
import {modal} from 'react-bootstrap'
import Datepicker from './modals/Datepicker'

export default class Tab extends Component {
  render() {
    const { name,items, onTabClicked ,cur, children, className } = this.props
    return (
      <ul className={className}>
        {items.map(({ needTotal, text, total, key, unReadCount }, i) => {
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
								if('filterTaskDate'===name && i===items.length-1){
										alert();
								}
								onTabClicked(e, i)
							}
							}>{text}</a>
							<Datepicker/>
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
