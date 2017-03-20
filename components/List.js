import React, {
    Component,
    PropTypes
} from 'react'

export default class List extends Component {
    render() {
        // const { key, children } = this.props
        // let node = React.Children.map(children, (child, i) => {
				// 		console.log(child.props.children,'xxxaa');
        //     let [infos, btns] = child.props.children
        //     return (
        //         <div className="item">
				// 						<div className="box">
	      //               <div className={ infos.props.className }>
	      //                   { infos.props.children }
	      //               </div>
	      //               <div className={ btns.props.className }>
	      //                   { btns.props.children }
	      //               </div>
				// 						</div>
        //         </div>
        //     )
        // })
        return (
            <div className="table-list">
            	{ this.props.children }
            </div>
        )
    }
}

List.propTypes = {
    children: PropTypes.node
}
