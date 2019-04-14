import React, {Component} from 'react';
import {connect} from "react-redux";
import {Experience} from "./experience";
import Modal from 'react-responsive-modal';
import {YearPicker} from "react-dropdown-date";
import costum from './costum.css'
import {profileAction, userActions} from "../../_actions";
import SimpleReactValidator from "simple-react-validator";


class About extends Component {
    constructor(props) {
        super(props)
        console.log(this.props.profile)
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
        this.state = {
            position: [],
            open: false,
            openBiography: false,
            profile:
            this.props.profile.profile,

            pos: {
                title: '',
                date1: '',
                date2: '',
                companyName: '',
                description: ''
            }

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeBiography = this.handleChangeBiography.bind(this);
        this.handleSubmitBiography = this.handleSubmitBiography.bind(this);
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
                date1: pos.date1 + " - " + pos.date2,
                date2: pos.date2 - pos.date1 + " ans",
                description: pos.description
            }
            console.log(position)
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

            //console.log(position)
           // dispatch(profileAction.addPosition(profile.profile._id, position));
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
        //console.log(user);
        this.setState({
            profile: {
                ...profile,
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

    render() {
        const {open} = this.state;
        const {profile} = this.props
        console.log(profile.loaded)
        const loading = (this.props.profile.position && !this.props.profile.position.length);
        console.log(this.props.profile.position)
        var experience = null;
        if (profile.loaded && profile.profile.position.length > 0) {
            experience = profile.profile.position.map(e => {
                return (<Experience e={e} id={profile.profile._id}/>)
            })
        }
        return (

            <div className="tab-pane fade active show" id="Tabs_1-1" role="tabpanel">
                <div style={{display: 'flex', justifyContent: 'space-between'}}><h4 className="mb-4">
                    Biography
                </h4>
                    <button className="btn btn-outline-success btn-sm mr-3 mb-3" onClick={this.onOpenModalBiography}>Update
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
                        {experience}
                    </ul>
                </div>
                <div className="mb-4">
                    <h4 className="mb-4">
                        Education
                    </h4>
                    <ul className="ec-timeline-portlet list-unstyled bullet-line-list">
                        <li className="ec-timeline-portlet__item mb-4">
                            <small>2000-2004</small>
                            <h6 className="mb-0">Full Stack Developer</h6>
                            <p className="mb-2">Apple Inc.</p>
                            <p>
                                Investig ationes demons travge vunt lectores legee lrus quodk legunt saepius was
                                claritas kesty conctetur they kedadip lectores legee sicing. legee lrus quodk
                                legunt.
                            </p>
                        </li>
                        <li className="ec-timeline-portlet__item">
                            <small>2004-2018</small>
                            <h6 className="mb-0">Project Manager</h6>
                            <p className="mb-2">Google</p>
                            <p>
                                Investig ationes demons travge vunt lectores legee lrus quodk legunt saepius was
                                claritas kesty conctetur they kedadip lectores legee sicing. legee lrus quodk
                                legunt.
                            </p>
                        </li>
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
                                            <YearPicker

                                                defaultValue={'select year'}
                                                // default is 1900

                                                // default is current year

                                                // default is ASCENDING
                                                reverse
                                                // default is false
                                                // default is false
                                                // mandatory
                                                value={this.state.pos.date1}
                                                // mandatory
                                                onChange={(year) => {
                                                    const {pos} = this.state
                                                    this.setState({
                                                        pos: {
                                                            ...pos,
                                                            date1: year

                                                        }
                                                    });
                                                    console.log(year);
                                                }}
                                                id={'example-text-input'}
                                                name={'date1'}
                                                classes={'form-control'}
                                                optionClasses={'option classes'}
                                            />
                                            {this.validator.message('date1', this.state.pos.date1, 'required')}
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
                                                start={this.state.pos.date1}
                                                // default is ASCENDING
                                                reverse
                                                // default is false
                                                // default is false
                                                // mandatory
                                                value={this.state.pos.date2}
                                                // mandatory
                                                onChange={(year) => {
                                                    const {pos} = this.state
                                                    this.setState({
                                                        pos: {
                                                            ...pos,
                                                            date2: year

                                                        }
                                                    });
                                                    console.log(year);
                                                }}
                                                id={'example-text-input'}
                                                name={'year'}
                                                classes={'form-control'}
                                                optionClasses={'option classes'}
                                            />
                                            {this.validator.message('date2', this.state.pos.date2, 'required')}
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
                <Modal classNames={costum} open={this.state.openBiography} onClose={this.onCloseModalBiography} center>
                    <div style={{width: 700}}>
                        <div className="modal-header">
                            <h5 className="modal-title">Add experience</h5>

                        </div>
                        <form onSubmit={this.handleSubmit} name="form">
                            <div className="modal-body py-4">
                                <div className="col-12 mx-auto">


                                </div>
                                <div className="col-12 mx-auto">


                                    <div className="row form-group">
                                        <label htmlFor="example-textarea"
                                               className="col-2 col-form-label text-right">Biography</label>
                                        <div className="col-10">
                                                <textarea className="form-control" value={this.state.profile.summary}
                                                          rows={5} name="summary" onChange={this.handleChangeBiography}/>
                                            {this.validator.message('summary', this.state.profile.summary, 'required')}
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
