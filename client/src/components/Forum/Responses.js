import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import axios from 'axios';
import {history} from "../../_helpers";
import Swal from "sweetalert2";
var dateFormat = require('dateformat');


class Responses extends Component {

    constructor(props) {
        super(props);



        this.state ={
            post:{},
            resp:[],
            u:[{}],
            description: ''
        };
    }



    componentDidMount(){
        axios
            .get(`/forum/${this.props.id}`)
            .then(response => {
                this.setState({ post: response.data });
                this.setState({ resp: response.data.responses });
                console.log(response.data)
                console.log(this.props.id)
            })
    }
    render() {
        return (
            <div>
                {this.state.resp.map(f=>
                {return(


                    <ol className="list-unstyled comments-area">
                        <li>

                            <div className="media mb-5">
                                <div className="media-body">


                                    {this.props.user.user.role == 'tutor' && f.status==true  ? <p
                                        className="float-right btn btn-outline-primary btn-pill btn-sm">
                                        <i className="ti-check"></i> VALIDATED
                                    </p> : <p></p>}
                                    {this.props.user.user.role == 'Student' && f.status==true  ? <p
                                        className="float-right btn btn-outline-primary btn-pill btn-sm">
                                        <i className="ti-check"></i> VALIDATED
                                    </p> : <p></p>}


                                    <p className="h5 mb-0">
                                        {f.userResponse.username} said :
                                    </p>

                                    <p>
                                        {f.description}
                                    </p>
                                </div>
                            </div>
                        </li>
                    </ol>

                )})}
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

const connectedHomePage = connect(mapStateToProps)(Responses);
export { connectedHomePage as Responses };
