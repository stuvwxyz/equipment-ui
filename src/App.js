import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import EquipmentList from './EquipmentList';
import EquipmentEdit from "./EquipmentEdit";
import Callback from './Callback';
import SecuredRoute from './SecuredRoute/SecuredRoute';
import auth0Client from './Auth';


class App extends Component {
    async componentDidMount() {
        if (this.props.location.pathname === '/callback') return;
        try {
            await auth0Client.silentAuth();
            this.forceUpdate();
        } catch (err) {
            if (err.error !== 'login_required') console.log(err.error);
        }
    }

    render() {
    return (
        <Router>
          <Switch>
            <Route path='/' exact={true} component={Home}/>
            <SecuredRoute path='/equipment' exact={true} component={EquipmentList}/>
            <SecuredRoute path='/equipmentedit/:id' component={EquipmentEdit}/>

            <Route exact path='/callback' component={Callback}/>
          </Switch>
        </Router>
    )
  }
}

export default App;
