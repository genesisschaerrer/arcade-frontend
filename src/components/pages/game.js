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
               <div>{name}</div>
               <iframe src={url} style={{"width": "1000px", "height": "1000px"}} />
               <div>{creator}</div>
           </div>
        )
    }
}

export default Game