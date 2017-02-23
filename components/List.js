import React, {
    Component,
    PropTypes
} from 'react'

export default class List extends Component {
    render() {
        const { key, children } = this.props
        let node = React.Children.map(children, (child, i) => {
            let [infos, btns] = child.props.children
            return (
                <tr>
                    <td className={ infos.props.className }>
                        { infos.props.children }
                    </td>
                    <td className={ btns.props.className }>
                        { btns.props.children }
                    </td>
                </tr>
            )
        })
        return (
            <table className="table">
                <tbody>
                    { node }
                </tbody>
            </table>
        )
    }
}

List.propTypes = {
    children: PropTypes.node
}
