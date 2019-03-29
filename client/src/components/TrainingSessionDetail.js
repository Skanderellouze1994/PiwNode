import React,{Component} from "react";
import connect from "react-redux/es/connect/connect";
import axios from "axios";
import { Link } from "react-router-dom";

class TrainingSessionDetail extends Component{
    constructor(props) {
        super(props);

        this.state ={
            courses:[],
            session:{}
        };
    }

    componentDidMount(){
        axios
            .get(`http://localhost:4000/trainingSession/get/${this.props.match.params.id}`)
            .then(response => {
                this.setState({ courses: response.data.courses, session: response.data });
                console.log(response.data.courses);
            })
    }

    render() {
        //this.state.courses.map(course=>{console.log(course.description)})
        console.log(this.state.session.tutor)
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
                <section className="paddingBottom-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-9 marginTop-30">
                                <h1>
                                    {this.state.session.name}
                                </h1>

                <div className="col-12 mt-4">
                    <ul className="nav tab-line tab-line tab-line--3x border-bottom mb-5" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" data-toggle="tab" href="#tabDescription" role="tab" aria-selected="true">
                                Description
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-toggle="tab" href="#tabInstructors" role="tab" aria-selected="true">
                                Instructors
                            </a>
                        </li>
                    </ul>
                    <div className="tab-content">
                        <div className="tab-pane fade show active" id="tabDescription" role="tabpanel">
                            <h4>
                                Training Session Description
                            </h4>
                            <p>
                                {this.state.session.description}
                            </p>
                            <div className="row mt-5">
                                <div className="col-12">
                                    <h4>
                                        What Will I Learn?
                                    </h4>
                                </div>
                                <div className="col-md-6 my-2">
                                    <ul className="list-unstyled list-style-icon list-icon-check">
                                        <li>Learn how to captivate your audience</li>
                                        <li>Get rid of negative self talk that brings you down before your presentations</li>
                                        <li>Take your business / job to the next level</li>
                                        <li>Overcome the fear of public speaking</li>
                                    </ul>
                                </div>
                                <div className="col-md-6 my-2">
                                    <ul className="list-unstyled list-style-icon list-icon-check">
                                        <li>Learn how to captivate your audience</li>
                                    </ul>
                                </div>
                                <div className="col-md-6 my-2">
                                    <h4>
                                        Course Requirments
                                    </h4>
                                    <ul className="list-unstyled list-style-icon list-icon-bullet">
                                        <li>Learn how to captivate your audience</li>
                                    </ul>
                                </div>
                                <div className="col-md-6 my-2">
                                    <h4>
                                        Who is the Target Audience?
                                    </h4>
                                    <ul className="list-unstyled list-style-icon list-icon-bullet">
                                        <li>Learn how to captivate your audience</li>
                                        <li>Take your business / job to the next level</li>
                                        <li>Overcome the fear of public speaking</li>
                                        <li>Learn how to captivate your audience</li>
                                        <li>Take your business / job to the next level</li>
                                    </ul>
                                </div>
                            </div> {/* END row*/}
                        </div> {/* END tab-pane*/}
                        <div className="tab-pane fade" id="tabInstructors" role="tabpanel">
                            <h4 className="mb-4">
                                About Instructors
                            </h4>
                            <div className="border-bottom mb-4 pb-4">
                                <div className="d-md-flex mb-4">
                                    <a href="#">
                                        <img className="iconbox iconbox-xxxl" src="assets/img/262x230/5.jpg" alt />
                                    </a>
                                    <div className="media-body ml-md-4 mt-4 mt-md-0">
                                        <h6>

                                        </h6>
                                        <p className="mb-2">
                                            <i className="ti-world mr-2" /> Web Developer and Instructor
                                        </p>
                                        <ul className="list-inline">
                                            <li className="list-inline-item mb-2">
                                                <i className="ti-user mr-1" />
                                                147570 studends
                                            </li>
                                            <li className="list-inline-item mb-2">
                                                <i className="ti-book mr-1" />
                                                20 Courses
                                            </li>
                                            <li className="list-inline-item mb-2">
                                                <i className="ti-star text-warning mr-1" />
                                                4.9 Average Rating (4578)
                                            </li>
                                        </ul>
                                        <a href="#" className="btn btn-outline-primary btn-pill btn-sm">View Profile</a>
                                    </div>
                                </div>
                                <h6>
                                    Experience as Web Developer
                                </h6>
                                <p>
                                    Investig ationes demons travge vunt lectores legee lrus quodk legunt saepius claritas est conctetur adip sicing. Dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standad dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it make type specimen book. It has survived not only five centuries.
                                </p>
                            </div>
                        </div> {/* END tab-pane */}
                    </div> {/* END tab-content*/}
                </div> {/* END col-12 */}
                            </div>
                        </div>
                    </div>
                </section>
                {this.state.courses.map(course => (
                <section className="padding-y-60 bg-light-v2">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4 col-md-6 marginTop-30">
                                <div className="card height-100p text-gray shadow-v1">
                                    <img className="card-img-top" src="./assets/img/360x220/1.jpg" alt />
                                    <div className="card-body">
                                        <span className="badge position-absolute top-0 bg-success text-white" data-offset-top={-13}>
                                                    Best selling
                                        </span>
                                        <Link to={"/course/"+course._id} className="h5">
                                            {course.title}
                                        </Link>
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
                                                {course.startDate}
                                            </li>
                                            <li className="mb-1">
                                                <i className="ti-time small mr-2" />
                                                {course.endDate}
                                            </li>
                                        </ul>
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
                ))}
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        courses: state.courses,
        session: state.session
    };
}

const connectedLoginPage = connect(mapStateToProps)(TrainingSessionDetail);
export { connectedLoginPage as TrainingSessionDetail };