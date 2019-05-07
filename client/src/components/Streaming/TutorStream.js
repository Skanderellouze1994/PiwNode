import React, {Component} from 'react';
import {connect} from "react-redux";
import 'react-html5-camera-photo/build/css/index.css';
import {CopyToClipboard} from 'react-copy-to-clipboard';

class TutorStream extends Component {

    constructor(props){
        super(props)
        this.state={
            value : "/streamlink/"+Math.floor(Math.random() * 1000000000000),
            copied: false,
        };
    }
    componentDidMount() {
    }

    render () {
        return(
            <div>
                <div className="py-5 bg-cover text-white" data-dark-overlay="5">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-md-6">
                                <h2>Strat a video call</h2>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="col-12 mt-5">
                    <div
                        className="bg-primary text-white p-5 rounded d-md-flex justify-content-between align-items-center">
                        <p className="mb-0 mr-4 lead">
                            You need to create a room for video call ? you can get a link here
                        </p>

                        <button type="button" className="btn btn-light" data-toggle="modal"
                                data-target="#modal__Vertically-centered">Generate a link
                        </button>

                    </div>
                </div>
                <br></br>
                <br></br>


                <div className="modal fade" id="modal__Vertically-centered" tabIndex="-1" role="dialog"
                     aria-labelledby="modal__Vertically-centered" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Send this link to the students</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <i className="ti-close font-size-14"></i>
                                </button>
                            </div>
                            <div className="modal-body py-4">
                                <input type="text" value={this.state.value}
                                style={{width:"100%"}}/>
                            </div>
                            <div className="modal-footer py-4">
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                                <CopyToClipboard text={this.state.value}
                                                 onCopy={() => this.setState({copied: true})}>
                                    <button type="button" className="btn btn-success"><i className="ti-clipboard mr-3"></i>  Copy to clipboard</button>
                                </CopyToClipboard>
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

const connectedHomePage = connect(mapStateToProps)(TutorStream);
export { connectedHomePage as TutorStream };
