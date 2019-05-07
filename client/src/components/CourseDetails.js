import React, {Component} from "react";
import connect from "react-redux/es/connect/connect";
import axios from "axios";
import {Link} from "react-router-dom";
import {
    FacebookShareCount,
    GooglePlusShareCount,
    LinkedinShareCount,
    PinterestShareCount,

    FacebookShareButton,
    GooglePlusShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    WorkplaceShareButton,
    PinterestShareButton,
    WhatsappShareButton,

    FacebookIcon,
    TwitterIcon,
    GooglePlusIcon,
    LinkedinIcon,
    WorkplaceIcon,
    PinterestIcon,
    WhatsappIcon,
} from 'react-share';
import Artyom from 'artyom.js';
import CanvasJSReact from '../charts/canvasjs.react';
import {Pie} from 'react-chartjs-2';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var dateFormat = require('dateformat');

class CourseDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            quiz: [],
            course: {},
            presenceList: [],
            score: []
        };
    }

    componentDidMount() {
        axios
            .get(`/trainingSession/get/course/${this.props.match.params.id}`)
            .then(response => {
                this.setState({course: response.data});
                console.log(response.data);
            });

        axios
            .get(`/quiz`)
            .then(response => {
                this.setState({quiz: response.data});
                console.log(response.data);
            })

                // get presence list and the sentiment results
                axios
                    .get(`/trainingSession/get/course/presence/${this.props.match.params.id}`)
                    .then(response => {
                        this.setState({ presenceList: response.data });
                        console.log(response.data);
                        response.data.map(student=>(
                            axios
                                .post(`/trainingSession/sentiment/${student._id}`)
                                .then(res => {
                                    this.setState({ score: this.state.score.concat(res.data) });
                                    console.log(res.data);
                                }),
                                axios
                                    .post(`/trainingSession/sentiment/chat/${this.state.course.chatroom}/${student._id}`)
                                    .then(res => {
                                        this.setState({ score: this.state.score.concat(res.data) });
                                        console.log(res.data);
                                    })
                        ))
                    });

        /* const artyom = new Artyom();
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
         };*/

    }

    render() {
        const url = window.location.href;
        console.log(this.state.score);
        // Get scores and compare them a
        let positive = 0;
        let medium = 0;
        let negative = 0;
        this.state.score.map(score => {
            if(score >5){positive=positive+score}
            else if(score<=5 && score>=-5) medium=medium+score
                else negative=negative+score
        });
        /////
        const data = {
            labels: [
                'Not satisfied',
                'Satisfied',
                'So Satisfied'
            ],
            datasets: [{
                data: [negative,medium,positive],
                backgroundColor: [
                    '#FF6384',
                    '#FFCE56',
                    '#36A2EB'
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#FFCE56',
                    '#36A2EB'
                ]
            }]
        };
        const options2 = {
            animationEnabled: true,
            exportEnabled: true,
            theme: "light1", // "light1", "dark1", "dark2"
            title:{
                text: "Students' presence during this course"
            },

            data: [{
                type: "pie",
                indexLabel: "{label}: {y}",
                startAngle: -90,
                dataPoints: [
                    { y: this.state.presenceList.length, label: "Present Students" },
                    { y: 24, label: "Absent Students" }
                ]
            }]
        };
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
                                    <li className="list-inline-item">Share <span
                                        className="d-none d-md-inline-block">this course:</span></li>
                                    <li className="list-inline-item mx-0">
                                        <a className="btn btn-opacity-primary iconbox iconbox-xs">
                                            <FacebookShareButton
                                                url="http://github.com/Skanderellouze1994/PiwNode"
                                                quote={url}
                                            >
                                                <FacebookIcon
                                                    size={32}
                                                    round/>
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
                                                    round/>
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
                                                    round/>
                                            </LinkedinShareButton>
                                        </a>
                                    </li>
                                    <li className="list-inline-item mx-0">
                                        <a className="btn btn-opacity-primary iconbox iconbox-xs">
                                            <GooglePlusShareButton
                                                url="http://github.com/Skanderellouze1994/PiwNode">
                                                <GooglePlusIcon
                                                    size={32}
                                                    round/>
                                            </GooglePlusShareButton>
                                        </a>
                                    </li>
                                    <li className="list-inline-item mx-0">
                                        <a className="btn btn-opacity-primary iconbox iconbox-xs">
                                            <WorkplaceShareButton
                                                url="http://github.com/Skanderellouze1994/PiwNode">
                                                <WorkplaceIcon
                                                    size={32}
                                                    round />
                                            </WorkplaceShareButton>
                                        </a>
                                    </li>
                                    <li className="list-inline-item mx-0">
                                        <a className="btn btn-opacity-primary iconbox iconbox-xs">
                                            <WhatsappShareButton
                                                url="http://github.com/Skanderellouze1994/PiwNode">
                                                <WhatsappIcon
                                                    size={32}
                                                    round />
                                            </WhatsappShareButton>
                                        </a>
                                    </li>
                                </ul>
                                <a href="#" className="btn btn-white iconbox"><i className="ti-heart"/></a>
                            </div>
                        </div>
                        {/* END row*/}
                    </div>
                </section>
                <section className="paddingBottom-100">
                    <div className="container">
                        <div className="col-lg-9">
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
                                        <img className="iconbox mr-3" src="assets/img/avatar/4.jpg" alt="true"/>
                                        <div className="media-body">
                                            <span className="text-gray d-block">Instructor:</span>
                                            {this.state.course !== undefined && this.state.course.tutorCreator !== undefined &&
                                            <a href="#" className="h6">{this.state.course.tutorCreator.username}</a>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6 my-2">
                                    <div className="border-right height-100p">
                                        <span className="text-gray d-block">Categories:</span>
                                        <a className="h6">{this.state.course !== undefined && this.state.course.category}</a>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6 my-2">
                                    <div className="border-right height-100p">
                                        <span className="text-gray d-block">Start Date:</span>
                                        <a className="h6">{this.state.course !== undefined &&
                                        dateFormat(this.state.course.startDate, "dddd, mmmm dS, yyyy, h:MM:ss TT")}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <section className="padding-y border-bottom border-light">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-9 marginTop-30">
                                        <div className="col-12 mt-4">
                                            <ul className="nav tab-line tab-line tab-line--3x border-bottom mb-5"
                                                role="tablist">
                                                <li className="nav-item">
                                                    <a className="nav-link active" data-toggle="tab"
                                                       href="#tabDescription" role="tab" aria-selected="true">
                                                        Description
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" data-toggle="tab" href="#tabInstructors"
                                                       role="tab" aria-selected="true">
                                                        Instructors
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    {this.state.course !== undefined &&
                                                    this.state.course.tutorCreator !== undefined &&
                                                    this.state.course.tutorCreator._id === this.props.user.user._id &&
                                                    <a className="nav-link" data-toggle="tab" href="#tabStatics"
                                                       role="tab" aria-selected="true">
                                                        Statics
                                                    </a>
                                                    }
                                                </li>
                                                <li className="nav-item">
                                                    {this.state.course !== undefined &&
                                                    this.state.course.tutorCreator !== undefined &&
                                                    this.state.course.tutorCreator._id === this.props.user.user._id &&
                                                    <a className="nav-link" data-toggle="tab" href="#tabList"
                                                       role="tab" aria-selected="true">
                                                        Presence List
                                                    </a>
                                                    }
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" data-toggle="tab" href="#tabRessources"
                                                       role="tab" aria-selected="true">
                                                        Ressources
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" data-toggle="tab" href="#tabQuiz"
                                                       role="tab" aria-selected="true">
                                                        Quiz
                                                    </a>
                                                </li>
                                            </ul>
                                            <div className="tab-content">
                                                <div className="tab-pane fade show active" id="tabDescription"
                                                     role="tabpanel">
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
                                                            <h4>
                                                                Course Start Date and Time
                                                            </h4>
                                                            <ul className="list-unstyled list-style-icon list-icon-check">
                                                                <li>{this.state.course !== undefined &&
                                                                dateFormat(this.state.course.startDate, "dddd, mmmm dS, yyyy, h:MM:ss TT")}</li>
                                                            </ul>
                                                        </div>
                                                        <div className="col-md-6 my-2">
                                                            <h4>
                                                                Course Category
                                                            </h4>
                                                            <ul className="list-unstyled list-style-icon list-icon-bullet">
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
                                                                <li>All students registered in Professor Robot !
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    {/* END row*/}
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
                                                                     src="assets/img/262x230/5.jpg" alt="true"/>
                                                            </a>
                                                            <div className="media-body ml-md-4 mt-4 mt-md-0">
                                                                {this.state.course !== undefined &&
                                                                <h6>
                                                                    {this.state.course.tutorCreator !== undefined &&this.state.course.tutorCreator.username}
                                                                </h6>}
                                                                <p className="mb-2">
                                                                    <i className="ti-world mr-2"/> Web Developer and
                                                                    Instructor
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
                                                                <a href="#"
                                                                   className="btn btn-outline-primary btn-pill btn-sm">View
                                                                    Profile</a>
                                                            </div>
                                                        </div>
                                                        <h6>
                                                            Experience as Web Developer
                                                        </h6>
                                                        <p>
                                                            Investig ationes demons travge vunt lectores legee lrus
                                                            quodk legunt saepius claritas est conctetur adip sicing.
                                                            Dummy text of the printing and typesetting industry.
                                                            Lorem Ipsum has been the industry standad dummy text
                                                            ever since the 1500s, when an unknown printer took a
                                                            galley of type and scrambled it make type specimen book.
                                                            It has survived not only five centuries.
                                                        </p>
                                                    </div>

                                                </div>
                                                <div className="tab-pane fade" id="tabQuiz" role="tabpanel">
                                                    <div className="input-group-append">
                                                        {this.state.course !== undefined &&
                                                        this.state.course.tutorCreator !== undefined &&
                                                        this.state.course.tutorCreator._id === this.props.user.user._id &&
                                                        <Link to={"/addquiz/" + this.state.course._id}
                                                              className="btn btn-info rounded" type="submit">
                                                            Add a quiz
                                                            <i className="ti-angle-right small"/>
                                                        </Link>
                                                        }
                                                    </div>
                                                    {this.state.quiz.map(q => {
                                                        return (
                                                            <div className="col-lg-4 col-md-6 marginTop-30">
                                                                <div href="page-course-details.html"
                                                                     class="card height-100p text-gray shadow-v1">
                                                                    <img class="card-img-top"
                                                                         src="assets/img/360x220/5.jpg" alt=""/>
                                                                    <div class="card-body">
                                                                        <a href="#" class="h5">
                                                                            {q.name}
                                                                        </a>
                                                                        <p class="my-3">
                                                                            <i class="ti-user mr-2"></i>
                                                                            Jonathon
                                                                        </p>
                                                                        <Link
                                                                            to={"/responsequiz/" + q._id + '/' + q.questions[0]._id}
                                                                            className="btn btn-success active mr-2 mb-3"
                                                                            type="submit">
                                                                            take a quiz
                                                                            <i className="ti-angle-right small"/>
                                                                        </Link>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        )
                                                    })}


                                                </div>
                                                {/* END tab-pane */}


                                            <div className="tab-pane fade " id="tabStatics" role="tabpanel">
                                                <h4>
                                                    Students' Satisfaction
                                                </h4>
                                                <p>The statics here shows if your students are satisfied or not during your course .</p>
                                                <p>The scores bellow are calculated from the informations we collect from your students chat messages and posts and responses.</p>
                                                <Pie data={data} />
                                            </div>
                                            <div className="tab-pane fade " id="tabList" role="tabpanel">
                                                <div className="row">
                                                    <div className="col-lg-6 my-4">
                                                        <h6 className="mb-2">Presence List</h6>
                                                        <ul className="list-group">
                                                            {this.state.presenceList.map(student => (
                                                                <li className="list-group-item d-flex align-items-center">
                                                                    <img className="iconbox iconbox-sm"
                                                                         src="assets/img/avatar/4.jpg" alt/>
                                                                    <span className="media-body ml-3">
                                                                <Link href="#">{student.username}</Link>
                                                        </span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                    <div >
                                                        <CanvasJSChart options={options2}
                                                            /* onRef={ref => this.chart = ref} */
                                                        />
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
                </section>
            </div>
        )
    }
}

function

mapStateToProps(state) {
    const {authentication} = state;
    const {user} = authentication;
    return {
        user,
        course: state.course
    };
}

const
    connectedLoginPage = connect(mapStateToProps)(CourseDetail);
export {
    connectedLoginPage
        as
            CourseDetail
};
