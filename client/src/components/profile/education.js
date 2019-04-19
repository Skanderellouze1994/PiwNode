import React, {Component} from 'react';
import swal from 'sweetalert';
import {profileAction} from "../../_actions";
import {connect} from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import Modal from "react-responsive-modal";
import costum from "./costum.css";
import {YearPicker} from "react-dropdown-date";

const style = {display: 'flex', justifyContent: 'space-between'}

class Education extends Component {
    constructor(props) {
        super(props)
        const {e} = this.props
        this.removeAlert = this.removeAlert.bind(this);
        this.validator = new SimpleReactValidator(
            {
                element: message => <div className="alert text-danger bg-danger-0_1 px-4 py-3" role="alert">
                    {message}
                </div>
            }
        );
        this.state = {
            open: false,
            pos: {
                _id:e._id,
                title:e.title,
                date1: e.date1,
                date2: e.date2,
                degree: e.degree,
                description: e.description
            }

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({submitted: true});
        const {pos} = this.state;
        const {dispatch, profile} = this.props;
        if (this.validator.allValid()) {
            const position = {
                _id:pos._id,
                title:pos.title,
                degree: pos.degree,
                date1: pos.date1 ,
                date2: pos.date2 ,
                description: pos.description
            }
            //console.log(position)
            dispatch(profileAction.updateEducation(profile.profile._id,position));
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

    onOpenModal = () => {
        this.setState({open: true});
    };

    onCloseModal = () => {
        this.setState({open: false});
    };

    removeAlert() {

        const {id} = this.props
        const {dispatch} = this.props
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    console.log(id)
                    dispatch(profileAction.deleteEducation(id, this.props.e._id))
                    swal("Poof! Your imaginary file has been deleted!", {
                        icon: "success",
                    });
                } else {
                    //swal("Your imaginary file is safe!");
                }
            });
    }

    render() {
        const {open} = this.state
        console.log(this.state)
        return (
            <div>
                <Modal classNames={costum} open={open} onClose={this.onCloseModal} center>
                    <div style={{width: 700}}>
                        <div className="modal-header">
                            <h5 className="modal-title">Add education</h5>

                        </div>
                        <form onSubmit={this.handleSubmit} name="form">
                            <div className="modal-body py-4">
                                <div className="col-12 mx-auto">
                                    <div className="row form-group">
                                        <label htmlFor="example-text-input" className="col-2 col-form-label text-right">Title</label>
                                        <div className="col-10">
                                            <input name="title" className="form-control" type="text"
                                                   value={this.state.pos.title} id="example-text-input"
                                                   onChange={this.handleChange}/>

                                            {this.validator.message('title', this.state.pos.title, 'required')}
                                        </div>
                                    </div>
                                    <div className="row form-group">
                                        <label htmlFor="example-text-input" className="col-2 col-form-label text-right">Degree</label>
                                        <div className="col-10">
                                            <input name="degree" className="form-control" type="text"
                                                   value={this.state.pos.degree} id="example-text-input"
                                                   onChange={this.handleChange}/>

                                            {this.validator.message('degree', this.state.pos.degree, 'required')}
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
                                <button type="button" type="submit" className="btn btn-success">Save changes</button>
                            </div>
                        </form>
                    </div>
                </Modal>

                <li className="ec-timeline-portlet__item mb-4">
                    <small>{this.props.e.date1} - {this.props.e.date2}</small>
                    <div style={style}><h6 className="mb-0">{this.props.e.degree}</h6>
                        <div className="btn-group mr-2 mb-3">
                            <button className="btn btn-outline-primary btn-xs dropdown-toggle" type="button"
                                    data-toggle="dropdown" aria-expanded="false">
                                <i className="ti-settings"/>
                            </button>
                            <div className="dropdown-menu" x-placement="bottom-start" style={{
                                position: 'absolute',
                                transform: 'translate3d(0px, 26px, 0px)',
                                top: '0px',
                                left: '0px',
                                willChange: 'transform'
                            }}>
                                <button className="dropdown-item" onClick={this.removeAlert}>Remove</button>
                                <button className="dropdown-item" onClick={this.onOpenModal}>Update</button>

                            </div>
                        </div>
                    </div>

                    <p className="mb-2">{this.props.e.title}</p>

                    {this.props.e.description?<p>{this.props.e.description}</p>:<button className="btn" onClick={this.onOpenModal}>Please update description</button>}

                </li>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {users, authentication, profile} = state;
    const {user} = authentication;
    const {position} = profile
    return {
        user,
        users,
        profile,
        position
    };
}

const connectedHomePage = connect(mapStateToProps)(Education);
export {connectedHomePage as Education};
