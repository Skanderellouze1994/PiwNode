import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import axios from 'axios';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import Webcam from "react-webcam";
import {TutorWebCam} from "./TutorWebCam";

class TutorStream extends Component {

    constructor(props){
        super(props)
        this.state={
            x : Math.floor(Math.random() * 1000000000000),
            y:0
        };

    }
    componentDidMount() {

    }



    render () {
var y=0
        return(
            <div>
 <p>https://localhost:3000/streamlink/{this.state.x}</p>
             </div>
    );

    }
}


function mapStateToProps(state) {
    const {cam} = state;
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        cam,
        //cam : this.state.cam,
        user,
        users
    };
}

const connectedHomePage = connect(mapStateToProps)(TutorStream);
export { connectedHomePage as TutorStream };