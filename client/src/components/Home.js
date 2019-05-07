import React, {Component} from 'react';
import {Launcher} from 'react-chat-window'
import axios from "axios";
import Artyom from 'artyom.js';

export class Home extends Component {

    constructor() {
        super();
        this.state = {
            messageList: []
        };
    }

    _onMessageWasSent(message) {
        console.log(message)
        this.setState({
            messageList: [...this.state.messageList, message]
        })
        axios.get('http://localhost:4000/chatbot/'+message.data.text).then(res=>{
            const artyom = new Artyom();
            artyom.initialize({
                lang:"en-US",
                debug:true,
                continuous:true,
                listen:false
            });
            artyom.say(res.data)
            console.log(res.data)
            this._sendMessage(res.data)

        })

    }

    _sendMessage(text) {
        if (text.length > 0) {
            this.setState({
                messageList: [...this.state.messageList, {
                    author: 'them',
                    type: 'text',
                    data: { text }
                }]
            })
        }

    }

    render() {
        return (

<div>
                <div className="container">
                    <style>{"\
                .sc-chat-window opened{\
                  height:330;\
                }\
              "}</style>
                </div>
                <div >
                    <Launcher
                        agentProfile={{
                            teamName: 'react-chat-window',
                            imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
                        }}
                        onMessageWasSent={this._onMessageWasSent.bind(this)}
                        messageList={this.state.messageList}
                        showEmoji
                    />
                </div>

    <section className="padding-y-100 border-bottom">
        <div className="container">
            <div className="row align-items-center">
                <div className="col-lg-5 mb-4 mr-auto text-center">
                    <img className="wow fadeInLeft w-100 rounded" src="assets/img/384x320/3.jpg" alt />
                </div>
                <div className="col-lg-6">
                    <h2>
                        <span className="text-primary">Who</span> We Are
                    </h2>
                    <div className="width-4rem height-4 bg-primary rounded mt-4 marginBottom-40" />
                    <p className="mb-5">
                        We are CSMA-JS , a group of 4 web developers , who created this platform with passion and love , just to make it easy for you to learn and teach.
                    </p>
                    <ul className="list-unstyled list-style-icon list-icon-check-circle">
                        <li>
                            Professional and easy to use software
                        </li>
                        <li>
                            Setup and installations takes 30 seconds
                        </li>
                        <li>
                            Perfect for any device with pixel perfect design
                        </li>
                        <li>
                            Setup and installations really really fast
                        </li>
                    </ul>
                </div> {/* END col-lg-6 ml-auto*/}
            </div> {/* END row*/}
        </div> {/* END container*/}
    </section>
    <section className="padding-y-100">
        <div className="container">
            <div className="row align-items-center">
                <div className="col-lg-6">
                    <h2>
                        What We offer
                    </h2>
                    <div className="width-4rem height-4 bg-primary rounded mt-4 marginBottom-40" />
                    <p className="mb-5">
                        An educative plateform that allows you to :
                    </p>
                    <div className="media mb-4">
                        <i className="ti-user text-primary font-size-30 mt-2" />
                        <div className="media-body pl-3">
                            <h4 className="h5">Join A Training Session and participate to all its courses</h4>
                            <p>
                                Nam liber tempor cum soluta nobis eleifend option congue is nihil imper per tem por legere me that doming vulputate.
                            </p>
                        </div>
                    </div>
                    <div className="media mb-4">
                        <i className="ti-basketball text-primary font-size-30 mt-2" />
                        <div className="media-body pl-3">
                            <h4 className="h5">A Productivity Platform</h4>
                            <p>
                                Nam liber tempor cum soluta nobis eleifend option congue is nihil imper per tem por legere me that doming vulputate.
                            </p>
                        </div>
                    </div>
                </div> {/* END col-lg-6 ml-auto*/}
                <div className="col-lg-5 mb-4 mr-auto text-center">
                    <img className="wow fadeInRight w-100 rounded" src="assets/img/360x300/4.jpg" alt />
                </div>
            </div> {/* END row*/}
        </div> {/* END container*/}
    </section>
    <section className="padding-y-100 bg-light-v4">
        <div className="container">
            <div className="row align-items-center">
                <div className="col-12 text-center">
                    <h2>
                        Unique Features
                    </h2>
                    <div className="width-4rem height-4 bg-primary rounded mt-4 marginBottom-40 mx-auto" />
                </div>
                <div className="col-lg-4 col-md-6 marginTop-30 wow fadeInUp" data-wow-delay=".1s">
                    <div className="card height-100p text-center p-4 p-md-5 transition hover:shadow-v3">
                  <span className="iconbox iconbox-lg bg-primary mx-auto">
                    <i className="ti-infinite font-size-24" />
                  </span>
                        <h5 className="my-4">
                            Facial Recognition
                        </h5>
                        <p>
                            With this feature you can simply login using your webcam without any need to type ypur data.
                        </p>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 marginTop-30 wow fadeInUp" data-wow-delay=".2s">
                    <div className="card height-100p text-center p-4 p-md-5 transition hover:shadow-v3">
                  <span className="iconbox iconbox-lg bg-success text-white mx-auto">
                    <i className="ti-cloud font-size-24" />
                  </span>
                        <h5 className="my-4">
                            Real Time Stream
                        </h5>
                        <p>
                            To join a course , a stram is provided to communicate between students and tutor.
                        </p>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 marginTop-30 wow fadeInUp" data-wow-delay=".3s">
                    <div className="card height-100p text-center p-4 p-md-5 transition hover:shadow-v3">
                  <span className="iconbox iconbox-lg bg-danger text-white mx-auto">
                    <i className="ti-world font-size-24" />
                  </span>
                        <h5 className="my-4">
                            Smart And Advanced Profiling
                        </h5>
                        <p>
                            In order to make it easy for you to create your profile , you can simply add your linkedin profile and all your data will be updated in your profile.
                        </p>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 marginTop-30 wow fadeInUp" data-wow-delay=".1s">
                    <div className="card height-100p text-center p-4 p-md-5 transition hover:shadow-v3">
                  <span className="iconbox iconbox-lg bg-info text-white mx-auto">
                    <i className="ti-bell font-size-24" />
                  </span>
                        <h5 className="my-4">
                            Sentiment Analysis
                        </h5>
                        <p>
                            This feature is dedicated to teachers , it provides some statics about the students if they're concentrated or not , in order to ameliorate your course.
                        </p>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 marginTop-30 wow fadeInUp" data-wow-delay=".2s">
                    <div className="card height-100p text-center p-4 p-md-5 transition hover:shadow-v3">
                  <span className="iconbox iconbox-lg bg-warning text-white mx-auto">
                    <i className="ti-support font-size-24" />
                  </span>
                        <h5 className="my-4">
                            Modern Design
                        </h5>
                        <p>
                            Investig ationes demons travg vunt lectores legere lrus quod legunt saepius claritas est.
                        </p>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 marginTop-30 wow fadeInUp" data-wow-delay=".3s">
                    <div className="card height-100p text-center p-4 p-md-5 transition hover:shadow-v3">
                  <span className="iconbox iconbox-lg bg-dark text-white mx-auto">
                    <i className="ti-file font-size-24" />
                  </span>
                        <h5 className="my-4">
                            Extensive Documentation
                        </h5>
                        <p>
                            Investig ationes demons travg vunt lectores legere lrus quod legunt saepius claritas est.
                        </p>
                    </div>
                </div>
            </div> {/* END row*/}
        </div> {/* END container*/}
    </section>
    <section className="padding-y-100 wow fadeIn">
        <div className="container">
            <div className="row">
                <div className="col-12 text-center mb-4">
                    <h2>
                        The Executive Team
                    </h2>
                    <div className="width-4rem height-4 bg-primary rounded mt-4 marginBottom-40 mx-auto" />
                </div>
                <div className="col-lg-6 mt-2 wow fadeInUp">
                    <div className="row">
                        <div className="col-md-6 my-2">
                            <img src="assets/img/avatar/lg/1.jpg" alt />
                        </div>
                        <div className="col-md-6 my-4">
                            <h4 className="mb-0">
                                Chaima Braiek
                            </h4>
                            <p className="text-muted mb-0">
                                Junior Developer
                            </p>
                            <p className="my-4">
                                Nam liber tempor cum soluta nobis eleifend option congue is nihil they imper.
                            </p>
                            <ul className="list-inline">
                                <li className="list-inline-item">
                                    <a href="#" className="btn btn-facebook iconbox iconbox-xs"><i className="ti-facebook" /></a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="#" className="btn btn-twitter iconbox iconbox-xs"><i className="ti-twitter" /></a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="#" className="btn btn-google-plus iconbox iconbox-xs"><i className="ti-google" /></a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="#" className="btn btn-linkedin iconbox iconbox-xs"><i className="ti-linkedin" /></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 mt-2 wow fadeInUp">
                    <div className="row">
                        <div className="col-md-6 my-2">
                            <img src="assets/img/avatar/lg/2.jpg" alt />
                        </div>
                        <div className="col-md-6 my-4">
                            <h4 className="mb-0">
                                Skander Ellouze
                            </h4>
                            <p className="text-muted mb-0">
                                Junior Developer
                            </p>
                            <p className="my-4">
                                Nam liber tempor cum soluta nobis eleifend option congue is nihil they imper.
                            </p>
                            <ul className="list-inline">
                                <li className="list-inline-item">
                                    <a href="#" className="btn btn-facebook iconbox iconbox-xs"><i className="ti-facebook" /></a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="#" className="btn btn-twitter iconbox iconbox-xs"><i className="ti-twitter" /></a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="#" className="btn btn-google-plus iconbox iconbox-xs"><i className="ti-google" /></a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="#" className="btn btn-linkedin iconbox iconbox-xs"><i className="ti-linkedin" /></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 mt-2 wow fadeInUp">
                    <div className="row">
                        <div className="col-md-6 my-2">
                            <img src="assets/img/avatar/lg/3.jpg" alt />
                        </div>
                        <div className="col-md-6 my-4">
                            <h4 className="mb-0">
                                Mohamed Selim Manai
                            </h4>
                            <p className="text-muted mb-0">
                                Junior Developer
                            </p>
                            <p className="my-4">
                                Nam liber tempor cum soluta nobis eleifend option congue is nihil they imper.
                            </p>
                            <ul className="list-inline">
                                <li className="list-inline-item">
                                    <a href="#" className="btn btn-facebook iconbox iconbox-xs"><i className="ti-facebook" /></a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="#" className="btn btn-twitter iconbox iconbox-xs"><i className="ti-twitter" /></a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="#" className="btn btn-google-plus iconbox iconbox-xs"><i className="ti-google" /></a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="#" className="btn btn-linkedin iconbox iconbox-xs"><i className="ti-linkedin" /></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 mt-2 wow fadeInUp">
                    <div className="row">
                        <div className="col-md-6 my-2">
                            <img src="assets/img/avatar/lg/4.jpg" alt />
                        </div>
                        <div className="col-md-6 my-4">
                            <h4 className="mb-0">
                                Achraf Douss
                            </h4>
                            <p className="text-muted mb-0">
                                Creative Developer
                            </p>
                            <p className="my-4">
                                Nam liber tempor cum soluta nobis eleifend option congue is nihil they imper.
                            </p>
                            <ul className="list-inline">
                                <li className="list-inline-item">
                                    <a href="#" className="btn btn-facebook iconbox iconbox-xs"><i className="ti-facebook" /></a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="#" className="btn btn-twitter iconbox iconbox-xs"><i className="ti-twitter" /></a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="#" className="btn btn-google-plus iconbox iconbox-xs"><i className="ti-google" /></a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="#" className="btn btn-linkedin iconbox iconbox-xs"><i className="ti-linkedin" /></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div> {/* END row*/}
        </div> {/* END container*/}
    </section>
    <section className="padding-y-100 bg-light-v2">
        <div className="container">
            <div className="row">
                <div className="col-12 text-center">
                    <h2 className="h1">
                        Why We are the <span className="text-primary">Best</span>
                        <div className="width-4rem height-4 bg-primary rounded mt-4 marginBottom-40 mx-auto" />
                    </h2>
                </div>
                <div className="col-lg-6 mt-4 pr-lg-5">
                    <p className="mb-4">
                        Nam liber tempor cum soluta nobis eleifend option congue is nihil imper  per tem por legere me that doming vulputate velit esse molestie  possim wisi enim ad placerat facer possim assum minim there veniam, nostrud exerci tation ullamcorper quis nostrud.
                    </p>
                    <ul className="list-unstyled list-style-icon list-icon-angle-right">
                        <li>
                            Listen to Social Conversations
                        </li>
                        <li>
                            Performance Analyze
                        </li>
                        <li>
                            A Productivity Platform
                        </li>
                        <li>
                            Work With Any Team
                        </li>
                    </ul>
                </div> {/* END col-lg-6*/}
                <div className="col-md-6 mt-4">
                    <div className="mb-4">
                        <div className="d-flex justify-content-between">
                            <p>HTML &amp; CSS</p>
                            <p>90%</p>
                        </div>
                        <div className="progress" style={{height: '4px'}}>
                            <div className="progress-bar bg-primary" style={{width: '90%'}} role="progressbar" aria-valuenow={90} aria-valuemin={90} aria-valuemax={100} />
                        </div>
                    </div>
                    <div className="mb-4">
                        <div className="d-flex justify-content-between">
                            <p>React angular</p>
                            <p>75%</p>
                        </div>
                        <div className="progress" style={{height: '4px'}}>
                            <div className="progress-bar bg-success" role="progressbar" style={{width: '75%'}} aria-valuenow={75} aria-valuemin={0} aria-valuemax={100} />
                        </div>
                    </div>
                    <div className="mb-4">
                        <div className="d-flex justify-content-between">
                            <p>PHP</p>
                            <p>80%</p>
                        </div>
                        <div className="progress mb-4" style={{height: '4px'}}>
                            <div className="progress-bar bg-info" role="progressbar" style={{width: '80%'}} aria-valuenow={80} aria-valuemin={0} aria-valuemax={100} />
                        </div>
                    </div>
                    <div className="mb-4">
                        <div className="d-flex justify-content-between">
                            <p>Laravel</p>
                            <p>75%</p>
                        </div>
                        <div className="progress mb-4" style={{height: '4px'}}>
                            <div className="progress-bar bg-warning" role="progressbar" style={{width: '75%'}} aria-valuenow={75} aria-valuemin={0} aria-valuemax={100} />
                        </div>
                    </div>
                </div>
            </div> {/* END row*/}
        </div> {/* END container*/}
    </section>
    <section className="padding-y-100 bg-primary wow fadeIn">
        <div className="container">
            <div className="row">
                <div className="col-12 text-center mb-5">
                    <h4 className="text-white">
                        What Our People Say
                    </h4>
                </div>
                <div className="col-lg-10 mx-auto">
                    <div className="owl-carousel dots-white" data-items={1} data-space={30} data-dots="true" data-autoplay="false">
                        <div className="card card-body p-lg-5 text-center">
                            <img className="iconbox iconbox-xxxl mx-auto z-index-10" src="assets/img/avatar/4.jpg" alt />
                            <div className="my-4">
                                <h6>
                                    Kenelia Deshmukh
                                </h6>
                                <p className="text-gray mb-0">
                                    Creative Director
                                </p>
                            </div>
                            <p className="mb-0 lead text-dark">
                                Nam liber tempor cum soluta nobis eleifend option congue is nihil imper per tem por legere me doming vulputate velit esse molestie possim. Ut wisi enim ad placerat facer Ut wisi enim ad placerat facer.
                            </p>
                        </div>
                        <div className="card card-body p-lg-5 text-center">
                            <img className="iconbox iconbox-xxxl mx-auto z-index-10" src="assets/img/avatar/5.jpg" alt />
                            <div className="my-4">
                                <h6>
                                    Kenelia Deshmukh
                                </h6>
                                <p className="text-gray mb-0">
                                    Creative Director
                                </p>
                            </div>
                            <p className="mb-0 lead text-dark">
                                Nam liber tempor cum soluta nobis eleifend option congue is nihil imper per tem por legere me doming vulputate velit esse molestie possim. Ut wisi enim ad placerat facer Ut wisi enim ad placerat facer.
                            </p>
                        </div>
                        <div className="card card-body p-lg-5 text-center">
                            <img className="iconbox iconbox-xxxl mx-auto z-index-10" src="assets/img/avatar/6.jpg" alt />
                            <div className="my-4">
                                <h6>
                                    Ema Watson
                                </h6>
                                <p className="text-gray mb-0">
                                    Creative Director
                                </p>
                            </div>
                            <p className="mb-0 lead text-dark">
                                Nam liber tempor cum soluta nobis eleifend option congue is nihil imper per tem por legere me doming vulputate velit esse molestie possim. Ut wisi enim ad placerat facer Ut wisi enim ad placerat facer.
                            </p>
                        </div>
                    </div>
                </div> {/* END col-12 */}
            </div>  {/* END row*/}
        </div> {/* END container*/}
    </section>

</div>
        )
    }
}
