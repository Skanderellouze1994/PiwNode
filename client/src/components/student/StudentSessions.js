import React,{Component} from "react";
import connect from "react-redux/es/connect/connect";
import axios from "axios";
import {Link} from "react-router-dom";

var dateFormat = require('dateformat');

class StudentSessions extends Component{
    constructor(props) {
        super(props);
        this.state = {
            sessions : []
        }
    }
    componentDidMount() {
        axios.get(`http://localhost:4000/trainingSession/get/student/${this.props.user.user._id}`)
            .then(response => {
                this.setState({sessions: response.data});
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return(
            <div>
                <div className="padding-y-60 bg-cover" data-dark-overlay={6}
                     style={{background: 'url(assets/img/breadcrumb-bg.jpg) no-repeat'}}>
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6 my-2 text-white">
                                <ol className="breadcrumb breadcrumb-double-angle bg-transparent p-0">
                                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                    <li className="breadcrumb-item">My training sessions</li>
                                </ol>
                                <h2 className="h1">
                                    My Training sessions Gird
                                </h2>
                            </div>
                            <form className="col-lg-5 my-2 ml-auto">
                                <div className="input-group bg-white rounded p-1">
                                    <input type="text" className="form-control border-white"
                                           placeholder="What do you want to learn?" required/>
                                    <div className="input-group-append">
                                        <button className="btn btn-info rounded" type="submit">
                                            Search
                                            <i className="ti-angle-right small"/>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <section className="padding-y-60 bg-light">
                    <div className="container">
                        <div className="row">
                            {this.state.sessions.map(session => (
                                    <div className="col-lg-4 col-md-6 marginTop-30">
                                        <div className="card height-100p shadow-v1">
                                            <img className="card-img-top" src="assets/img/384x320/5.jpg" alt="true"/>
                                            <div className="card-body">
                                                <Link to={"/allCourses/" + session._id} className="h4">{session.name}</Link>
                                                <ul className="list-unstyled line-height-lg mt-4">
                                                    <li><i className="ti-time text-primary mr-2"/>
                                                        {dateFormat(session.startDate, "mmmm dS, yyyy, h:MM TT")}
                                                    </li>
                                                    <li><i className="ti-location-pin text-primary mr-2"/>Z.I. Chotrana II
                                                        B.P. 160,Pôle Technologique El Ghazela - Ariana 2083
                                                    </li>
                                                </ul>
                                                <Link to={"/allCourses/" + session._id} className="btn btn-link pl-0">View
                                                    Details</Link>
                                            </div>
                                        </div>
                                    </div>
                                )
                            )}

                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
function mapStateToProps(state) {
    const {alert} = state;
    const { authentication } = state;
    const { user } = authentication;

    return {
        alert,
        user
    };
}

const connectedLoginPage = connect(mapStateToProps)(StudentSessions);
export { connectedLoginPage as StudentSessions };