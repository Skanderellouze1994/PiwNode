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
            cam : ''
        };

    }
    componentDidMount() {
        this.setState(
            {cam :<Webcam />.props }
        )
    }


    render () {
        return(
            <div>
                <Camera />
                {console.log(<Webcam />)}
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