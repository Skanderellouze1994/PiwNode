import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import './App.css';
import {Header} from './containers/Header';
import Footer from './containers/Footer';
import {Chats} from './containers/chats';
import {Menu} from './containers/Menu';
import {Login} from './components/Login';
import {Signup} from './components/Signup';
import {Home} from './components/Home';
import {Profil} from './components/profile/profil';
import {history} from '../src/_helpers';
import {Router} from "react-router";
import {PrivateRoute} from "./_components";
import {HomeTutor} from "./components/tutor/HomeTutor";
import HomeStudent from "./components/student/HomeStudent";
import {ForgetPassword} from "./components/ForgetPassword";
import {ResetPassword} from "./components/ResetPassword";
import {Forum} from "./components/Forum/Forum";
import {AddForum} from "./components/Forum/AddForum";
import { LinkedInPopUp } from 'react-linkedin-login-oauth2';
import {AddTrainingSession} from "./components/TrainingSession/AddTrainingSession";
import {TrainingSessionList} from "./components/TrainingSession/TrainingSessionList";
import {TrainingSessionDetail} from "./components/TrainingSession/TrainingSessionDetail";
import {ForumShow} from "./components/Forum/ForumShow";
import {CourseDetail} from "./components/CourseDetails";
import {EditTrainingSession} from "./components/TrainingSession/EditTrainingSession";
import {EditCourse} from "./components/TrainingSession/EditCourse";
import {AddQuiz} from "./components/Quiz/addQuiz";
import {Dashboard} from "./components/tutor/Dashboard";
import {CurrentSession} from "./components/TrainingSession/CurrentSession";
import {ElementCallToAction} from "./components/profile/ElementCallToAction";
import Scrapping from "./components/profile/scrapping";
import Modal from 'react-responsive-modal';


class App extends Component {

    render() {
        return (
            <div>
                <div style={{position: 'relative',zIndex:'2'}}>
                    <Chats/>
                </div>
                <div style={{position: 'relative',zIndex:'1'}}>
                <Router history={history}>
                <Header />
                <Menu/>

                    <Route exact path="/linkedin" component={LinkedInPopUp} />
                    <Route exact path="/scrapping" component={Scrapping} />
                    <Route exact path="/login" component={Login}/>
                    <Route exact  path="/forgot" component={ForgetPassword}/>
                    <Route exact  path="/reset" component={ResetPassword}/>
                    <Route exact  path="/signup" component={Signup}/>
                    <Route exact  path="/home" component={Home}/>
                    <PrivateRoute  exact  path="/profil" component={Profil}/>
                    <PrivateRoute  exact  path="/tutor" component={HomeTutor}/>
                    <PrivateRoute  exact  path="/student" component={HomeStudent}/>
                    <PrivateRoute  exact  path="/forum" component={Forum}/>
                    <PrivateRoute  exact  path="/forum/show/:id" component={ForumShow}/>
                    <PrivateRoute  exact  path="/forum/add" component={AddForum}/>
                    <PrivateRoute exact path="/addTrainingSession" component={AddTrainingSession} />
                    <PrivateRoute exact path="/all" component={TrainingSessionList} />
                    <PrivateRoute exact path="/allCourses/:id" component={TrainingSessionDetail} />
                    <PrivateRoute exact path="/course/:id" component={CourseDetail} />
                    <PrivateRoute exact path="/course/:id/edit" component={EditCourse} />
                    <PrivateRoute exact path="/allCourses/:id/edit" component={EditTrainingSession} />
                    <PrivateRoute  exact  path="/addquiz" component={AddQuiz}/>
                    <PrivateRoute exact path="/dashboard" component={Dashboard} />
                    <PrivateRoute exact path="/currentSession" component={CurrentSession} />


                <Footer/>
                </Router>
                </div>
            </div>
        );
    }
}

export default App;
