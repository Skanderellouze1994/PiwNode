import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import axios from 'axios';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import Webcam from "react-webcam";
import {TutorStream} from "./TutorStream";

class TutorWebCam extends Component {

    constructor(props){
        super(props)
        this.state={};
    }


    render () {
        console.log(this.props);
        console.log(this.state);
        return (
            <div>
                <iframe src="https://localhost:4000/visualisation.html" allow="camera; microphone;"/>
            </div>
        );

    }
}


function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    //const {cam} = state;
    return {
        //cam : this.props.cam,
        user,
        users
    };
}

const connectedHomePage = connect(mapStateToProps)(TutorWebCam);
export { connectedHomePage as TutorWebCam };