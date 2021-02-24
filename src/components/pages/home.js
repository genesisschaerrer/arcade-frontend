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
        axios.get("https://arcade-node-api.herokuapp.com/")
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
                    <div className="all-games-container">
                    <Link className="link" to={`/games/${game._id}`} key={game._id}>
                    <div className="game-name">{game.name}</div>
                    <img   className="img" src={game.image} style={{"width": "350px", "height": "350px"}} alt="game image" />           
                    </Link>
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