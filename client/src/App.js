import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import './App.css';
import {Header} from './containers/Header';
import Footer from './containers/Footer';
import {Menu} from './containers/Menu';
import {Login} from './components/Login';
import {Signup} from './components/Signup';
import {Home} from './components/Home';
import {Profil} from './components/profil';
import {history} from '../src/_helpers';
import {Router} from "react-router";
import {PrivateRoute} from "./_components";
import {HomeTutor} from "./components/tutor/HomeTutor";
import HomeStudent from "./components/student/HomeStudent";
import {ForgetPassword} from "./components/ForgetPassword";
import {ResetPassword} from "./components/ResetPassword";
import {Forum} from "./components/Forum/Forum";
import {AddForum} from "./components/Forum/AddForum";
import {AddTrainingSession} from "./components/AddTrainingSession";
import {TrainingSessionList} from "./components/TrainingSessionList";
import {TrainingSessionDetail} from "./components/TrainingSessionDetail";

class App extends Component {
    render() {
        return (
            <div>
                <Router history={history}>
                <Header />

                <Menu/>


                    <Route exact path="/login" component={Login}/>
                    <Route exact  path="/forgot" component={ForgetPassword}/>
                    <Route exact  path="/reset" component={ResetPassword}/>
                    <Route exact  path="/signup" component={Signup}/>
                    <Route exact  path="/home" component={Home}/>
                    <PrivateRoute  exact  path="/profil" component={Profil}/>
                    <PrivateRoute  exact  path="/tutor" component={HomeTutor}/>
                    <PrivateRoute  exact  path="/student" component={HomeStudent}/>
                    <PrivateRoute  exact  path="/forum" component={Forum}/>
                    <PrivateRoute  exact  path="/addforum" component={AddForum}/>
                    <PrivateRoute  exact  path="/forum/add" component={AddForum}/>
                    <PrivateRoute exact path="/addTrainingSession" component={AddTrainingSession} />
                    <PrivateRoute exact path="/all" component={TrainingSessionList} />
                    <PrivateRoute exact path="/allCourses/:id" component={TrainingSessionDetail} />


                <Footer/>
                </Router>
            </div>
        );
    }
}

export default App;
