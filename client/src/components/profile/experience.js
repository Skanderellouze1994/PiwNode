import React, {Component} from 'react';
import swal from 'sweetalert';
import {profileAction} from "../../_actions";
import {connect} from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import Modal from "react-responsive-modal";
import costum from "./costum.css";
import {MonthPicker, YearPicker} from "react-dropdown-date";

const style = {display: 'flex', justifyContent: 'space-between'}
const month = ["janv.", "févr.", "mars", "avril.", 'mai', "juin", "juil.", "août", "sept.", "oct.", "nov.", ".dec"]

function monthsub(e) {
    const a = e.date1.substring(e.date1.indexOf('-') + 2, e.date1.length)
    const b = a.substring(0,a.indexOf(' ')-1)
    return b
}
function splitdate(e) {
    var tab = e.date1.split(' ')
    return tab

}

class Experience extends Component {
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
                _id: e._id,
                title: e.title,
                yeardate1: splitdate(e)[1],
                monthdate1:month.indexOf(splitdate(e)[0]) ,
                monthdate2:month.indexOf(splitdate(e)[3])===-1?0:month.indexOf(splitdate(e)[3]) ,
                yeardate2:splitdate(e)[4]===undefined?"2019":splitdate(e)[4],
                companyName: e.companyName,
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
                title: pos.title,
                companyName: pos.companyName,
                date1: month[pos.monthdate1]+" "+pos.yeardate1 + " - " + month[pos.monthdate2]+" "+pos.yeardate2 ,
                date2: (pos.date2 - pos.date1)===0?(pos.yeardate2 - pos.yeardate1 + " ans"):pos.monthdate2 - pos.monthdate1 + " mois",
                description: pos.description
            }
            console.log(position)
            dispatch(profileAction.updatePosition(profile.profile._id, position));
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
        //console.log(this.props.e.date1.substr((this.props.e.date1.indexOf(' ') + 2), 4));

        this.setState({
            pos: {
                ...pos,
                [name]: value
            },


        });
    }

    onOpenModal = () => {
        console.log(this.state.pos)
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
                    dispatch(profileAction.deletePosition(id, this.props.e._id))
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
                            <h5 className="modal-title">Add experience</h5>

                        </div>
                        <form onSubmit={this.handleSubmit} name="form">
                            <div className="modal-body py-4">
                                <div className="col-12 mx-auto">
                                    <div className="row form-group">
                                        <label htmlFor="example-text-input" className="col-2 col-form-label text-right">Company
                                            Name</label>
                                        <div className="col-10">
                                            <input name="title" className="form-control" type="text"
                                                   value={this.state.pos.title} id="example-text-input"
                                                   onChange={this.handleChange}/>

                                            {this.validator.message('title', this.state.pos.title, 'required')}
                                        </div>
                                    </div>
                                    <div className="row form-group">
                                        <label htmlFor="example-text-input" className="col-2 col-form-label text-right">Company
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
                                                    console.log(year);
                                                }}
                                                id={'example-text-input'}
                                                name={'date1'}
                                                classes={'form-control'}
                                                optionClasses={'option classes'}
                                            />
                                            {this.validator.message('yeardate1', this.state.pos.yeardate1, 'required')}
                                            <MonthPicker
                                                defaultValue={'select month'}
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
                                                        pos:{
                                                            ...pos,
                                                            monthdate1: month
                                                        }
                                                    } );
                                                    console.log(month);
                                                }}
                                                id={'example-text-input'}
                                                name={'monthdate1'}
                                                classes={'form-control'}
                                                optionClasses={'option classes'}
                                            />
                                            {this.validator.message('monthdate1', this.state.pos.monthdate1, 'required')}

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
                                                    console.log(year);
                                                }}
                                                id={'example-text-input'}
                                                name={'year'}
                                                classes={'form-control'}
                                                optionClasses={'option classes'}
                                            />
                                            {this.validator.message('yeardate2', this.state.pos.yeardate2, 'required')}
                                            <MonthPicker
                                                defaultValue={'select month'}
                                                // to get months as numbers

                                                // default is full name
                                                short
                                                // default is Titlecase

                                                // mandatory if end={} is given in YearPicker
                                                endYearGiven
                                                // mandatory

                                                // default is false

                                                // mandatory
                                                value={this.state.pos.monthdate2}
                                                // mandatory
                                                onChange={(month) => {
                                                    const {pos} = this.state
                                                    this.setState({
                                                        pos:{
                                                            ...pos,
                                                            monthdate2: month
                                                        }
                                                    } );
                                                    console.log(month);
                                                }}
                                                id={'example-text-input'}
                                                name={'monthdate1'}
                                                classes={'form-control'}
                                                optionClasses={'option classes'}
                                            />
                                            {this.validator.message('monthdate2', this.state.pos.monthdate2, 'required')}

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
                    <small>{this.props.e.date1}</small>
                    <div style={style}><h6 className="mb-0">{this.props.e.companyName}</h6>
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

                    {this.props.e.description ? <p>{this.props.e.description}</p> :
                        <button className="btn" onClick={this.onOpenModal}>Please update description</button>}

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

const connectedHomePage = connect(mapStateToProps)(Experience);
export {connectedHomePage as Experience};
