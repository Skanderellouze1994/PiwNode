import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import axios from 'axios';
import {history} from "../../_helpers";
import Swal from "sweetalert2";
var dateFormat = require('dateformat');


class ResponsesPost extends Component {

    constructor(props){
        super(props)
        this.state={users:[]};
    }
    componentWillMount() {
        axios.get('/forum/counter').then(res => this.setState({users: res.data})
        )
    }

    render() {
        return (
            <div>
                <div className="py-5 bg-cover text-white" data-dark-overlay="5" style={{background:'url(assets/img/1920/658_2.jpg) no-repeat'}}>
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-md-6">
                                <h2>Top correct answers in posts</h2>
                            </div>

                        </div>
                    </div>
                </div>
                <section className="padding-y-100 border-bottom border-light">
                    <div className="container">
                        <div className="row">

                            <div className="col-12 mx-auto">
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Username</th>
                                            <th scope="col">Answers</th>
                                            <th scope="col">Correct answers</th>
                                            <th scope="col">%</th>
                                            <th scope="col">Badge</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.users.map((f,i)=>
                                        {return(
                                            <tr>

                                                <td>{i+1}</td>
                                                <td>{f.username}</td>
                                                <td>{f.answers}</td>
                                                <td>{f.validatedAnswers}</td>
                                                <td>{(f.validatedAnswers+f.answers) === 0 ?  0  : (f.validatedAnswers/f.answers*100).toFixed(2)} %</td>
                                                <td>{f.badge}</td>
                                            </tr>)})}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        );
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

const connectedHomePage = connect(mapStateToProps)(ResponsesPost);
export { connectedHomePage as ResponsesPost };
