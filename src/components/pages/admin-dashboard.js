import React, {Component} from "react"
import axios from "axios"

class AdminDashboard extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: "",
            url: "",
            image: "",
            creator: "",
            data: []
        }
    }

    getGames = () => {
        axios.get("http://localhost:4000")
            .then(response =>  this.setState({
                data: response.data
                }))
            .catch(err => console.log(err))
            
    }

    componentDidMount(){
        this.getGames()
    }

    handleDelete = (id) => {
        axios.delete(`http://localhost:4000/delete/${id}`)
            .then(() => this.getGames())
            .catch(error => console.log("delete game error: ", error))
    }

    gamesSideBar = () => {
        return this.state.data.map(game => {
            return (
                <div key={game._id}>
                    <div>{game.name}</div>
                    <div onClick={() => this.handleDelete(game._id)}>Delete</div>
                </div>
            )
        })
    }

    handleChange = (e) => {
        e.perventDefault
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log("got to admin game post")
        const {
            name,
            url,
            creator
        } = this.state
        axios.post("http://localhost:4000", {name, url, creator})
            .then(() => 
            this.setState({
                name: "",
                url: "",
                creator: "",
            }))
            .then(()=> this.getGames())
            .catch(err => console.log (err))
    }

    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="game name"
                        value={this.state.name}
                        onChange={this.handleChange}
                    />

                    <input
                        type="text"
                        name="url"
                        placeholder="game url"
                        value={this.state.url}
                        onChange={this.handleChange}
                    />

                    <input
                        type="text"
                        name="creator"
                        placeholder="game creator"
                        value={this.state.creator}
                        onChange={this.handleChange}
                    />

                    <button type="submit">Submit</button>
                </form>
                {this.gamesSideBar()}
            </div>
        )
    }
}

export default AdminDashboard