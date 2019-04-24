import React,{Component} from "react";
import connect from "react-redux/es/connect/connect";
import {Link} from "react-router-dom";
import axios from "axios";
import moment from "moment";
import PropTypes from 'prop-types';
var dateFormat = require('dateformat');

class CurrentSessionComponent extends Component{
    constructor(props) {
        super(props);
        this.state = {
            hours: 0,
            min: 0,
            sec: 0,
            session : {},
        }
    }
    componentDidMount() {
        axios
            .get(`http://localhost:4000/trainingSession/get/course/${this.props.id}`)
            .then(response => {
                this.setState({session: response.data});
                //this.setState({courses: response.data.courses});
                console.log(response.data);
            });
        // update every second
        this.interval = setInterval(() => {
            const date = this.calculateCountdown(this.props.date);
            date && this.setState(date) ;
        }, 1000);
    }

    /*componentWillUnmount() {
        this.stop();
    }*/

    calculateCountdown(endDate) {
        let diff = (Date.parse(new Date(endDate)) - Date.parse(new Date())) / 1000;

        // clear countdown when date is reached
        if (diff <= 0) return false;

        const timeLeft = {
            days: 0,
            hours: 0,
            min: 0,
            sec: 0,
        };

        // calculate time difference between now and expected date
        if (diff >= 86400) { // 24 * 60 * 60
            timeLeft.days = Math.floor(diff / 86400);
            diff -= timeLeft.days * 86400;
        }
        if (diff >= 3600) { // 60 * 60
            timeLeft.hours = Math.floor(diff / 3600);
            diff -= timeLeft.hours * 3600;
        }
        if (diff >= 60) {
            timeLeft.min = Math.floor(diff / 60);
            diff -= timeLeft.min * 60;
        }
        timeLeft.sec = diff;

        return timeLeft;
    }
    /*stop() {
        clearInterval(this.interval);
    }*/

    addLeadingZeros(value) {
        value = String(value);
        while (value.length < 2) {
            value = '0' + value;
        }
        return value;
    }

    render() {
        setTimeout(
            function() {
                const currentDate = moment();
                const future = moment('2019-04-20 01:00:00');
                const timeLeft = moment(future.diff(currentDate)).seconds();
                const min = moment(future.diff(currentDate)).minutes();
               // console.log(currentDate);
               // console.log(timeLeft);
               // console.log(min);
            },
            1000
        );
        const countDown = this.state;
        return(
            <div className="list-card align-items-center shadow-v2 px-3">
                <div className="col-lg-4 py-4">
                    <img className="w-100" src="assets/img/384x320/1.jpg" alt="true" />
                </div>
                <div className="col-lg-8 py-4">
                    <div className="d-md-flex justify-content-between align-items-center">
                        <ul className="list-inline mb-md-0">
                            <li className="list-inline-item mr-3"></li>
                            <li className="list-inline-item mr-3"></li>
                            <li className="list-inline-item mr-3"></li>
                        </ul>
                        <span className="badge badge-danger">Starting soon</span>
                    </div>
                    <a href="#" className="h4">
                        {this.state.session.title}
                    </a>
                    <ul className="list-inline text-gray mt-3">
                        <li className="list-inline-item mr-2">
                            <i className="ti-time text-primary mr-1" />
                            {dateFormat(this.state.session.startDate, "dddd, mmmm dS, yyyy, h:MM:ss TT")}
                        </li>
                        <li className="list-inline-item mr-2">
                            <i className="ti-location-pin text-primary mr-1" />
                            Esprit, TN
                        </li>
                    </ul>
                    <p>
                        {this.state.session.description}
                    </p>
                    <ul className="list-inline mt-4" data-countdown="2019/01/01">
                        <li className="list-inline-item iconbox iconbox-xxxl border border-light mb-2">
                            <h2 className="countdown-days mb-0 text-primary" />
                            <span>Starts in</span>
                        </li>
                        <li className="list-inline-item iconbox iconbox-xxxl border border-light mb-2">
                            <h2 className="countdown-hours mb-0 text-primary" />
                            <span>{this.addLeadingZeros(countDown.hours)}</span>
                        </li>
                        <li className="list-inline-item iconbox iconbox-xxxl border border-light mb-2">
                            <h2 className="countdown-minutes mb-0 text-primary" />
                            <span>{this.addLeadingZeros(countDown.min)}</span>
                        </li>
                        <li className="list-inline-item iconbox iconbox-xxxl border border-light mb-2">
                            <h2 className="countdown-seconds mb-0 text-primary" />
                            <span>{this.addLeadingZeros(countDown.sec)}</span>
                        </li>
                    </ul>
                    {countDown.hours ===0 && countDown.min === 0 && countDown.sec ===0 ?
                        <button className='btn btn-danger shadow-danger mr-3 mb-3'>Closed</button>
                        :
                        <button className='btn btn-info shadow-info mr-3 mb-3'>
                            <Link to={"/currentSession/"+this.state.session._id}> Opened</Link></button>
                    }
                    {this.state.session.presenceList !== undefined &&this.state.session.presenceList.length !== 0
                        ?
                        this.state.session.presenceList.map(list => (
                            list._id === this.props.user.user._id
                                ? <button className="btn btn-success shadow-success mr-3 mb-3">
                                    <Link to={"/currentSession/"+this.state.session._id}>Already joined</Link></button>
                                : this.props.user.user.role === "Student" &&<button className="btn btn-outline-success shadow-success mr-3 mb-3">
                                    <Link to={"/currentSession/"+this.state.session._id}>Join now</Link></button>))
                        : this.props.user.user.role === "Student" &&
                        <button className="btn btn-outline-success shadow-success mr-3 mb-3">
                            <Link to={"/currentSession/"+this.state.session._id}>Join now</Link></button>}
                </div>
            </div>
        )
    }
}
CurrentSessionComponent.propTypes = {
    date: PropTypes.string.isRequired
};

CurrentSessionComponent.defaultProps = {
    date: new Date()
};

function mapStateToProps(state) {
    const {alert} = state;
    const { authentication } = state;
    const { user } = authentication;

    return {
        alert,
        user
    };
}

const connectedLoginPage = connect(mapStateToProps)(CurrentSessionComponent);
export { connectedLoginPage as CurrentSessionComponent };