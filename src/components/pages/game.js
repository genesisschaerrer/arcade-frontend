import React, {Component} from "react"
import axios from "axios"


class Game extends Component {
    constructor(props){
        super(props)
        this.state = {
            game: {}
        }
    }


    componentDidMount(){
        this.getGame()
    }

    getGame = () => {
        axios.get(`http://localhost:4000/${this.props.match.params.id}`)
        .then(res => this.setState({
            game: res.data
        }))
        .catch(error => 
            console.log("getGame error: ", error))
    }

    render(){
        const {
            name,
            url,
            image,
            creator
        } = this.state.game

        return(
           <div className="game-container">
               <div className="game-name">{name}</div>
               <iframe className="iframe" src={url} />
               <div>{creator}</div>
           </div>
        )
    }
}

export default Game