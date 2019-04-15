import React,{Component} from "react";
import connect from "react-redux/es/connect/connect";
import {Link} from "react-router-dom";

class Dashboard extends Component{
    constructor(props) {
        super(props);

        this.state = {
            sessions: []
        };
    }

    componentDidMount(){

    }

    render() {
        return(
            <div>
                <div className="padding-y-80 bg-cover" data-dark-overlay={6}
                     style={{background: 'url(assets/img/breadcrumb-bg.jpg) no-repeat'}}>
                    <div className="container">
                        <h2 className="text-white">
                            My dashboard
                        </h2>
                        <ol className="breadcrumb breadcrumb-double-angle text-white bg-transparent p-0">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item"> My dashboard</li>
                        </ol>
                    </div>
                </div>
                <section className="padding-y-100 border-bottom border-light">
                    <div className="container">
                        <ul className="nav tab-line tab-line tab-line--2x border-bottom justify-content-center mb-4" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" data-toggle="tab" href="#stream" role="tab" aria-selected="true">
                                    Stream
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#form-group" role="tab" aria-selected="true">
                                    Statics
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#form-date-time" role="tab" aria-selected="true">
                                    Students' informations
                                </a>
                            </li>
                        </ul>
                    </div> {/* END container*/}
                    <div className="tab-content">
                        <div className="tab-pane fade show active" id="stream" role="tabpanel">
                            <section className="padding-y-70 border-bottom border-light">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-12 text-center mb-5">
                                            <h4>Class - <span className="text-primary">05</span></h4>
                                        </div>
                                        <div className="col-12">
                                            <div className="badge-blurb mr-5 mb-3">
                                                <img src="assets/img/avatar/4.jpg" alt="true" />
                                                <span className="badge badge-primary">34</span>
                                            </div>
                                            <div className="badge-blurb mr-5 mb-3">
                                                <img src="assets/img/avatar/5.jpg" alt="true" />
                                                <span className="badge badge-success">34</span>
                                            </div>
                                            <div className="badge-blurb mr-5 mb-3">
                                                <img src="assets/img/avatar/4.jpg" alt="true" />
                                                <span className="badge badge-primary rounded-circle">4</span>
                                            </div>
                                            <div className="badge-blurb mr-5 mb-3">
                                                <img src="assets/img/avatar/5.jpg" alt="true" />
                                                <span className="badge badge-success rounded-circle">34</span>
                                            </div>
                                        </div>
                                    </div> {/* END row*/}
                                </div> {/* END container*/}
                            </section>
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

const connectedLoginPage = connect(mapStateToProps)(Dashboard);
export { connectedLoginPage as Dashboard };