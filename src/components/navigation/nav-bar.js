import React, {Component} from "react"

import logo from "../../../static/assets/images/logo.png"

class NavBar extends Component {
   render () {
    return (
        <div className="nav-container">
            <img className="nav-bar-logo" src={logo} />
        </div>
    )
   }
}

export default NavBar