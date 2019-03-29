import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import SimpleReactValidator from "simple-react-validator";
import {trainingSessionAction} from "../_actions";

class AddTrainingSession extends Component {
    constructor(props){
        super(props);

        this.validator = new SimpleReactValidator(
            {element: message => <div className="alert text-danger bg-danger-0_1 px-4 py-3" role="alert">
                    {message}
                </div>}
        );

        this.state = {
            session : {
                name: '',
                description :'',
                startDate :'',
                endDate: ''
            }
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { session } = this.state;
        const { dispatch } = this.props;
        const {id} =this.props.user.user._id;
        if (this.validator.allValid()) {

            dispatch(trainingSessionAction.addTrainingSession(session, id));

        }else {
            this.validator.showMessages();
            this.forceUpdate();
            }
    }
    render() {
        const {session}= this.state;
        const {authentication} = this.props;
        return (
            <section className="padding-y-100 bg-light">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 mx-auto">
                            <div className="card shadow-v2">
                                <div className="card-header border-bottom">
                                    <h4 className="mt-4">
                                        Add your training session here!
                                    </h4>
                                </div>
                                <div className="card-body">
                                    {alert.message &&
                                    <div className={`alert ${alert.type} text-white px-4 py-3`} role="alert">
                                        {alert.message}
                                    </div>
                                    }
                                    <form name="form" onSubmit={this.handleSubmit} className="px-lg-4">
                                        <div className="input-group input-group--focus mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-white ti-user" />
                                            </div>
                                            <input name="name" type="text" className="form-control border-left-0 pl-0" placeholder="Name"
                                                   value={session.name} onChange={this.handleChange}/>
                                        </div>
                                        {this.validator.message('name', session.name, 'required')}
                                        <div className="input-group input-group--focus mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-white ti-user" />
                                            </div>
                                            <input name="description" type="text" className="form-control border-left-0 pl-0" placeholder="Description"
                                                   value={session.description} onChange={this.handleChange} />
                                        </div>
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
                                        <button className="btn btn-block btn-primary">Add training session</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        )
    }
}
function mapStateToProps(state) {
    const {alert} = state;
    const { users, authentication } = state;
    const { user } = authentication;

    return {
        alert,
        user,
        authentication
    };
}

const connectedLoginPage = connect(mapStateToProps)(AddTrainingSession);
export { connectedLoginPage as AddTrainingSession };