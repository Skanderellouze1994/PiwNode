import React, {Component} from "react";
import connect from "react-redux/es/connect/connect";
import axios from "axios";
import {Link} from "react-router-dom";
import {CurrentSessionComponent} from "./CurrentSessionComponent";
import moment from "moment";

var dateFormat = require('dateformat');

class TrainingSessionsAllList extends Component {
    /*componentWillMount() {
        const { dispatch } = this.props;
        dispatch(trainingSessionAction.getAll());
        console.log(dispatch(trainingSessionAction.getAll()))
    }*/
    constructor(props) {
        super(props);

        this.state = {
            sessions: [],
            currentSession: [],
            currentCourse: [],
        };
    }


    componentDidMount() {
        axios.get('http://localhost:4000/trainingSession/all')
            .then(response => {
                this.setState({sessions: response.data});
                //console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });

        // get courses of the user's sessions
        this.interval = setInterval(() => {
            if (this.props.user.user.role === "tutor") {
                axios.get(`http://localhost:4000/trainingSession/get/student/${this.props.user.user._id}`)
                    .then(response => {
                        this.setState({currentSession: response.data});
                    }).then(response =>
                    this.state.currentSession.map(course => (
                        axios
                            .get(`http://localhost:4000/trainingSession/get/${course._id}`)
                            .then(res => {
                                this.setState({currentCourse: res.data.courses});
                                //console.log(res.data.courses)
                            }))))
                    .catch(function (error) {
                        console.log(error);
                    });
            } /*else if (this.props.user.user.role === "tutor") {
                axios.get(`http://localhost:4000/trainingSession/get/tutor/${this.props.user.user._id}`)
                    .then(response => {
                        this.setState({currentSession: response.data});
                    }).then(response =>
                    this.state.currentSession.map(course => (
                        axios
                            .get(`http://localhost:4000/trainingSession/get/${course._id}`)
                            .then(res => {
                                this.setState({currentCourse: res.data.courses});
                                //console.log(res.data.courses)
                            }))))
                    .catch(function (error) {
                        console.log(error);
                    });
            }*/
        }, 10000);
    }

    render() {
        /*this.state.currentSession.map(product => (
             console.log(product.name)
        ));*/
        const currentDate = moment();

        return (
            <div>
                <section className="paddingTop-50 paddingBottom-100 bg-light-v2">
                    <div className="container">
                        {this.state.currentCourse.map(current => (
                            moment(current.startDate).year() === currentDate.year() &&
                            moment(current.startDate).month() === currentDate.month() &&
                            moment(current.startDate).day() === currentDate.day() &&
                            moment(moment(current.startDate).diff(currentDate)).hours() <= 2 &&
                            moment(moment(current.startDate).diff(currentDate)).hours() >= 0 &&
                            moment(moment(current.startDate).diff(currentDate)).minutes() >= 0 &&
                            moment(moment(current.startDate).diff(currentDate)).seconds() >= 0 &&
                            <CurrentSessionComponent id={current._id} date={current.startDate}/>
                        ))}
                        {this.state.sessions.map(session => (
                            <div className="list-card align-items-center shadow-v1 marginTop-30">
                                <div className="col-lg-4 px-lg-4 my-4">
                                    <img className="w-100" src="assets/img/360x220/4.jpg" alt="true"/>
                                </div>
                                <div className="col-lg-8 paddingRight-30 my-4">
                                    <div className="media justify-content-between">
                                        <div className="group">
                                            <Link to={"/allCourses/" + session._id}>
                                                <strong>{session.name}</strong>
                                            </Link>
                                            <ul className="list-inline mt-3">
                                                {session.tutor !== undefined &&
                                                <li className="list-inline-item mr-2">
                                                    <i className="ti-user mr-2"/>
                                                    {session.tutor.username}
                                                </li>}
                                                <li className="list-inline-item mr-2">
                                                    <i className="fas fa-star text-warning"/>
                                                    <i className="fas fa-star text-warning"/>
                                                    <i className="fas fa-star text-warning"/>
                                                    <i className="fas fa-star text-warning"/>
                                                    <i className="fas fa-star text-warning"/>
                                                </li>
                                            </ul>
                                        </div>
                                        <Link to="/all" className="btn btn-opacity-primary iconbox iconbox-sm"
                                              data-container="body" data-toggle="tooltip" data-placement="top"
                                              data-skin="light" title="Add to favorite"
                                              data-original-title="to favorite">
                                            <i className="ti-heart"/>
                                        </Link>
                                    </div>
                                    <p>
                                        {session.description}
                                    </p>
                                    <ul className="list-inline mb-0">
                                        <li className="list-inline-item mr-3">
                                            <i className="ti-time small mr-2"/>
                                            {dateFormat(session.startDate, "dddd, mmmm dS, yyyy, h:MM:ss TT")}
                                        </li>
                                    </ul>
                                    <br/>

                                    {session.studentsList.length !== 0
                                        ?
                                        session.studentsList.map(list => (
                                            list._id === this.props.user.user._id
                                                ? <button className="btn btn-success shadow-success mr-3 mb-3">
                                                    Already participated</button>
                                                : <button className="btn btn-outline-success shadow-success mr-3 mb-3">
                                                    <Link to="/all">Participate now</Link></button>))

                                        : <button className="btn btn-outline-success shadow-success mr-3 mb-3">
                                            <Link to="/all">Participate now</Link></button>}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {alert} = state;
    const {authentication} = state;
    const {user} = authentication;

    return {
        alert,
        user
    };
}

const connectedLoginPage = connect(mapStateToProps)(TrainingSessionsAllList);
export {connectedLoginPage as TrainingSessionsAllList};