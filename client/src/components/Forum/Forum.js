import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import axios from 'axios';

import {Responses} from "./Responses";
var dateFormat = require('dateformat');

class Forum extends Component {

    constructor(props){
        super(props)
        this.state={
            forum:[],
            post:{},
            x:null,
            resp:[null],
            u:[{}],
            description: ''};
    }
    componentDidMount() {
        axios.get('/forum/')
            .then(res=>this.setState({forum:res.data})
            )
    }


    render() {
        if(!this.state.forum)
            return null
        console.log(this.state.forum)
        return (

            <div>
                <div className="py-5 bg-cover text-white" data-dark-overlay="5">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-md-6">
                                <h2>Forum</h2>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="col-12 mt-5">
                    <div
                        className="bg-primary text-white p-5 rounded d-md-flex justify-content-between align-items-center">
                        <p className="mb-0 mr-4 lead">
                            You need help ? you can ask here
                        </p>
                        <Link  to={"/forumall/add"} className="btn btn-outline-white"> Ask for help</Link>
                    </div>
                </div>

                <section className="pt-5 paddingBottom-100 bg-light-v2">
                    <div className="container">
                        {this.state.forum.map(f=>
                        {return(
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="list-card marginTop-40">

                                        <div className="col-md-12 px-md-0">
                                            <div className="card height-100p shadow-v1">
                                                <div className="card-body">
                                                    <Link to={"/forumall/show/"+f._id} className="h4 mb-3">
                                                        {f.subject}

                                                    </Link>
                                                    <p className="mb-0">
                                                        {f.description}
                                                    </p>
                                                </div>
                                                <div className="card-footer">
                                                    <div className="media">
                                                        <img className="iconbox" src="assets/img/avatar/4.jpg" alt />
                                                        <div className="media-body ml-4">
                                                            <a href="#" className="text-primary">By {f.userPost.username}</a> <br />

                                                            Asked {dateFormat(f.datePost, "dddd, mmmm dS, yyyy, h:MM:ss TT")}
                                                            <p className="float-right">


                                                                <button type="button" className="btn btn-success"
                                                                        onClick={this.changeX(f._id)}
                                                                        data-toggle="modal"
                                                                        data-target={"#modal__Scrolling-long-"+f._id}>{f.responses.length} responses
                                                                </button>

                                                            </p>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div> {/* END col-md-8*/}
                                    </div> {/* END list-card*/}

                                </div> {/* END col-lg-9 */}
                                <div className="modal fade" id={"modal__Scrolling-long-"+f._id} tabIndex="-1" role="dialog"
                                     aria-labelledby="modal__Scrolling-long" aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title">{f.subject}</h5>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <i className="ti-close font-size-14"></i>
                                                </button>
                                            </div>
                                            <div className="modal-body py-4">
                                                <Responses id={this.state.x}/>
                                            </div>
                                            <div className="modal-footer py-4">
                                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> )})}

                    </div> {/* END container*/}
                </section>

            </div>
        );
    }

    changeX(_id) {
        this.state.x=_id
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedHomePage = connect(mapStateToProps)(Forum);
export { connectedHomePage as Forum };
