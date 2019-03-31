import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import axios from 'axios';
import SimpleReactValidator from "simple-react-validator";


class EditTrainingSession extends Component {
    constructor(props){
        super(props);
        this.validator = new SimpleReactValidator(
            {element: message => <div className="alert text-danger bg-danger-0_1 px-4 py-3" role="alert">
                    {message}
                </div>}
        );
    }

    render() {

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
                                    <form name="form" >
                                        <div className="input-group input-group--focus mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-white ti-user" />
                                            </div>
                                            <input name="name" type="text" className="form-control border-left-0 pl-0" placeholder="Name"
                                                   />
                                        </div>
                                        <div className="input-group input-group--focus mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-white ti-user" />
                                            </div>
                                            <input name="description" type="text" className="form-control border-left-0 pl-0" placeholder="Description"
                                            />
                                        </div>
                                        <div className="input-group input-group--focus mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-white ti-user" />
                                            </div>
                                            <input name="startDate"
                                                   placeholder="03/27/2018 8:09 PM" type="text"
                                                   className="form-control datetimepicker-input" id="ec-datetimepicker"
                                                   data-toggle="datetimepicker" data-target="#ec-datetimepicker"
                                                    />
                                        </div>
                                        <div className="input-group input-group--focus mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-white ti-user" />
                                            </div>
                                            <input name="endDate"
                                                   placeholder="03/27/2018 8:09 PM" type="text"
                                                   className="form-control datetimepicker-input" id="ec-datetimepicker"
                                                   data-toggle="datetimepicker" data-target="#ec-datetimepicker"
                                                    />
                                        </div>
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