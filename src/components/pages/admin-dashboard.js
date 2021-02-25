import React, {Component} from "react"
import axios from "axios"
import DropzoneComponent from "react-dropzone-component"

import "../../../node_modules/react-dropzone-component/styles/filepicker.css"
import "../../../node_modules/dropzone/dist/min/dropzone.min.css"


//TODO REFACTOR TO BASE64
// import FileInputComponent from 'react-file-input-previews-base64'
// import FileBase64 from 'react-file-base64'
// import {FilePond, registerPlugin} from "react-filepond"
// import FilePondPluginFileEncode from 'filepond-plugin-file-encode'
// import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
// import FilePondPluginImageResize from 'filepond-plugin-image-resize'

// import "../../../node_modules/filepond/dist/filepond.css"
// import "../../../node_modules/filepond/dist/filepond.min.css"
// import "../../../node_modules/filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css"

// registerPlugin(FilePondPluginFileEncode, FilePondPluginImagePreview, FilePondPluginImageResize)


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

        this.imageRef = React.createRef()
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

    handleDelete = (id) => {
        axios.delete(`https://arcade-node-api.herokuapp.com/delete/${id}`, {withCredentials: true})
            .then(() => this.getGames())
            .catch(error => console.log("delete game error: ", error))
    }

    gamesSideBar = () => {
        return this.state.data.map(game => {
            return (
                <div className="all-games" key={game._id}>
                    <div className="game-title">{game.name}</div>
                    <div>{game.url}</div>
                    <div className="creator">{game.creator}</div>
                    <img src={game.image}  style={{width: "100px"}}/>
                    <div className="delete-btn"  onClick={() => this.handleDelete(game._id)}>Delete</div>
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

    //WORKS WITH BASE64
    // getFiles(files){
    //     this.setState({ image: files.base64 })
    //     console.log(this.state.image)
    //   }

    componentConfig = () => {
        return {
            inconFiletypes: [".jpg", ".png"],
            showFiletypeIcon: true,
            postUrl: "https://httpbin.org/post"
        }
    }

     djsConfig = () => {
        return {
            addRemoveLinks: true,
            maxFiles: 1
        }
    }

    handleDrop = () => {
        return {
            addedfile: file => {
                const formData = new FormData()

                formData.append("upload_preset", "gens-arcade")
                formData.append("file", file)

                axios.post("https://api.cloudinary.com/v1_1/genesisschaerrer/image/upload", formData)
                    .then(res => this.setState({image: res.data.secure_url})) 
                    .catch(err => console.log(err))

            }
        } 
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
        axios.post("https://dashboard.heroku.com/apps/arcade-node-api", {name, url, image, creator}, {withCredentials: true})
        // axios({
        //     method: POST,
        //     url: "http://localhost:4000",
        //     headers: {
        //         "Access-Control-Allow-Origin": true,
        //     },
        //     withCredentials: true,

        // })
            .then(() => 
            this.setState({
                name: "",
                url: "",
                creator: "",
                image: ""
            }))
            .then(() =>  this.imageRef.current.dropzone.removeAllFiles())
            .then(()=> this.getGames())
            .catch(err => console.log (err))
    }

    render(){
        return(
            <div className="dashboard-container">
                <form className="dashboard-form" onSubmit={this.handleSubmit}>
                    <div className="form-title">ADD NEW GAME</div>
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

                        <DropzoneComponent 
                        ref={this.imageRef}
                        config={this.componentConfig()}
                        djsConfig={this.djsConfig()}
                        eventHandlers={this.handleDrop()}
                        >
                        <div className="dz-message">Game Image</div>
                        </DropzoneComponent>
                    {/* <FilePond
                        allowMultiple={false}
                        files={this.state.image}
                        allowFileEncode={true}
                        // oninit={() => this.handleInit()} 
                        // onupdatefiles={this.setState({   })}
                        maxFiles={1}
                        server="/api"
                    /> */}


                    {/* <FileInputComponent
                    labelText="Select file"
                    labelStyle={{fontSize:14}}
                    multiple={false}
                    // callbackFunction={(file_arr)=>{console.log(file_arr)}}
                    callbackFunction={this.getFiles.bind(this)}
                    accept="image/*" 
                    /> */}

                    {/* <FileBase64
                    className="login-input"
                    multiple={ false }
                    onDone={ this.getFiles.bind(this) } /> */}

                    <button className="submit-btn" type="submit">Submit</button>
                </form>
                
                <div className="all-games-container">
                    {this.gamesSideBar()}
                </div>
            </div>
        )
    }
}

export default AdminDashboard