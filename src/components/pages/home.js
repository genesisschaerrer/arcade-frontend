import React, {Component} from "react"
import axios from "axios"

class Home extends Component {
    constructor(){
        super()

        this.state = {
            data: []
        }
    }

    getGames = () => {
        console.log("got here")
        axios.get("http://localhost:4000")
            .then(response =>  this.setState({
                data: response.data
                }))
            .catch(err => console.log(err))
            
    }

    componentDidMount(){
        this.getGames()
        console.log("got to component did mount")
    }

    renderGames = () => {
        return this.state.data.map(game => {
            return(
                <div className="all-games-container" key={game._id}>
                    <div className="game-name">{game.name}</div>
                    {/* <iframe src={game.url} style={{"width": "1000px", "height": "1000px"}} /> */}
                    <img src={game.url} style={{"width": "400px", "height": "400px"}} alt="game image" />
                </div>
            )
        })
    }


    render(){
        return(
            <div className="home-container">
            {this.renderGames()}
            </div>
        )
    }
}

export default Home