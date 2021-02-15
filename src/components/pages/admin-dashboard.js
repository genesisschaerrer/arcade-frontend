import React, {Component} from "react"
import axios from "axios"
// import FileInputComponent from 'react-file-input-previews-base64'
import FileBase64 from 'react-file-base64'

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
                <div className="all-games" key={game._id}>
                    <div>{game.name}</div>
                    <div>{game.image}</div>
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
            image,
            creator
        } = this.state
        axios.post("http://localhost:4000", {name, url, creator, image})
        // axios({
        //     method: post,
        //     url: "http://localhost:4000",
        //     headers: {
        //         "Access-Control-Allow-Origin": 
        //     }

        // })
            .then(() => 
            this.setState({
                name: "",
                url: "",
                creator: "",
            }))
            .then(()=> this.getGames())
            .catch(err => console.log (err))
    }

    getFiles(files){
        this.setState({ image: files.base64 })
        console.log(this.state.image)
      }

    render(){
        return(
            <div className="dashboard-container">
                <form className="dashboard-form" onSubmit={this.handleSubmit}>
                    <input
                        className="login-input"
                        type="text"
                        name="name"
                        placeholder="game name"
                        value={this.state.name}
                        onChange={this.handleChange}
                    />

                    <input
                        className="login-input"
                        type="text"
                        name="url"
                        placeholder="game url"
                        value={this.state.url}
                        onChange={this.handleChange}
                    />

                    <input
                        className="login-input"
                        type="text"
                        name="creator"
                        placeholder="game creator"
                        value={this.state.creator}
                        onChange={this.handleChange}
                    />
                    
                    {/* <FileInputComponent
                    labelText="Select file"
                    labelStyle={{fontSize:14}}
                    multiple={false}
                    // callbackFunction={(file_arr)=>{console.log(file_arr)}}
                    callbackFunction={this.getFiles.bind(this)}
                    accept="image/*" 
                    /> */}

                    <FileBase64
                    className="login-input"
                    multiple={ false }
                    onDone={ this.getFiles.bind(this) } />

                    <button type="submit">Submit</button>
                </form>
                
                <div className="all-games-container">
                    {this.gamesSideBar()}
                </div>
            </div>
        )
    }
}

export default AdminDashboard