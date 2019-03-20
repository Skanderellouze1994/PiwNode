import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import {Header} from './containers/Header';
import Footer from './containers/Footer';
import {Menu} from './containers/Menu';
import {Login} from './components/Login';
import {Signup} from './components/Signup';
import {Home} from './components/Home';
import {Profil} from './components/profil';
import { history } from '../src/_helpers';

class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <Menu />
                <Switch history={history}>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/signup" component={Signup}/>
                    <Route exact path="/home" component={Home}/>
                    <Route exact path="/profil" component={Profil}/>
                </Switch>
                <Footer/>
            </div>
        );
    }
}

export default App;
