import React from "react"
class Header extends React.Component {

render() {
    return(
        <header>{this.props.companyName}</header>
    )

}
}
export default Header