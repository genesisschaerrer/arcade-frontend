import React, {Component} from "react"
import {Link} from "react-router-dom"
import axios from "axios"

class Home extends Component {
    constructor(){
        super()

        this.state = {
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

    renderGames = () => {
        return this.state.data.map(game => {
            return(
                <Link to={`/games/${game._id}`} key={game._id}>
                    <div className="all-games-container">
                    <div className="game-name">{game.name}</div>
                    <img src={game.url} style={{"width": "400px", "height": "400px"}} alt="game image" />
                    </div>
                </Link>
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