import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom"
import axios from "axios"

import NavBar from "./navigation/nav-bar"
import Home from "./pages/home"
import Game from "./pages/game"
import Login from "./pages/login"

class App extends Component{
  constructor(props){
    super(props)
  }

  render () {
    return (
      <div className="app">
        <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/:id" component={Game} />
          <Route path="/login" component={Login} />
        </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App
