import React, {Component} from "react"

class Login extends Component {
    constructor(){
        super()
        this.state = {
            username: "",
            password: "",
        }
    }


    componentDidMount

    render(){
        return(
            <div className="login-container">
                <input
                    type="text"
                    placeholder="username"
                    value={this.state.username}
                />
                <input
                    type="password"
                    placeholder="password"
                    value={this.state.password}
                />

                <button className="submit-btn" type="submit">Login</button>
            </div>
        )
    }
}

export default Login