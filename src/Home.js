import React, { Component } from 'react';
import './App.css';
import Navbar from './Navbar';
import homeImage from './images/Equipment.png';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';

class Home extends Component {
    render() {
        return (
            <div>
                <Navbar/>
                <div className="App">
                    <header className="App-header">
                        <img src={homeImage} className="App-logo" alt="homeImage" />
                        <Container fluid>
                            <Button color="link"><Link to="/equipment">Manage Equipment</Link></Button>
                        </Container>
                    </header>
                </div>
            </div>
        );
    }
}

export default Home;
