import React, {Component} from "react";
import connect from "react-redux/es/connect/connect";
import axios from "axios";
import {CurrentSessionComponent} from "./CurrentSessionComponent";
import {OneSessionDetail} from "./OneSessionDetail";
import moment from "moment";


class TrainingSessionsAllList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sessions: [],
            currentSession: [],
            currentCourse: [],
        };
    }


    componentDidMount() {
        axios.get('/trainingSession/all')
            .then(response => {
                this.setState({sessions: response.data});
                //console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });

        // get courses of the user's sessions
        this.interval = setInterval(() => {
            if (this.props.user.user.role === "Student") {
                axios.get(`/trainingSession/get/student/${this.props.user.user._id}`)
                    .then(response => {
                        this.setState({currentSession: response.data});
                    }).then(response =>
                    this.state.currentSession.map(course => (
                        axios
                            .get(`/trainingSession/get/${course._id}`)
                            .then(res => {
                                this.setState({currentCourse: res.data.courses});
                                //console.log(res.data.courses)
                            }))))
                    .catch(function (error) {
                        console.log(error);
                    });
            } else if (this.props.user.user.role === "Tutor") {
                axios.get(`/trainingSession/get/tutor/${this.props.user.user._id}`)
                    .then(response => {
                        this.setState({currentSession: response.data});
                    }).then(response =>
                    this.state.currentSession.map(course => (
                        axios
                            .get(`/trainingSession/get/${course._id}`)
                            .then(res => {
                                this.setState({currentCourse: res.data.courses});
                                //console.log(res.data.courses)
                            }))))
                    .catch(function (error) {
                        console.log(error);
                    });
            }
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
                            <OneSessionDetail id={session._id} />
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
