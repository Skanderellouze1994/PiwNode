import React, {Component} from 'react';
import StepZilla from "react-stepzilla";
import BiographyComponent from "./biographyComponent";
import './main.css';
import PositionComponent from "./positionComponent";
import EducationsComponent from "./educationsComponent";
import {connect} from "react-redux";
import SkillsComponent from "./skillsComponent";
import ViewComponent from "./viewComponent";


class Scrapping extends Component {
    constructor(props) {
        super(props)
        const {linkedin} = this.props.profile
        this.sampleStore = {
            summary: linkedin.summary,
            positions:linkedin.positions,
            educations:linkedin.educations,
            skills:linkedin.skills
            //gender: '',
           // savedToCloud: false
        };
    }

    getStore() {
        return this.sampleStore;
    }

    updateStore(update) {
        console.log(update)
        console.log(this.sampleStore)
        this.sampleStore = {
            ...this.sampleStore,
            ...update,
        }
    }

    render() {

        const steps =
            [
                {
                    name: 'Biography',
                    component: <BiographyComponent getStore={() => (this.getStore())} updateStore={(u) => {
                        this.updateStore(u)
                    }}/>
                },
                {
                    name: 'Experience',
                    component: <PositionComponent getStore={() => (this.getStore())} updateStore={(u) => {
                        this.updateStore(u)
                    }} positions={this.props.profile.linkedin.positions}/>
                },
                {
                    name: 'Education',
                    component: <EducationsComponent getStore={() => (this.getStore())} updateStore={(u) => {
                        this.updateStore(u)
                    }} educations = {this.props.profile.linkedin.educations}/>
                },

                {
                    name: 'Skills',
                    component: <SkillsComponent getStore={() => (this.getStore())} updateStore={(u) => {
                        this.updateStore(u)
                    }} skills={this.props.profile.linkedin.skills}/>
                },
                {
                    name: 'Resume',
                    component: <ViewComponent getStore={() => (this.getStore())} updateStore={(u) => {
                        this.updateStore(u)
                    }}/>
                },
                {
                    name: 'Resume',
                    component: <ViewComponent getStore={() => (this.getStore())} updateStore={(u) => {
                        this.updateStore(u)
                    }}/>
                },
               // {name: 'Step 2', component: <BiographyComponent/>},
               // {name: 'Step 3', component: <BiographyComponent/>},

            ]
        return (
            <div>
                <div className="padding-y-60 bg-cover" data-dark-overlay={6}
                     style={{background: 'url(assets/img/1920/658_2.jpg) no-repeat'}}>
                    <div className="container">
                        <h2 className="text-white">
                            Help &amp; support
                        </h2>
                        <ol className="breadcrumb breadcrumb-double-angle text-white bg-transparent p-0">
                            <li className="breadcrumb-item"><a href="#">Home</a></li>
                            <li className="breadcrumb-item"><a href="#">Page</a></li>
                            <li className="breadcrumb-item">Help &amp; support details</li>
                        </ol>
                    </div>
                </div>

                <section className="paddingTop-50 paddingBottom-100 bg-light">
                    <div className="container">
                        <div className="row justify-content-md-center">
                            <div className="col-md-8 mt-4">
                                <div className="card shadow-v1">

                                    <div className="card-body">
                                        <div className='example'>
                                            <div className='step-progress'>
                                                <StepZilla
                                                    steps={steps}
                                                    preventEnterSubmission={false}
                                                    nextTextOnFinalActionStep={"Save"}
                                                    startAtStep={window.sessionStorage.getItem('step') ? parseFloat(window.sessionStorage.getItem('step')) : 0}
                                                    onStepChange={(step) => window.sessionStorage.setItem('step', step)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* END row*/}
                    </div>
                    {/* END container*/}
                </section>

            </div>
        );
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

const connectedHomePage = connect(mapStateToProps)(Scrapping);
export {connectedHomePage as Scrapping};
