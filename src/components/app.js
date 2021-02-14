import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom"
import axios from "axios"

import NavBar from "./navigation/nav-bar"
import HOME from "./pages/home"

class App extends Component{
  constructor(props){
    super(props)
  }

  render () {
    return (
      <div className="app">
        <NavBar />
        <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HOME} />
        </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App
