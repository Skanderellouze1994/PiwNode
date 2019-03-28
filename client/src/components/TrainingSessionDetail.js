import React,{Component} from "react";
import connect from "react-redux/es/connect/connect";
import axios from "axios";

class TrainingSessionDetail extends Component{
    constructor(props) {
        super(props);

        this.state =[];
    }

    componentDidMount(){
        axios
            .get(`http://localhost:4000/trainingSession/get/${this.props.match.params.id}`)
            .then(response => {
                this.setState({ courses: response.data.courses });
                console.log(response.data.courses);
            })
    }

    render() {
        return(
            <div>
                <div className="padding-y-60 bg-cover" data-dark-overlay={6} style={{background: 'url(assets/img/breadcrumb-bg.jpg) no-repeat'}}>
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6 my-2 text-white">
                                <ol className="breadcrumb breadcrumb-double-angle bg-transparent p-0">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                    <li className="breadcrumb-item"><a href="#">Training sessions</a></li>
                                    <li className="breadcrumb-item">All training session's courses</li>
                                </ol>
                                <h2 className="h1">
                                    All Courses Gird
                                </h2>
                                <p className="lead">
                                    <span className="text-primary">6,178</span> courses found
                                </p>
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
                                            <option selected>Select Category</option>
                                            <option>UI/UX design</option>
                                            <option>Web app</option>
                                            <option>React</option>
                                            <option>Game development</option>
                                        </select>
                                    </li>
                                    <li className="list-inline-item my-2">
                                        <select className="form-control">
                                            <option selected>Filter</option>
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
                        </form> {/* END row*/}
                    </div> {/* END container*/}
                </section>
                <section className="padding-y-60 bg-light-v2">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4 col-md-6 marginTop-30">
                                <div href="page-course-details.html" className="card height-100p text-gray shadow-v1">
                                    <img className="card-img-top" src="assets/img/360x220/1.jpg" alt />
                                    <div className="card-body">
                                        <span className="badge position-absolute top-0 bg-success text-white" data-offset-top={-13}>
                                                    Best selling
                                        </span>
                                        <a href="#" className="h5">
                                            The Web Developer Bootcamp
                                        </a>
                                        <p className="my-3">
                                            <i className="ti-user mr-2" />
                                            Andrew Mead
                                        </p>
                                        <p className="mb-0">
                                            <i className="fas fa-star text-warning" />
                                            <i className="fas fa-star text-warning" />
                                            <i className="fas fa-star text-warning" />
                                            <i className="fas fa-star text-warning" />
                                            <i className="fas fa-star text-warning" />
                                            <span className="text-dark">5</span>
                                            <span>(4578)</span>
                                        </p>
                                    </div>
                                    <div className="card-footer media align-items-center justify-content-between">
                                        <ul className="list-unstyled mb-0">
                                            <li className="mb-1">
                                                <i className="ti-headphone small mr-2" />
                                                46 lectures
                                            </li>
                                            <li className="mb-1">
                                                <i className="ti-time small mr-2" />
                                                27.5 hours
                                            </li>
                                        </ul>
                                        <h4 className="h5 text-right">
                                            <span className="text-primary">$180</span>
                                        </h4>
                                    </div>
                                </div>
                            </div>
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
                        </div> {/* END row*/}
                    </div> {/* END container*/}
                </section>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        courses: state.courses
    };
}

const connectedLoginPage = connect(mapStateToProps)(TrainingSessionDetail);
export { connectedLoginPage as TrainingSessionDetail };