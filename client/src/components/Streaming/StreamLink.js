import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import axios from 'axios';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import Webcam from "react-webcam";
import {TutorWebCam} from "./TutorWebCam";

class StreamLink extends Component {

    constructor(props){
        super(props)
        this.state={
            x : Math.floor(Math.random() * 1000000000000)
        };

    }
    componentDidMount() {
        console.log(Math.floor(Math.random() * 1000000000000))
    }


    render () {
        return(
            <div>
                <button onClick={this.click}></button>
                <p>Genegate a new conference room</p>
                <p ></p>
                <iframe
                    src={"https://tokbox.com/embed/embed/ot-embed.js?embedId=bedd9fcf-4de4-428f-a963-61c246a095db&room="+this.props.match.params.id+"&iframe=true"}
                    width="600px"
                    height="440px"
                    scrolling="auto"
                    allow="microphone; camera"
                ></iframe>

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

const connectedHomePage = connect(mapStateToProps)(StreamLink);
export { connectedHomePage as StreamLink };