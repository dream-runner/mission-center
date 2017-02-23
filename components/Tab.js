import React, { Component, PropTypes } from 'react'

export default class Tab extends Component {
  render() {
    const { items, onTabClicked ,cur, children, className } = this.props

    return (
      <ul className={className}>
        {items.map(({ needTotal, text, total }, i) => {
          text = needTotal && total ? `${text}(${total})` : text
          let className = cur == i ? 'active' : ''
          return (<li key={i} className={className}><a href="#" onClick={(e)=>{ onTabClicked(e, i) }}>{text}</a></li>)
        })}
        { children }
      </ul>
    )
  }
}

Tab.propTypes = {
  items: PropTypes.array,
  cur: PropTypes.number,
  className: PropTypes.string,
  onTabClicked: PropTypes.func,
  children: PropTypes.node
}
