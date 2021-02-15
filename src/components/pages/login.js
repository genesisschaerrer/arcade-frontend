import React, {Component} from "react"
import axios from "axios"

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: "",
            password: "",
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        axios.post("http://localhost:4000/login", {username: this.state.username, password: this.state.password})
            .then(res =>  this.props.history.push("/admindashboard"))
            .catch(err => console.log("loging error: ", err))
    }


    render(){
        return(
            <div className="login-container">
                <form className="form-container" onSubmit={this.handleSubmit}>
                <input
                    className="login-input"
                    type="text"
                    name="username"
                    placeholder="username"
                    onChange={this.handleChange}
                    value={this.state.username}
                />
                <input
                    className="login-input"
                    type="password"
                    name="password"
                    placeholder="password"
                    onChange={this.handleChange}
                    value={this.state.password}
                />

                <button className="submit-btn" type="submit" >Login</button>
                </form>         
            </div>
        )
    }
}

export default Login