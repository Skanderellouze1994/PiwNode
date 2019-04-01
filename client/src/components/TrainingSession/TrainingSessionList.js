import React,{Component} from "react";
import connect from "react-redux/es/connect/connect";
import axios from "axios";
import { Link } from "react-router-dom";

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
                {this.state.sessions.map(session => (
                <section className="paddingTop-50 paddingBottom-100 bg-light-v2">
                    <div className="container">
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
                                            <li className="list-inline-item mr-2">
                                                <i className="ti-user mr-2" />
                                                {session.tutor.username}
                                            </li>
                                            <li className="list-inline-item mr-2">
                                                <i className="fas fa-star text-warning" />
                                                <i className="fas fa-star text-warning" />
                                                <i className="fas fa-star text-warning" />
                                                <i className="fas fa-star text-warning" />
                                                <i className="fas fa-star text-warning" />
                                            </li>
                                        </ul>
                                    </div>
                                    <Link to="/all" className="btn btn-opacity-primary iconbox iconbox-sm" data-container="body" data-toggle="tooltip" data-placement="top" data-skin="light" title data-original-title="Add to wishlist">
                                        <i className="ti-heart" />
                                    </Link>
                                </div>
                                <p>
                                    {session.description}
                                </p>
                                <ul className="list-inline mb-0">
                                    <li className="list-inline-item mr-3">
                                        <i className="ti-time small mr-2" />
                                        {session.startDate}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
                ))}
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
        sessions: state.sessions,
        alert,
        user
    };
}

const connectedLoginPage = connect(mapStateToProps)(TrainingSessionList);
export { connectedLoginPage as TrainingSessionList };