import React,{Component} from "react";
import connect from "react-redux/es/connect/connect";
import axios from "axios";
import { Link } from "react-router-dom";
var dateFormat = require('dateformat');

class TrainingSessionList extends Component{
    /*componentWillMount() {
        const { dispatch } = this.props;
        dispatch(trainingSessionAction.getAll());
        console.log(dispatch(trainingSessionAction.getAll()))
    }*/
    constructor(props) {
        super(props);

        this.state = {
            sessions: []
        };
    }

    componentDidMount(){
        axios.get('http://localhost:4000/trainingSession/all')
            .then(response => {
                this.setState({ sessions: response.data });
                //console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        this.state.sessions.map(product => (
             console.log(product.name)
        ));
        return(
            <div>
                <div className="padding-y-60 bg-cover" data-dark-overlay={6} style={{background: 'url(assets/img/breadcrumb-bg.jpg) no-repeat'}}>
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6 my-2 text-white">
                                <ol className="breadcrumb breadcrumb-double-angle bg-transparent p-0">
                                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                    <li className="breadcrumb-item">All training sessions</li>
                                </ol>
                                <h2 className="h1">
                                    All Training sessions Gird
                                </h2>
                            </div>
                            <form className="col-lg-5 my-2 ml-auto">
                                <div className="input-group bg-white rounded p-1">
                                    <input type="text" className="form-control border-white" placeholder="What do you want to learn?" required />
                                    <div className="input-group-append">
                                        <button className="btn btn-info rounded" type="submit">
                                            Search
                                            <i className="ti-angle-right small" />
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <section className="py-3 position-relative shadow-v1">
                    <div className="container">
                        <form className="row">
                            <div className="col-md-6 my-2">
                                <ul className="list-inline">
                                    <li className="list-inline-item my-2">
                                        <select className="form-control">
                                            <option selected default>Select Category</option>
                                            <option>UI/UX design</option>
                                            <option>Web app</option>
                                            <option>React</option>
                                            <option>Game development</option>
                                        </select>
                                    </li>
                                    <li className="list-inline-item my-2">
                                        <select className="form-control">
                                            <option selected default>Filter</option>
                                            <option>Best selling</option>
                                            <option>Newest</option>
                                            <option>Top rated</option>
                                            <option>Low price</option>
                                            <option>High price</option>
                                        </select>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-6 my-2 text-md-right">
                                <div className="d-inline-flex justify-md-content-end">
                                    <select className="form-control my-2">
                                        <option selected default>items per page</option>
                                        <option>8</option>
                                        <option>12</option>
                                        <option>16</option>
                                        <option>20</option>
                                        <option>24</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
                <section className="paddingTop-50 paddingBottom-100 bg-light-v2">
                    <div className="container">
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
                                   Upcoming Course
                                </a>
                                <ul className="list-inline text-gray mt-3">
                                    <li className="list-inline-item mr-2">
                                        <i className="ti-time text-primary mr-1" />
                                        April 15-04, 2019
                                    </li>
                                    <li className="list-inline-item mr-2">
                                        <i className="ti-location-pin text-primary mr-1" />
                                        Esprit, TN
                                    </li>
                                </ul>
                                <p>
                                    Investig ationes demons travge vunt lectores legee lrus quodk legunt saepius claritas est conctetur adipi sicing eiusmod tempor.
                                </p>
                                <ul className="list-inline mt-4" data-countdown="2019/01/01">
                                    <li className="list-inline-item iconbox iconbox-xxxl border border-light mb-2">
                                        <h2 className="countdown-days mb-0 text-primary" />
                                        <span>Days</span>
                                    </li>
                                    <li className="list-inline-item iconbox iconbox-xxxl border border-light mb-2">
                                        <h2 className="countdown-hours mb-0 text-primary" />
                                        <span>Hours</span>
                                    </li>
                                    <li className="list-inline-item iconbox iconbox-xxxl border border-light mb-2">
                                        <h2 className="countdown-minutes mb-0 text-primary" />
                                        <span>Minutes</span>
                                    </li>
                                    <li className="list-inline-item iconbox iconbox-xxxl border border-light mb-2">
                                        <h2 className="countdown-seconds mb-0 text-primary" />
                                        <span>Second</span>
                                    </li>
                                </ul>
                                <button className="btn btn-outline-success shadow-success mr-3 mb-3">
                                    <Link to="/currentSession">Join now</Link></button>
                            </div>
                        </div>
                        {this.state.sessions.map(session => (
                        <div className="list-card align-items-center shadow-v1 marginTop-30">
                            <div className="col-lg-4 px-lg-4 my-4">
                                <img className="w-100" src="assets/img/360x220/4.jpg" alt="" />
                            </div>
                            <div className="col-lg-8 paddingRight-30 my-4">
                                <div className="media justify-content-between">
                                    <div className="group">
                                        <Link to={"/allCourses/"+session._id}>
                                            {session.name}
                                        </Link>
                                        <ul className="list-inline mt-3">
                                            {session.tutor !== undefined &&
                                            <li className="list-inline-item mr-2">
                                                <i className="ti-user mr-2" />
                                                {session.tutor.username}
                                            </li>}
                                            <li className="list-inline-item mr-2">
                                                <i className="fas fa-star text-warning" />
                                                <i className="fas fa-star text-warning" />
                                                <i className="fas fa-star text-warning" />
                                                <i className="fas fa-star text-warning" />
                                                <i className="fas fa-star text-warning" />
                                            </li>
                                        </ul>
                                    </div>
                                    <Link to="/all" className="btn btn-opacity-primary iconbox iconbox-sm" data-container="body" data-toggle="tooltip" data-placement="top" data-skin="light" title="true" data-original-title="Add to wishlist">
                                        <i className="ti-heart" />
                                    </Link>
                                </div>
                                <p>
                                    {session.description}
                                </p>
                                <ul className="list-inline mb-0">
                                    <li className="list-inline-item mr-3">
                                        <i className="ti-time small mr-2" />
                                        {dateFormat(session.startDate, "dddd, mmmm dS, yyyy, h:MM:ss TT")}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        ))}
                    </div>
                </section>
                <div className="row">
                    <div className="col-12 marginTop-70">
                        <ul className="pagination pagination-primary justify-content-center">
                            <li className="page-item mx-1">
                                <a className="page-link iconbox iconbox-sm rounded-0" href="#">
                                    <i className="ti-angle-left small" />
                                </a>
                            </li>
                            <li className="page-item mx-1">
                                <a className="page-link iconbox iconbox-sm rounded-0" href="#">1</a>
                            </li>
                            <li className="page-item active disabled mx-1">
                                <a className="page-link iconbox iconbox-sm rounded-0" href="#">2</a>
                            </li>
                            <li className="page-item mx-1">
                                <a className="page-link iconbox iconbox-sm rounded-0" href="#">3</a>
                            </li>
                            <li className="page-item disabled mx-1">
                                <a className="page-link iconbox iconbox-sm rounded-0" href="#">
                                    <i className="ti-more-alt" />
                                </a>
                            </li>
                            <li className="page-item mx-1">
                                <a className="page-link iconbox iconbox-sm rounded-0" href="#">16</a>
                            </li>
                            <li className="page-item mx-1">
                                <a className="page-link iconbox iconbox-sm rounded-0" href="#">
                                    <i className="ti-angle-right small" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
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

const connectedLoginPage = connect(mapStateToProps)(TrainingSessionList);
export { connectedLoginPage as TrainingSessionList };