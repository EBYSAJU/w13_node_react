import React from "react"
class Nav extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        return(
            <nav>
                <ul></ul>
                <li key="0">Home</li>
                <li key="1">Profile</li>
                <li key="2">Products</li>
                <li key="3">{this.props.name}{this.props.age}</li>
            </nav>
        )

    }
}
export default Nav