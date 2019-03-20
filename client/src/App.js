import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import {Header} from './containers/Header';
import Footer from './containers/Footer';
import Menu from './containers/Menu';
import {Login} from './components/Login';
import {Signup} from './components/Signup';
import {Home} from './components/Home';
import {Profil} from './components/profil';
import { history } from '../src/_helpers';
import {Router} from "react-router";

class App extends Component {
    render() {
        return (
            <div>
                <Router history={history}>
                <Header />
                <Menu/>

                    <Route exact path="/login" component={Login}/>
                    <Route  path="/signup" component={Signup}/>
                    <Route  path="/home" component={Home}/>
                    <Route  path="/profil" component={Profil}/>

                <Footer/>
                </Router>
            </div>
        );
    }
}

export default App;
