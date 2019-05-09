import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import './App.css';
import {Header} from './containers/Header';
import Footer from './containers/Footer';
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
import {AddTrainingSession} from "./components/TrainingSession/AddTrainingSession";
import {TrainingSessionList} from "./components/TrainingSession/TrainingSessionList";
import {TrainingSessionDetail} from "./components/TrainingSession/TrainingSessionDetail";
import {ForumShow} from "./components/Forum/ForumShow";
import {CourseDetail} from "./components/CourseDetails";
import {EditTrainingSession} from "./components/TrainingSession/EditTrainingSession";
import {EditCourse} from "./components/TrainingSession/EditCourse";

import {ResponsesPost} from "./components/Forum/ResponsesPost";
import {Responses} from "./components/Forum/Responses";
import {TutorStream} from "./components/Streaming/TutorStream";
import {TutorWebCam} from "./components/Streaming/TutorWebCam";

import {AddQuiz} from "./components/Quiz/addQuiz";
import {AddQuestion} from "./components/Quiz/addQuestion";
import {AddProposition} from "./components/Quiz/addProposition";
import {Dashboard} from "./components/tutor/Dashboard";
import {ShowQuiz} from "./components/Quiz/showQuiz";
import {ResponseQuiz} from "./components/Quiz/responseQuiz";

import {StreamLink} from "./components/Streaming/StreamLink";

import {CurrentSession} from "./components/TrainingSession/CurrentSession";
import {TutorSessions} from "./components/tutor/TutorSessions";
import {StudentSessions} from "./components/student/StudentSessions";

import {ElementCallToAction} from "./components/profile/ElementCallToAction";
import {Scrapping} from "./components/profile/scrapping";
import Modal from 'react-responsive-modal';




class App extends Component {

    render() {
        return (
            <div>

                <div>
                <Router history={history}>
                    <div>
                <Header />
                <Menu/>

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
                    <PrivateRoute  exact  path="/responses" component={ResponsesPost}/>
                    <PrivateRoute  exact  path="/forum/show/:id" component={ForumShow}/>
                    <PrivateRoute  exact  path="/forum/add" component={AddForum}/>
                    <PrivateRoute  exact  path="/Responses" component={Responses}/>
                    <PrivateRoute  exact  path="/TutorStream" component={TutorStream}/>
                    <PrivateRoute  exact  path="/streamlink/:id" component={StreamLink}/>
                    <PrivateRoute  exact  path="/TutorWebCam" component={TutorWebCam}/>
                    <PrivateRoute exact path="/addTrainingSession" component={AddTrainingSession} />
                    <PrivateRoute exact path="/all" component={TrainingSessionList} />
                    <PrivateRoute exact path="/allCourses/:id" component={TrainingSessionDetail} />
                    <PrivateRoute exact path="/course/:id" component={CourseDetail} />
                    <PrivateRoute exact path="/course/:id/edit" component={EditCourse} />
                    <PrivateRoute exact path="/allCourses/:id/edit" component={EditTrainingSession} />
                    <PrivateRoute  exact  path="/addquiz/:id" component={AddQuiz}/>
                    <PrivateRoute  exact  path="/addquestion/:id" component={AddQuestion}/>
                    <PrivateRoute  exact  path="/addproposition/:idquiz/:idquestion" component={AddProposition}/>
                    <PrivateRoute exact path="/dashboard" component={Dashboard} />
                    <PrivateRoute  exact  path="/showquiz/:id" component={ShowQuiz}/>
                    <PrivateRoute  exact  path="/responsequiz/:idquiz/:id" component={ResponseQuiz}/>

                    <PrivateRoute exact path="/currentSession/:id" component={CurrentSession} />
                    <PrivateRoute exact path="/tutor/sessions"  component={TutorSessions} />
                    <PrivateRoute exact path="/student/sessions" component={StudentSessions} />


                <Footer/>
                    </div>
                </Router>
                </div>
            </div>
        );
    }
}

export default App;
