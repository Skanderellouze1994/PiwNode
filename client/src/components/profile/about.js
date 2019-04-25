import React, {Component} from 'react';
import {connect} from "react-redux";
import {Experience} from "./experience";
import {Education} from "./education";
import Modal from 'react-responsive-modal';
import {MonthPicker, YearPicker} from "react-dropdown-date";
import costum from './costum.css'
import {profileAction, userActions} from "../../_actions";
import SimpleReactValidator from "simple-react-validator";

const month = ["janv.", "févr.", "mars", "avril.", 'mai', "juin", "juil.", "août", "sept.", "oct.", "nov.", ".dec"]

class About extends Component {
    constructor(props) {
        super(props)
        //console.log(this.props.profile)
        this.validator = new SimpleReactValidator(
            {
                element: message => <div className="alert text-danger bg-danger-0_1 px-4 py-3" role="alert">
                    {message}
                </div>
            }
        );
        this.validatorBiography = new SimpleReactValidator(
            {
                element: message => <div className="alert text-danger bg-danger-0_1 px-4 py-3" role="alert">
                    {message}
                </div>
            }
        );
        this.validatorEducation = new SimpleReactValidator(
            {
                element: message => <div className="alert text-danger bg-danger-0_1 px-4 py-3" role="alert">
                    {message}
                </div>
            }
        );
        this.state = {
            position: [],
            open: false,
            openBiography: false,
            openEducation: false,
            profile:
            this.props.profile.profile,

            pos: {
                title: '',
                yeardate1: '',
                yeardate2: '',
                monthdate1: '',
                monthdate2: '',
                companyName: '',
                description: ''
            }, education: {
                title: '',
                date1: '',
                date2: '',
                degree: '',
                description: ''
            }

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeBiography = this.handleChangeBiography.bind(this);
        this.handleSubmitBiography = this.handleSubmitBiography.bind(this);
        this.handleChangeEducation = this.handleChangeEducation.bind(this);
        this.handleSubmitEducation = this.handleSubmitEducation.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({submitted: true});
        const {pos} = this.state;
        const {dispatch, profile} = this.props;
        if (this.validator.allValid()) {
            const position = {
                title: pos.title,
                companyName: pos.companyName,
                date1: month[pos.monthdate1] + " " + pos.yeardate1 + " - " + month[pos.monthdate2] + " " + pos.yeardate2,
                date2: (pos.date2 - pos.date1) === 0 ? (pos.yeardate2 - pos.yeardate1 + " ans") : pos.monthdate2 - pos.monthdate1 + " mois",
                description: pos.description
            }
            // console.log(position)
            dispatch(profileAction.addPosition(profile.profile._id, position));
            this.setState({open: false})

        } else {
            this.validator.showMessages();
            // rerender to show messages for the first time
            this.forceUpdate();
        }
    }

    handleChange(event) {
        const {name, value} = event.target;
        const {pos} = this.state;
        //console.log(user);
        this.setState({
            pos: {
                ...pos,
                [name]: value
            },


        });
    }

    handleSubmitBiography(event) {
        event.preventDefault();

        this.setState({submittedBiography: true});
        const {pos} = this.state;
        const {dispatch, profile} = this.props;
        if (this.validatorBiography.allValid()) {

            // console.log(this.state.profile.profile)
            dispatch(profileAction.updateProfile({
                ...this.props.profile.profile,
                summary: this.state.profile.summary
            }));
            this.setState({openBiography: false})

        } else {
            this.validatorBiography.showMessages();
            // rerender to show messages for the first time
            this.forceUpdate();
        }
    }

    handleChangeBiography(event) {
        const {name, value} = event.target;
        const {profile} = this.state;
        //console.log(this.props.profile.profile);
        this.setState({
            profile: {
                ...profile,
                [name]: value
            },


        });
    }

    handleSubmitEducation(event) {
        event.preventDefault();

        this.setState({submittedEducation: true});
        const {education} = this.state;
        const {dispatch, profile} = this.props;
        console.log(education)
        if (this.validatorEducation.allValid()) {

            const edu = {
                title: education.title,
                degree: education.degree,
                date1: education.date1 + " - " + education.date2,
                date2: education.date2 - education.date1 + " ans",
                description: education.description
            }
            //console.log(position)
            dispatch(profileAction.addEducation(profile.profile._id, edu));
            this.setState({openEducation: false})

        } else {
            this.validatorEducation.showMessages();
            // rerender to show messages for the first time
            this.forceUpdate();
        }
    }

    handleChangeEducation(event) {
        const {name, value} = event.target;
        const {education} = this.state;
        console.log(education);
        this.setState({
            education: {
                ...education,
                [name]: value
            },


        });
    }

    onOpenModal = () => {
        this.setState({open: true});
    };

    onCloseModal = () => {
        this.setState({open: false});
    };
    onOpenModalBiography = () => {
        this.setState({openBiography: true});
    };

    onCloseModalBiography = () => {
        this.setState({openBiography: false});
    };
    onOpenModalEducation = () => {
        this.setState({openEducation: true});
    };

    onCloseModalEducation = () => {
        this.setState({openEducation: false});
    };

    render() {
        const {open} = this.state;
        const {profile} = this.props
        // console.log(profile.loaded)
        const loading = (this.props.profile.position && !this.props.profile.position.length);
        console.log(this.props.profile.profile.position.length > 0)
        var experience = null;
        var education = null;
        if (profile.loaded && profile.profile.position.length > 0) {
            experience = profile.profile.position.map(e => {
                return (<Experience e={e} id={profile.profile._id}/>)
            })
        }
        if (profile.loaded && profile.profile.education.length > 0) {
            console.log(profile)
            education = profile.profile.education.map(e => {
                return (<Education e={e} id={profile.profile._id}/>)
            })
        }
        return (

            <div className="tab-pane fade active show" id="Tabs_1-1" role="tabpanel">
                <div style={{display: 'flex', justifyContent: 'space-between'}}><h4 className="mb-4">
                    Biography
                </h4>
                    <button className="btn btn-outline-success btn-sm mr-3 mb-3"
                            onClick={this.onOpenModalBiography}>Update
                        biography
                    </button>
                </div>
                {profile.profile.summary ? <p>{profile.profile.summary}</p> :
                    <button className="btn" onClick={this.onOpenModalBiography}>Add a summary</button>}

                <hr className="my-4"/>
                <div className="border-bottom mb-4 pb-4">
                    <div style={{display: 'flex', justifyContent: 'space-between'}}><h4 className="mb-4">
                        Experience
                    </h4>
                        <button className="btn btn-outline-success btn-sm mr-3 mb-3" onClick={this.onOpenModal}>Add
                            experience
                        </button>
                    </div>
                    <ul className="ec-timeline-portlet list-unstyled bullet-line-list">
                        {profile.profile.position.length > 0 ? experience : <p>Please add your experiences</p>}

                    </ul>
                </div>
                <div className="mb-4">
                    <div style={{display: 'flex', justifyContent: 'space-between'}}><h4 className="mb-4">
                        Education
                    </h4>
                        <button className="btn btn-outline-success btn-sm mr-3 mb-3"
                                onClick={this.onOpenModalEducation}>Add
                            education
                        </button>
                    </div>
                    <ul className="ec-timeline-portlet list-unstyled bullet-line-list">
                        {profile.profile.education.length > 0 ? education : <p>Please add your Educations</p>}

                    </ul>
                </div>
                <Modal classNames={costum} open={open} onClose={this.onCloseModal} center>
                    <div style={{width: 700}}>
                        <div className="modal-header">
                            <h5 className="modal-title">Add experience</h5>

                        </div>
                        <form onSubmit={this.handleSubmit} name="form">
                            <div className="modal-body py-4">
                                <div className="col-12 mx-auto">
                                    <div className="row form-group">
                                        <label htmlFor="example-text-input"
                                               className="col-2 col-form-label text-right">Title
                                            Name</label>
                                        <div className="col-10">
                                            <input name="title" className="form-control" type="text"
                                                   value={this.state.pos.title} id="example-text-input"
                                                   onChange={this.handleChange}/>

                                            {this.validator.message('title', this.state.pos.title, 'required')}
                                        </div>
                                    </div>
                                    <div className="row form-group">
                                        <label htmlFor="example-text-input"
                                               className="col-2 col-form-label text-right">Company
                                            Name</label>
                                        <div className="col-10">
                                            <input name="companyName" className="form-control" type="text"
                                                   value={this.state.pos.companyName} id="example-text-input"
                                                   onChange={this.handleChange}/>

                                            {this.validator.message('companyName', this.state.pos.companyName, 'required')}
                                        </div>
                                    </div>

                                </div>
                                <div className="col-12 mx-auto">
                                    <div className="row form-group">
                                        <label htmlFor="example-text-input"
                                               className="col-2 col-form-label text-right">Start</label>
                                        <div className="col-10">
                                            <div className="row col-10">
                                                <MonthPicker
                                                    defaultValue={'month'}
                                                    // to get months as numbers

                                                    // default is full name
                                                    short
                                                    // default is Titlecase

                                                    // mandatory if end={} is given in YearPicker
                                                    endYearGiven
                                                    // mandatory
                                                    year={this.state.pos.monthdate1}
                                                    // default is false

                                                    // mandatory
                                                    value={this.state.pos.monthdate1}
                                                    // mandatory
                                                    onChange={(month) => {
                                                        const {pos} = this.state
                                                        this.setState({
                                                            pos: {
                                                                ...pos,
                                                                monthdate1: month
                                                            }
                                                        });
                                                        console.log(month);
                                                    }}
                                                    id={'example-text-input'}
                                                    name={'monthdate1'}
                                                    classes={'form-control col-3'}
                                                    optionClasses={'option classes'}
                                                />
                                                {this.validator.message('monthdate1', this.state.pos.monthdate1, 'required')}

                                                <YearPicker

                                                    defaultValue={'year'}
                                                    // default is 1900

                                                    // default is current year

                                                    // default is ASCENDING
                                                    reverse
                                                    // default is false
                                                    // default is false
                                                    // mandatory
                                                    value={this.state.pos.yeardate1}
                                                    // mandatory
                                                    onChange={(year) => {
                                                        const {pos} = this.state
                                                        this.setState({
                                                            pos: {
                                                                ...pos,
                                                                yeardate1: year

                                                            }
                                                        });
                                                        //console.log(year);
                                                    }}
                                                    id={'example-text-input'}
                                                    name={'yeardate1'}
                                                    classes={'form-control col-3'}
                                                    optionClasses={'option classes'}
                                                />
                                                {this.validator.message('date1', this.state.pos.yeardate1, 'required')}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row form-group">
                                        <label htmlFor="example-search-input"
                                               className="col-2 col-form-label text-right">End</label>
                                        <div className="col-10">
                                            <div className="row col-10">
                                                <MonthPicker
                                                    defaultValue={'month'}
                                                    // to get months as numbers

                                                    // default is full name
                                                    short
                                                    // default is Titlecase

                                                    // mandatory if end={} is given in YearPicker
                                                    endYearGiven
                                                    // mandatory
                                                    year={this.state.pos.monthdate2}
                                                    // default is false

                                                    // mandatory
                                                    value={this.state.pos.monthdate2}
                                                    // mandatory
                                                    onChange={(month) => {
                                                        const {pos} = this.state
                                                        this.setState({
                                                            pos: {
                                                                ...pos,
                                                                monthdate2: month
                                                            }
                                                        });
                                                        console.log(month);
                                                    }}
                                                    id={'example-text-input'}
                                                    name={'monthdate1'}
                                                    classes={'form-control col-3'}
                                                    optionClasses={'option classes'}
                                                />
                                                {this.validator.message('monthdate2', this.state.pos.monthdate2, 'required')}

                                                <YearPicker

                                                    defaultValue={'year'}
                                                    // default is 1900

                                                    // default is current year
                                                    start={this.state.pos.yeardate1}
                                                    // default is ASCENDING
                                                    reverse
                                                    // default is false
                                                    // default is false
                                                    // mandatory
                                                    value={this.state.pos.yeardate2}
                                                    // mandatory
                                                    onChange={(year) => {
                                                        const {pos} = this.state
                                                        this.setState({
                                                            pos: {
                                                                ...pos,
                                                                yeardate2: year

                                                            }
                                                        });
                                                        //console.log(year);
                                                    }}
                                                    id={'example-text-input'}
                                                    name={'year'}
                                                    classes={'form-control col-3'}
                                                    optionClasses={'option classes'}
                                                />
                                                {this.validator.message('date2', this.state.pos.yeardate2, 'required')}

                                            </div>
                                        </div>
                                    </div>

                                    <div className="row form-group">
                                        <label htmlFor="example-textarea"
                                               className="col-2 col-form-label text-right">Description</label>
                                        <div className="col-10">
                                                <textarea className="form-control" value={this.state.pos.description}
                                                          rows={5} name="description" onChange={this.handleChange}/>
                                            {this.validator.message('description', this.state.pos.description, 'required')}
                                        </div>
                                    </div>


                                </div>

                            </div>
                            <div className="modal-footer py-4">
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                                <button type="button" type="submit" className="btn btn-success">Save changes
                                </button>
                            </div>
                        </form>
                    </div>
                </Modal>
                <Modal classNames={costum} open={this.state.openEducation} onClose={this.onCloseModalEducation} center>
                    <div style={{width: 700}}>
                        <div className="modal-header">
                            <h5 className="modal-title">Add education</h5>

                        </div>
                        <form onSubmit={this.handleSubmitEducation} name="form">
                            <div className="modal-body py-4">
                                <div className="col-12 mx-auto">
                                    <div className="row form-group">
                                        <label htmlFor="example-text-input"
                                               className="col-2 col-form-label text-right">Title
                                        </label>
                                        <div className="col-10">
                                            <input name="title" className="form-control" type="text"
                                                   value={this.state.education.title} id="example-text-input"
                                                   onChange={this.handleChangeEducation}/>

                                            {this.validatorEducation.message('title', this.state.education.title, 'required')}
                                        </div>
                                    </div>
                                    <div className="row form-group">
                                        <label htmlFor="example-text-input"
                                               className="col-2 col-form-label text-right">Degree</label>
                                        <div className="col-10">
                                            <input name="degree" className="form-control" type="text"
                                                   value={this.state.education.degree} id="example-text-input"
                                                   onChange={this.handleChangeEducation}/>

                                            {this.validatorEducation.message('degree', this.state.education.degree, 'required')}
                                        </div>
                                    </div>

                                </div>
                                <div className="col-12 mx-auto">
                                    <div className="row form-group">
                                        <label htmlFor="example-text-input"
                                               className="col-2 col-form-label text-right">Start</label>
                                        <div className="col-10">
                                            <YearPicker

                                                defaultValue={'select year'}
                                                // default is 1900

                                                // default is current year

                                                // default is ASCENDING
                                                reverse
                                                // default is false
                                                // default is false
                                                // mandatory
                                                value={this.state.education.date1}
                                                // mandatory
                                                onChange={(year) => {
                                                    const {education} = this.state
                                                    this.setState({
                                                        education: {
                                                            ...education,
                                                            date1: year

                                                        }
                                                    });
                                                    //console.log(year);
                                                }}
                                                id={'example-text-input'}
                                                name={'date1'}
                                                classes={'form-control'}
                                                optionClasses={'option classes'}
                                            />
                                            {this.validatorEducation.message('date1', this.state.education.date1, 'required')}
                                        </div>
                                    </div>

                                    <div className="row form-group">
                                        <label htmlFor="example-search-input"
                                               className="col-2 col-form-label text-right">End</label>
                                        <div className="col-10">
                                            <YearPicker

                                                defaultValue={'select year'}
                                                // default is 1900

                                                // default is current year
                                                start={this.state.education.date1}
                                                // default is ASCENDING
                                                reverse
                                                // default is false
                                                // default is false
                                                // mandatory
                                                value={this.state.education.date2}
                                                // mandatory
                                                onChange={(year) => {
                                                    const {education} = this.state
                                                    this.setState({
                                                        education: {
                                                            ...education,
                                                            date2: year

                                                        }
                                                    });
                                                    //console.log(year);
                                                }}
                                                id={'example-text-input'}
                                                name={'year'}
                                                classes={'form-control'}
                                                optionClasses={'option classes'}
                                            />
                                            {this.validatorEducation.message('date2', this.state.education.date2, 'required')}
                                        </div>
                                    </div>

                                    <div className="row form-group">
                                        <label htmlFor="example-textarea"
                                               className="col-2 col-form-label text-right">Description</label>
                                        <div className="col-10">
                                                <textarea className="form-control"
                                                          value={this.state.education.description}
                                                          rows={5} name="description"
                                                          onChange={this.handleChangeEducation}/>
                                            {this.validatorEducation.message('description', this.state.education.description, 'required')}
                                        </div>
                                    </div>


                                </div>

                            </div>
                            <div className="modal-footer py-4">
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                                <button type="button" type="submit" className="btn btn-success">Save changes
                                </button>
                            </div>
                        </form>
                    </div>
                </Modal>
                <Modal classNames={costum} open={this.state.openBiography} onClose={this.onCloseModalBiography} center>
                    <div style={{width: 700}}>
                        <div className="modal-header">
                            <h5 className="modal-title">Add experience</h5>

                        </div>
                        <form onSubmit={this.handleSubmitBiography} name="form">
                            <div className="modal-body py-4">
                                <div className="col-12 mx-auto">


                                </div>
                                <div className="col-12 mx-auto">


                                    <div className="row form-group">
                                        <label htmlFor="example-textarea"
                                               className="col-2 col-form-label text-right">Biography</label>
                                        <div className="col-10">
                                                <textarea className="form-control" value={this.state.profile.summary}
                                                          rows={5} name="summary"
                                                          onChange={this.handleChangeBiography}/>
                                            {this.validatorBiography.message('summary', this.state.profile.summary, 'required')}
                                        </div>
                                    </div>


                                </div>

                            </div>
                            <div className="modal-footer py-4">
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                                <button type="button" type="submit" className="btn btn-success">Save changes
                                </button>
                            </div>
                        </form>
                    </div>
                </Modal>

            </div>

        );


    }
}

function mapStateToProps(state) {
    const {users, authentication, profile} = state;
    const {user} = authentication;

    return {
        user,
        users,
        profile
    };
}

const connectedHomePage = connect(mapStateToProps)(About);
export {connectedHomePage as About};
