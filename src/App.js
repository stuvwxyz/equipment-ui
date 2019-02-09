import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import EquipmentList from './EquipmentList';
import EquipmentDisplay from "./EquipmentDisplay";
import EquipmentEdit from "./EquipmentEdit";


class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route path='/' exact={true} component={Home}/>
            <Route path='/equipment' exact={true} component={EquipmentList}/>
            <Route path='/equipment/:id' component={EquipmentDisplay}/>
            <Route path='/equipmentedit/:id' component={EquipmentEdit}/>
          </Switch>
        </Router>
    )
  }
}

export default App;
