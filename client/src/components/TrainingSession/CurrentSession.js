import React,{Component} from "react";
import connect from "react-redux/es/connect/connect";
import axios from "axios";
import moment from "moment";
import Swal from 'sweetalert2';
var dateFormat = require('dateformat');

class CurrentSession extends Component{
    constructor(props) {
        super(props);
        this.state ={
            hours: 0,
            min: 0,
            sec: 0,
            course :{}
        };
    }

    componentDidMount(){
        axios
            .get(`http://localhost:4000/trainingSession/get/course/${this.props.match.params.id}`)
            .then(response => {
                this.setState({ course: response.data });
                //console.log(response.data);
            });
        // update every second the countdown
        this.interval = setInterval(() => {
            const date = this.calculateCountdown(new Date(moment(this.state.course.startDate).add(this.state.course.period, 'hours').format("YYYY-MM-DDTHH:mm:ssZ")));
            date && this.setState(date) ;
        }, 1000);
    }


    calculateCountdown(endDate) {
        let diff = (Date.parse(new Date(endDate)) - Date.parse(new Date())) / 1000;

        // clear countdown when date is reached
        if (diff <= 0) return false;

        const timeLeft = {
            hours: 0,
            min: 0,
            sec: 0,
        };

        // calculate time difference between now and expected date
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
    stop() {
        clearInterval(this.interval);
    }

    addLeadingZeros(value) {
        value = String(value);
        while (value.length < 2) {
            value = '0' + value;
        }
        return value;
    }

    render() {
        const time = moment(this.state.course.startDate).add(this.state.course.period, 'hours').format('LT');
        const countDown = this.state;
        if(countDown.hours === 1 && countDown.min === 0 && countDown.sec ===30){
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'This course is over now , please tap "OK" to go to the training sessions list!',
                focusConfirm: false,
                confirmButtonText:
                    '<a href="/all">OK</a>'
            })
        }
        return(
            <div>
                <section className="padding-y-60 bg-light">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 mt-4">
                                <div className="card shadow-v1">
                                    <div className="position-relative">
                                        <img className="card-img-top w-100" src="assets/img/750/450.jpg" alt="true" />
                                        <div className="position-absolute bottom-0 width-100p bg-primary-0_7 text-center text-white">
                                            <ul className="list-inline my-2" data-countdown="2019/01/01">
                                                <li className="list-inline-item iconbox iconbox-xxl bg-white-0_2 my-1">
                                                    <h4 className="countdown-hours font-size-md-28 mb-0 line-height-reset">
                                                        {this.addLeadingZeros(countDown.hours)}
                                                    </h4>
                                                    <small>Hours</small>
                                                </li>
                                                <li className="list-inline-item iconbox iconbox-xxl bg-white-0_2 my-1">
                                                    <h4 className="countdown-minutes font-size-md-28 mb-0 line-height-reset">
                                                        {this.addLeadingZeros(countDown.min)}
                                                    </h4>
                                                    <small>Minutes</small>
                                                </li>
                                                <li className="list-inline-item iconbox iconbox-xxl bg-white-0_2 my-1">
                                                    <h4 className="countdown-seconds font-size-md-28 mb-0 line-height-reset">
                                                        {this.addLeadingZeros(countDown.sec)}
                                                    </h4>
                                                    <small>Second</small>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="card-body padding-40" >
                                        <h2 className="card-title">
                                            {this.state.course.title}
                                        </h2>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 mt-4">
                                <div className="card shadow-v1">
                                    <div className="card-body">
                                        <h4 className="mb-2">
                                            Course Quick Information
                                        </h4>
                                        <div className="border-bottom py-3">
                                            <div className="media">
                                                <i className="ti-calendar text-primary mt-2" />
                                                <div className="media-body ml-3">
                                                    <h6 className="my-0">Date</h6>
                                                    <span>{dateFormat(this.state.course.startDate, "mmmm dS, yyyy, h:MM TT")}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="border-bottom py-3">
                                            <div className="media">
                                                <i className="ti-time text-primary mt-2" />
                                                <div className="media-body ml-3">
                                                    <h6 className="my-0">Time</h6>
                                                    <span>{dateFormat(this.state.course.startDate, "h:MM TT")} – {time}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="border-bottom py-3">
                                            <div className="media">
                                                <i className="ti-location-pin text-primary mt-2" />
                                                <div className="media-body ml-3">
                                                    <h6 className="my-0">Esprit</h6>
                                                    <span>Z.I. Chotrana II B.P. 160,Pôle Technologique El Ghazela - Ariana 2083</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="border-bottom py-3">
                                            <div className="media">
                                                <i className="ti-user text-primary mt-2" />
                                                <div className="media-body ml-3">
                                                    <h6 className="my-0">Total Students Number</h6>
                                                    <span>1500</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

CurrentSession.defaultProps = {
    date: new Date()
};
function mapStateToProps(state) {
    const { authentication } = state;
    const { user } = authentication;
    return {
        user
    };
}

const connectedLoginPage = connect(mapStateToProps)(CurrentSession);
export { connectedLoginPage as CurrentSession };