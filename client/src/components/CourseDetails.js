import React,{Component} from "react";
import connect from "react-redux/es/connect/connect";
import axios from "axios";
import { Link } from "react-router-dom";
import {
    FacebookShareCount,
    GooglePlusShareCount,
    LinkedinShareCount,
    PinterestShareCount,

    FacebookShareButton,
    GooglePlusShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    PinterestShareButton,

    FacebookIcon,
    TwitterIcon,
    GooglePlusIcon,
    LinkedinIcon,
    PinterestIcon,
} from 'react-share';
import Artyom from 'artyom.js';

class CourseDetail extends Component{
    constructor(props) {
        super(props);

        this.state = {
            quiz: []
        };
    }

    componentDidMount(){
        axios
            .get(`http://localhost:4000/trainingSession/get/course/${this.props.match.params.id}`)
            .then(response => {
                this.setState({ course: response.data });
                console.log(response.data);
            });
        axios
            .get(`http://localhost:4000/quiz`)
            .then(response => {
                this.setState({ quiz: response.data });
                console.log(response.data);
            });

        const artyom = new Artyom();
        artyom.initialize({
            lang:"en-GB",
            debug:true,
            continuous:false,
            listen:true,
            speed:1
        });


        var settings = {
            continuous: true, // Don't stop never because i have https connection
            onResult: function (text) {
                alert(text);
            },
            onStart: function () {
                alert("Dictation started by the user");
            },
            onEnd: function () {
                alert("Dictation stopped by the user");
            }
        };

    }

    render() {
        //console.log(this.state.course);
        //console.log(this.props);
        const url = window.location.href;
        //console.log(url)

        return(
            <div>
                <div className="padding-y-60 bg-cover" data-dark-overlay={6} style={{background: 'url(assets/img/breadcrumb-bg.jpg) no-repeat'}}>
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6 my-2 text-white">
                                <ol className="breadcrumb breadcrumb-double-angle bg-transparent p-0">
                                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                    <li className="breadcrumb-item"><Link to="/all">Training sessions</Link></li>
                                    <li className="breadcrumb-item"><Link to="#">Training session</Link></li>
                                    <li className="breadcrumb-item">Course</li>
                                </ol>
                                {this.state.course !== undefined &&
                                <h2 className="h1">
                                    {this.state.course.title}
                                </h2>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <section className="py-3">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 z-index-10" data-offset-top-md={-40}>
                                <ul className="list-inline d-inline-block py-2 px-4 shadow-v3 bg-white rounded-pill">
                                    <li className="list-inline-item">Share <span className="d-none d-md-inline-block">this course:</span></li>
                                    <li className="list-inline-item mx-0">
                                        <a className="btn btn-opacity-primary iconbox iconbox-xs">
                                            <FacebookShareButton
                                                url="http://github.com/Skanderellouze1994/PiwNode"
                                                quote={url}
                                            >
                                                <FacebookIcon
                                                    size={32}
                                                    round />
                                            </FacebookShareButton>
                                        </a>
                                    </li>
                                    <li className="list-inline-item mx-0">
                                        <a className="btn btn-opacity-primary iconbox iconbox-xs">
                                            <TwitterShareButton
                                                url={url}
                                                title="test"
                                                className="Demo__some-network__share-button">
                                                <TwitterIcon
                                                    size={32}
                                                    round />
                                            </TwitterShareButton>
                                        </a>
                                    </li>
                                    <li className="list-inline-item mx-0">
                                        <a className="btn btn-opacity-primary iconbox iconbox-xs">
                                            <LinkedinShareButton
                                                url="http://github.com/Skanderellouze1994/PiwNode"
                                                title="test"
                                                windowWidth={750}
                                                windowHeight={600}
                                                className="Demo__some-network__share-button">
                                                <LinkedinIcon
                                                    size={32}
                                                    round />
                                            </LinkedinShareButton>
                                        </a>
                                    </li>
                                    <li className="list-inline-item mx-0">
                                        <a className="btn btn-opacity-primary iconbox iconbox-xs">
                                            <GooglePlusShareButton
                                                url="http://github.com/Skanderellouze1994/PiwNode">
                                                <GooglePlusIcon
                                                    size={32}
                                                    round />
                                            </GooglePlusShareButton>
                                        </a>
                                    </li>
                                </ul>
                                <a href="#" className="btn btn-white iconbox"><i className="ti-heart" /></a>
                            </div>
                        </div> {/* END row*/}
                    </div>
                </section>
                <section className="paddingBottom-100">
                    <div className="container">
                        <div className="col-lg-9 marginTop-30">
                            {this.state.course !== undefined &&
                            <h1>
                                {this.state.course.title}
                            </h1>}
                            <div className="input-group-append">
                                {this.state.course !== undefined &&
                                this.state.course.tutorCreator !== undefined &&
                                this.state.course.tutorCreator._id === this.props.user.user._id &&
                                <Link to={"/course/" + this.state.course._id + "/edit"}
                                      className="btn btn-info rounded" type="submit">
                                    Edit this course
                                    <i className="ti-angle-right small"/>
                                </Link>
                                }
                            </div>
                            <div className="row mt-3">
                                <div className="col-lg-3 col-md-6 my-2">
                                    <div className="media border-right height-100p">
                                        <img className="iconbox mr-3" src="assets/img/avatar/4.jpg" alt="true" />
                                        <div className="media-body">
                                            <span className="text-gray d-block">Instructor:</span>
                                            {this.state.course !== undefined &&
                                            <a href="#" className="h6">{this.state.course.tutorCreator.username}</a>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6 my-2">
                                    <div className="border-right height-100p">
                                        <span className="text-gray">Reviews:</span>
                                        <p className="mb-0">
                                            <i className="fas fa-star text-warning small" />
                                            <i className="fas fa-star text-warning small" />
                                            <i className="fas fa-star text-warning small" />
                                            <i className="fas fa-star text-warning small" />
                                            <i className="fas fa-star-half small" />
                                            <span className="text-dark">4.9</span>
                                            <span>(793)</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                <section className="paddingBottom-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-9 marginTop-30">
                                <h1>

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
                                        <li className="nav-item">
                                            <a className="nav-link" data-toggle="tab" href="#tabStatics" role="tab" aria-selected="true">
                                                Statics
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" data-toggle="tab" href="#tabList" role="tab" aria-selected="true">
                                                Presence List
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" data-toggle="tab" href="#tabRessources" role="tab" aria-selected="true">
                                                Ressources
                                            </a>
                                        </li><li className="nav-item">
                                            <a className="nav-link" data-toggle="tab" href="#tabQuiz" role="tab" aria-selected="true">
                                                Quiz
                                            </a>
                                        </li>
                                    </ul>
                                    <div className="tab-content">
                                        <div className="tab-pane fade show active" id="tabDescription" role="tabpanel">
                                            <h4>
                                                Course Description
                                            </h4>
                                            {this.state.course !== undefined &&
                                            <p>
                                                {this.state.course.description}
                                            </p>}
                                            <div className="row mt-5">
                                                <div className="col-12">
                                                    <h4>
                                                        What Will I Learn?
                                                    </h4>
                                                </div>
                                                <div className="col-md-6 my-2">
                                                    <ul className="list-unstyled list-style-icon list-icon-check">
                                                        {this.state.course !== undefined &&
                                                        <li>{this.state.course.objectives}</li>
                                                        }</ul>
                                                </div>
                                                <div className="col-md-6 my-2">
                                                    <ul className="list-unstyled list-style-icon list-icon-check">
                                                        <li>Learn how to captivate your audience</li>
                                                    </ul>
                                                </div>
                                                <div className="col-md-6 my-2">
                                                    <h4>
                                                        Course Category
                                                    </h4>
                                                    <ul className="list-unstyled list-style-icon list-icon-bullet">
                                                        <li>Learn how to captivate your audience</li>
                                                        {this.state.course !== undefined &&
                                                        <li>{this.state.course.category}</li>
                                                        }
                                                    </ul>
                                                </div>
                                                <div className="col-md-6 my-2">
                                                    <h4>
                                                        Who is the Target Audience?
                                                    </h4>
                                                    <ul className="list-unstyled list-style-icon list-icon-bullet">
                                                        <li>Learn how to captivate your audience</li>
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
                                                        <img className="iconbox iconbox-xxxl" src="assets/img/262x230/5.jpg" alt="true" />
                                                    </a>
                                                    <div className="media-body ml-md-4 mt-4 mt-md-0">
                                                        {this.state.course !== undefined &&
                                                        <h6>
                                                            {this.state.course.tutorCreator.username}
                                                        </h6>}
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
                                        </div>
                                        <div className="tab-pane fade" id="tabQuiz" role="tabpanel">
                                            <div className="input-group-append">
                                                {this.state.course !== undefined &&
                                                this.state.course.tutorCreator !== undefined &&
                                                this.state.course.tutorCreator._id === this.props.user.user._id &&
                                                <Link to={"/addquiz/"+this.state.course._id}
                                                      className="btn btn-info rounded" type="submit">
                                                    Add a quiz
                                                    <i className="ti-angle-right small"/>
                                                </Link>
                                                }
                                            </div>
                                            {this.state.quiz.map(q=>
                                            {return(
                                                <div className="col-lg-4 col-md-6 marginTop-30">
                                                <div href="page-course-details.html" class="card height-100p text-gray shadow-v1">
                                                    <img class="card-img-top" src="assets/img/360x220/5.jpg" alt=""/>
                                                    <div class="card-body">
                                                        <a href="#" class="h5">
                                                            {q.name}
                                                        </a>
                                                        <p class="my-3">
                                                            <i class="ti-user mr-2"></i>
                                                            Jonathon
                                                        </p>
                                                        <Link to={"/responsequiz/"+q._id+'/'+q.questions[0]._id}
                                                              className="btn btn-success active mr-2 mb-3" type="submit">
                                                            take a quiz
                                                            <i className="ti-angle-right small"/>
                                                        </Link>
                                                    </div>

                                                </div>
                                                </div>
                                            )})}


                                        </div>{/* END tab-pane */}
                                    </div> {/* END tab-content*/}
                                </div> {/* END col-12 */}
                            </div>
                        </div>
                    </div>
                </section>
                    </div></section>
            </div>
        )
    }
}
function mapStateToProps(state) {
    const { authentication } = state;
    const { user } = authentication;
    return {
        user,
       course: state.course
    };
}

const connectedLoginPage = connect(mapStateToProps)(CourseDetail);
export { connectedLoginPage as CourseDetail };
