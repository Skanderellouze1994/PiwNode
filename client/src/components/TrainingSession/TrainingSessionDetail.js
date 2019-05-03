import React, {Component} from "react";
import connect from "react-redux/es/connect/connect";
import axios from "axios";
import {Link} from "react-router-dom";
import {AddCourse} from "./AddCourse";

class TrainingSessionDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            courses: [],
            session: {}
        };
    }

    componentDidMount() {
        axios
            .get(`/trainingSession/get/${this.props.match.params.id}`)
            .then(response => {
                this.setState({session: response.data});
                this.setState({courses: response.data.courses});
                //console.log(response.data.courses);
            })
    }

    render() {
        console.log(this.props.user.user._id)
        return (
            <div>
                <div className="padding-y-60 bg-cover" data-dark-overlay={6}
                     style={{background: 'url(assets/img/breadcrumb-bg.jpg) no-repeat'}}>
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6 my-2 text-white">
                                <ol className="breadcrumb breadcrumb-double-angle bg-transparent p-0">
                                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                    <li className="breadcrumb-item"><Link to="/all">Training sessions</Link></li>
                                    <li className="breadcrumb-item">{this.state.session.name}</li>
                                </ol>
                                <h2 className="h1">
                                    All {this.state.session.name} 's courses and details
                                </h2>
                            </div>
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
                                <div className="input-group-append">
                                    {this.state.session.tutor !== undefined &&
                                    this.state.session.tutor._id === this.props.user.user._id &&
                                    <Link to={"/allCourses/" + this.state.session._id + "/edit"}
                                          className="btn btn-info rounded" type="submit">
                                        Edit this training session
                                        <i className="ti-angle-right small"/>
                                    </Link>
                                    }
                                </div>
                                <br/>
                                <div className="card padding-30 shadow-v3">
                                    <h4>
                                        Features Includes:
                                    </h4>
                                    <ul className="list-inline mb-0 mt-2">
                                        <li className="list-inline-item my-2 pr-md-4">
                                            <i className="ti-headphone small text-primary" />
                                            <span className="ml-2">246 lectures</span>
                                        </li>
                                        <li className="list-inline-item my-2 pr-md-4">
                                            <i className="ti-time small text-primary" />
                                            <span className="ml-2">27.5 Hours</span>
                                        </li>
                                        <li className="list-inline-item my-2 pr-md-4">
                                            <i className="ti-user small text-primary" />
                                            <span className="ml-2">98,250 students entrolled</span>
                                        </li>
                                        <li className="list-inline-item my-2 pr-md-4">
                                            <i className="ti-reload small text-primary" />
                                            <span className="ml-2">Lifetime access</span>
                                        </li>
                                        <li className="list-inline-item my-2 pr-md-4">
                                            <i className="ti-crown small text-primary" />
                                            <span className="ml-2">Certificate of Completion</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="col-12 mt-4">
                                    <ul className="nav tab-line tab-line tab-line--3x border-bottom mb-5"
                                        role="tablist">
                                        <li className="nav-item">
                                            <a className="nav-link active" data-toggle="tab" href="#tabDescription"
                                               role="tab" aria-selected="true">
                                                Description
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" data-toggle="tab" href="#tabInstructors" role="tab"
                                               aria-selected="true">
                                                Instructors
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" data-toggle="tab" href="#tabCourses" role="tab"
                                               aria-selected="true">
                                                Courses' list
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            {this.state.session.tutor !== undefined &&
                                            this.state.session.tutor._id === this.props.user.user._id &&
                                            <a className="nav-link" data-toggle="tab" href="#tabAddCourse" role="tab"
                                               aria-selected="true">
                                                Add a course
                                            </a>
                                            }
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
                                        </div>
                                        {/* END tab-pane*/}
                                        <div className="tab-pane fade" id="tabInstructors" role="tabpanel">
                                            <h4 className="mb-4">
                                                About Instructors
                                            </h4>
                                            <div className="border-bottom mb-4 pb-4">
                                                <div className="d-md-flex mb-4">
                                                    <a href="#">
                                                        <img className="iconbox iconbox-xxxl"
                                                             src="assets/img/262x230/5.jpg" alt/>
                                                    </a>
                                                    <div className="media-body ml-md-4 mt-4 mt-md-0">
                                                        {this.state.session.tutor !== undefined &&
                                                        <h6>
                                                            {this.state.session.tutor.username}
                                                        </h6>
                                                        }
                                                        <p className="mb-2">
                                                            <i className="ti-world mr-2"/> Web Developer and Instructor
                                                        </p>
                                                        <ul className="list-inline">
                                                            <li className="list-inline-item mb-2">
                                                                <i className="ti-user mr-1"/>
                                                                147570 studends
                                                            </li>
                                                            <li className="list-inline-item mb-2">
                                                                <i className="ti-book mr-1"/>
                                                                20 Courses
                                                            </li>
                                                            <li className="list-inline-item mb-2">
                                                                <i className="ti-star text-warning mr-1"/>
                                                                4.9 Average Rating (4578)
                                                            </li>
                                                        </ul>
                                                        <a href="#" className="btn btn-outline-primary btn-pill btn-sm">View
                                                            Profile</a>
                                                    </div>
                                                </div>
                                                <h6>
                                                    Experience as Web Developer
                                                </h6>
                                                <p>
                                                    Investig ationes demons travge vunt lectores legee lrus quodk legunt
                                                    saepius claritas est conctetur adip sicing. Dummy text of the
                                                    printing and typesetting industry. Lorem Ipsum has been the industry
                                                    standad dummy text ever since the 1500s, when an unknown printer
                                                    took a galley of type and scrambled it make type specimen book. It
                                                    has survived not only five centuries.
                                                </p>
                                            </div>
                                        </div>
                                        {/* END tab-pane */}
                                        <div className="tab-pane fade" id="tabCourses" role="tabpanel">
                                            <h4 className="mb-4">
                                                Courses' list
                                            </h4>
                                            <div id="accordionCurriculum">
                                                <div className="accordion-item list-group mb-3">
                                                    <div className="list-group-item bg-light">
                                                        <a className="row" href="#accordionCurriculum_1"
                                                           data-toggle="collapse" aria-expanded="true">
                                                            <span className="col-9 col-md-8">
                                                                <span className="accordion__icon text-primary mr-2">
                                                                  <i className="ti-plus"/>
                                                                  <i className="ti-minus"/>
                                                                </span>
                                                                <span className="h6 d-inline">Getting Started</span>
                                                            </span>
                                                        </a>
                                                    </div>
                                                    <div id="accordionCurriculum_1" className="collapse show" data-parent="#accordionCurriculum">
                                                        {this.state.courses.map(course => (
                                                        <div className="list-group-item">
                                                              <span className="row">
                                                                  <Link className="col-9 col-md-8" to={"/course/" + course._id} >
                                                                  <i className="ti-file text-primary small mr-1" />
                                                                      {course.title}</Link>
                                                                <span className="col-2 d-none d-md-block text-right">
                                                                  <Link to={"/course/" + course._id} className="h5"></Link>
                                                                </span>
                                                                  {course.period !== null &&
                                                                <span className="col-3 col-md-2 ml-auto text-right">{course.period} hours</span>}
                                                              </span>
                                                        </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <AddCourse id={this.state.session._id}/> {/* END tab-pane*/}
                                    </div>
                                    {/* END tab-content*/}
                                </div>
                                {/* END col-12 */}
                            </div>
                        </div>
                    </div>
                </section>
                <div className="col-12 marginTop-70">
                    <ul className="pagination pagination-primary justify-content-center">
                        <li className="page-item mx-1">
                            <a className="page-link iconbox iconbox-sm rounded-0" href="#">
                                <i className="ti-angle-left small"/>
                            </a>
                        </li>
                        <li className="page-item mx-1">
                            <a className="page-link iconbox iconbox-sm rounded-0" href="#">1</a>
                        </li>
                        <li className="page-item disabled mx-1">
                            <a className="page-link iconbox iconbox-sm rounded-0" href="#">
                                <i className="ti-more-alt"/>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {session} = state;
    const {alert} = state;
    const {authentication} = state;
    const {user} = authentication;
    return {
        session,
        alert,
        user
        //courses: state.courses,
        //session: state.session
    };
}

const connectedLoginPage = connect(mapStateToProps)(TrainingSessionDetail);
export {connectedLoginPage as TrainingSessionDetail};
