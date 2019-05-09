import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link, Router} from "react-router-dom";
import {Tab, TabList, TabPanel, Tabs} from "react-context-tabs";
import {UpdateProfile} from "./updateProfile";
import {About} from "./about";
import {profileAction} from "../../_actions/profile.actions";
import SkillBar from 'react-skillbars';
import {ElementCallToAction} from "./ElementCallToAction";
import costum from "./costum.css";
import {MonthPicker, YearPicker} from "react-dropdown-date";
import Modal from "react-responsive-modal";
import Webcam from "react-webcam";
import axios from "axios"


class Profil extends Component {
    constructor(props) {
        super(props)
        this.state={
            profile:this.props.profile.profile,
            open: false,

        }
    }
    onOpenModal = () => {
        this.setState({open: true});
        setTimeout(()=>{

        },3000)
    };

    onCloseModal = () => {
        this.setState({open: false});
    };
    componentWillMount() {
        const {dispatch} = this.props;
        const {profile} = this.props;
        const {user} = this.props;
        console.log(profile.loaded)

if(!profile.loaded) {
    dispatch(profileAction.getProfile(user.user.profile))
}
    }

    setRef = webcam => {
        this.webcam = webcam;
    };

    capture = () => {
        const imageSrc = this.webcam.getScreenshot();
        const formData = new FormData();
        formData.append('image', imageSrc);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post('/facial/addface/'+this.props.user.user._id,formData).then(res=>this.onCloseModal()).catch(res=>console.log(res))


    };
    render() {
        const {user} = this.props;
        const {profile} = this.props;
        var skills = null;
        const SKILLS = [
            {
                "type": "Java",
                "level": 100
            },
            {
                "type": "React",
                "level": 85
            },]
        if(profile.loaded){
            console.log()

            skills =<SkillBar height={16} skills={profile.profile.skills.map(a=>{return{type:a.title,level:a.count}})} />;
        }

        return (

            <div>
                <ElementCallToAction/>
                <Modal open={this.state.open} onClose={this.onCloseModal} center>
                    <div style={{width: 700}}>
                        <div className="modal-header">
                            <h5 className="modal-title">Activate facial recognition</h5>

                        </div>
                        <Webcam
                            audio={false}
                            ref={this.setRef}
                            screenshotFormat="image/jpeg"
                        />
                            <div className="modal-footer py-4">
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                                <button type="button" type="submit" className="btn btn-success" onClick={this.capture}>take a picture</button>
                            </div>

                    </div>
                </Modal>
                <div className="padding-y-80 bg-cover" data-dark-overlay={6}
                     style={{background: 'url(assets/img/breadcrumb-bg.jpg) no-repeat'}}>
                    <div className="container">
                        <h2 className="text-white">
                            My profile
                        </h2>
                        <ol className="breadcrumb breadcrumb-double-angle text-white bg-transparent p-0">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item"> My profile</li>
                        </ol>
                    </div>
                </div>
                <section className="paddingTop-50 paddingBottom-120 bg-light">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4 mt-4">
                                <div className="card shadow-v1">
                                    <div className="card-header text-center border-bottom pt-5 mb-4">
                                        <img alt="aaa" className="rounded-circle mb-4"
                                             src={user.user.profile_photo ? user.user.profile_photo : "assets/img/person.png"}
                                             width={200} height={200}/>
                                        <h4>
                                            {user.user.name}
                                        </h4>
                                        <p>
                                            Web Developer and Instructor
                                        </p>
                                        <ul className="list-inline mb-0">
                                            <li className="list-inline-item m-2">
                                                <button className="btn btn-outline-success btn-sm mr-3 mb-3" onClick={this.onOpenModal}>
                                                    Activate facial-recognition
                                                </button>
                                            </li>

                                        </ul>
                                    </div>
                                    <div className="card-body border-bottom">
                                        <ul className="list-unstyled">
                                            <li className="mb-3">
                                                <span className="d-block">Email address:</span>
                                                <Link to="" className="h6"
                                                      href="mailto:saifullah@gmail.com">{user.user.email}</Link>
                                            </li>
                                            <li className="mb-3">
                                                <span className="d-block">Phone:</span>
                                                <Link to="/" className="h6"
                                                      href="mailto:saifullah@gmail.com">{user.user.tel}</Link>
                                            </li>
                                            <li className="mb-3">
                                                <span className="d-block">Location:</span>
                                                <Link to="/" className="h6"
                                                      href="mailto:saifullah@gmail.com">{user.user.address}</Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="card-body border-bottom">
                                        {skills}
                                    </div>
                                    <div className="card-footer">
                                        <p>
                                            Social Profile:
                                        </p>
                                        <ul className="list-inline mb-0">
                                            {user.user.facebook_url&&<li className="list-inline-item">
                                                <Link to={()=>window.location(user.user.facebook_url)} className="btn btn-outline-facebook iconbox iconbox-sm">
                                                    <i className="ti-facebook"/>
                                                </Link>
                                            </li>}
                                            {user.user.linkedin_url&&<li className="list-inline-item">
                                                <Link to={user.user.linkedin_url} className="btn btn-outline-twitter iconbox iconbox-sm">
                                                    <i className="ti-linkedin"/>
                                                </Link>
                                            </li>}
                                            {user.user.github_url&&<li className="list-inline-item">
                                                <Link to={user.user.github_url} className="btn btn-outline-google-plus iconbox iconbox-sm">
                                                    <i className="ti-github"/>
                                                </Link>
                                            </li>}

                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/* END col-md-4 */}
                            <div className="col-lg-8 mt-4">
                                <div className="card shadow-v1 padding-30">
                                    <Tabs defaultTabId="about">
                                        <TabList>
                                            <ul className="nav tab-line tab-line border-bottom mb-4" role="tablist">
                                                <li className="nav-item">
                                                    <Tab tabId="about">
                                                        <Link to="/" className="nav-link active" data-toggle="tab"

                                                              role="tab" aria-selected="true">
                                                            About
                                                        </Link>
                                                    </Tab>
                                                </li>
                                                <li className="nav-item">
                                                    <Link to="/" className="nav-link" data-toggle="tab"
                                                          role="tab" aria-selected="true">
                                                        Courses
                                                    </Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link to="/" className="nav-link" data-toggle="tab"
                                                          role="tab" aria-selected="true">
                                                        Reviews
                                                    </Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link to="/" className="nav-link" data-toggle="tab"
                                                          role="tab" aria-selected="true">
                                                        Message
                                                    </Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Tab tabId="settings">
                                                    <Link to="" className="nav-link" data-toggle="tab" role="tab"
                                                          aria-selected="true">
                                                        Settings
                                                    </Link>
                                                    </Tab>
                                                </li>
                                            </ul>
                                        </TabList>
                                        <div className="tab-content">
                                            <TabPanel tabId="about">
                                                <About/>
                                            </TabPanel>
                                            <TabPanel tabId="settings">

                                                    <UpdateProfile/>

                                            </TabPanel>

                                            {/* END tab-pane */}
                                        </div>
                                        {/* END tab-content*/}
                                    </Tabs>
                                </div>
                                {/* END card*/}
                            </div>
                            {/* END col-md-8 */}
                        </div>
                        {/*END row*/}
                    </div>
                    {/*END container*/}
                </section>
            </div>

        )
    }

}

function mapStateToProps(state) {
    const {users, authentication,profile} = state;
    const {user} = authentication;
    return {
        user,
        users,
        profile
    };
}

const connectedHomePage = connect(mapStateToProps)(Profil);
export {connectedHomePage as Profil};
