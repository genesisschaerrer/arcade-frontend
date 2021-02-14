import React, {Component} from "react"
import {NavLink} from "react-router-dom"

import logo from "../../../static/assets/images/logo.png"

const NavBar = () => {
    return (
        <div className="nav-container">
            <NavLink exact to="/"><img className="nav-bar-logo" src={logo} /></NavLink>
            <NavLink to="/login">Login</NavLink>
        </div>
    )
}

export default NavBar