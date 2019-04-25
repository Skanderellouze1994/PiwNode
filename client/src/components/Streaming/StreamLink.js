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
            <div className="col-md-3 mt-5">

                <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#modal__large"
                        style={{marginLeft: "450px"}}
                >
                    <i className="ti-video-camera mr-3"></i> Join the video conference
                </button>
            </div>
               <br></br>
               <br></br>
            <div>
                <div className="modal fade" id="modal__large" tabIndex="-1" role="dialog" aria-labelledby="modal__large"
                     aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <i className="ti-close font-size-14"></i>
                            </button>
                            <div className="modal-body py-4">
                                <iframe
                                    src={"https://tokbox.com/embed/embed/ot-embed.js?embedId=bedd9fcf-4de4-428f-a963-61c246a095db&room="+this.props.match.params.id+"&iframe=true"}
                                    width="740px"
                                    height="440px"
                                    scrolling="auto"
                                    allow="microphone; camera"
                                ></iframe>
                            </div>

                        </div>
                    </div>
                </div>



            </div>
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