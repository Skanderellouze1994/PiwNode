import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Header from './containers/Header';
import Footer from './containers/Footer';
import Menu from './containers/Menu';
import {Login} from './components/Login';
import {Signup} from './components/Signup';
import {Home} from './components/Home';

class App extends Component {
    render() {
        return (
            <div>
                <Header/>
                <Menu/>
                <Switch>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/signup" component={Signup}/>
                    <Route exact path="/home" component={Home}/>
                </Switch>
                <Footer/>
            </div>
        );
    }
}

export default App;
