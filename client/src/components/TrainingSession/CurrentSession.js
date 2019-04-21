import React,{Component} from "react";
import connect from "react-redux/es/connect/connect";

class CurrentSession extends Component{
    constructor(props) {
        super(props);
    }

    componentDidMount(){
    }

    render() {
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
                                                    <h4 className="countdown-hours font-size-md-28 mb-0 line-height-reset">12</h4>
                                                    <small>Hours</small>
                                                </li>
                                                <li className="list-inline-item iconbox iconbox-xxl bg-white-0_2 my-1">
                                                    <h4 className="countdown-minutes font-size-md-28 mb-0 line-height-reset">23</h4>
                                                    <small>Minutes</small>
                                                </li>
                                                <li className="list-inline-item iconbox iconbox-xxl bg-white-0_2 my-1">
                                                    <h4 className="countdown-seconds font-size-md-28 mb-0 line-height-reset">40</h4>
                                                    <small>Second</small>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="card-body padding-40" >
                                        <h2 className="card-title">
                                            Current Course
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
                                                    <span>Aug 28-30, 2018</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="border-bottom py-3">
                                            <div className="media">
                                                <i className="ti-time text-primary mt-2" />
                                                <div className="media-body ml-3">
                                                    <h6 className="my-0">Time</h6>
                                                    <span>9:00 AM – 6:00 PM</span>
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
function mapStateToProps(state) {
    const { authentication } = state;
    const { user } = authentication;
    return {
        user
    };
}

const connectedLoginPage = connect(mapStateToProps)(CurrentSession);
export { connectedLoginPage as CurrentSession };