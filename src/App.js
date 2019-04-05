import React, {Component} from 'react';
import './App.css';
import Home from './Home';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {CookiesProvider} from 'react-cookie';
import EquipmentList from './EquipmentList';
import EquipmentEdit from "./EquipmentEdit";


class App extends Component {
    render() {
        return (
            <CookiesProvider>
                <Router>
                    <Switch>
                        <Route path='/' exact={true} component={Home}/>
                        <Route path='/equipment' exact={true} component={EquipmentList}/>
                        <Route path='/equipmentedit/:id' component={EquipmentEdit}/>
                    </Switch>
                </Router>
            </CookiesProvider>
        )
    }
}

export default App;
