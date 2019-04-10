import React, {Component} from 'react';
import {connect} from "react-redux";
import axios from 'axios';
import SimpleReactValidator from "simple-react-validator";
import Swal from'sweetalert2';


class EditTrainingSession extends Component {
    constructor(props){
        super(props);
        this.state = {
            session : {
                name: '',
                description :'',
                startDate :'',
                endDate: ''
            }
        };

        this.validator = new SimpleReactValidator(
            {element: message => <div className="alert text-danger bg-danger-0_1 px-4 py-3" role="alert">
                    {message}
                </div>}
        );
        axios
            .get(`http://localhost:4000/trainingSession/get/${this.props.match.params.id}`)
            .then(response => {
                this.setState({ session: response.data});
            });
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        const { session } = this.state;
        this.setState({
            session: {
                ...session,
                [name]: value
            }
        });
    }
    handleSubmit(event) {
        event.preventDefault();
        const { session } = this.state;
        if (this.validator.allValid()) {
            axios
                .put(`http://localhost:4000/trainingSession/update/${this.props.user.user._id}`+`/${this.props.match.params.id}`,session)
                .then(response => {
                    console.log(response.data);
                });
            Swal.fire(
                'Good job!',
                'You changed this training session successfully !',
                'success'
            );

        }else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    render() {
        const {session}= this.state;
        console.log(this.props);
        console.log(this.state);

        return (
            <section className="padding-y-100 bg-light">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 mx-auto">
                            <div className="card shadow-v2">
                                <div className="card-header border-bottom">
                                    <h4 className="mt-4">
                                        Edit your training session here!
                                    </h4>
                                </div>
                                <div className="card-body">
                                    {alert.message &&
                                    <div className={`alert ${alert.type} text-white px-4 py-3`} role="alert">
                                        {alert.message}
                                    </div>
                                    }
                                    <form name="form" onSubmit={this.handleSubmit}>
                                        <div className="input-group input-group--focus mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-white ti-user" />
                                            </div>
                                            <input name="name" type="text" className="form-control border-left-0 pl-0" placeholder="Name"
                                                   value={session.name} onChange={this.handleChange}/>
                                        </div>
                                        {this.validator.message('Name', session.name, 'required')}
                                        <div className="input-group input-group--focus mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-white ti-user" />
                                            </div>
                                            <input name="description" type="text" className="form-control border-left-0 pl-0" placeholder="Description"
                                                   value={session.description} onChange={this.handleChange} />
                                        </div>
                                        {this.validator.message('Description ', session.description, 'required')}
                                        <div className="input-group input-group--focus mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-white ti-user" />
                                            </div>
                                            <input name="startDate"
                                                   placeholder="03/27/2018 8:09 PM" type="text"
                                                   className="form-control datetimepicker-input" id="ec-datetimepicker"
                                                   data-toggle="datetimepicker" data-target="#ec-datetimepicker"
                                                   value={session.startDate} onChange={this.handleChange} />
                                        </div>
                                        {this.validator.message('Start Date', session.startDate, 'required')}
                                        <div className="input-group input-group--focus mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-white ti-user" />
                                            </div>
                                            <input name="endDate"
                                                   placeholder="03/27/2018 8:09 PM" type="text"
                                                   className="form-control datetimepicker-input" id="ec-datetimepicker"
                                                   data-toggle="datetimepicker" data-target="#ec-datetimepicker"
                                                   value={session.endDate} onChange={this.handleChange} />
                                        </div>
                                        {this.validator.message('End Date', session.endDate, 'required')}
                                        <button type="submit" className="btn btn-block btn-primary">Edit training session</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )}
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedHomePage = connect(mapStateToProps)(EditTrainingSession);
export { connectedHomePage as EditTrainingSession };