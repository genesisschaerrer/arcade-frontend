import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom"
import axios from "axios"

import NavBar from "./navigation/nav-bar"
import Home from "./pages/home"
import Game from "./pages/game"
import Login from "./pages/login"
import AdminDashboard from "./pages/admin-dashboard"

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
          <Route path="/games/:id" component={Game} />
          <Route path="/login" component={Login} />
          <Route path="/admindashboard" component={AdminDashboard} />
        </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App
