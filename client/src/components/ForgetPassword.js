import React, {Component} from 'react';
import {userActions} from "../_actions";
import SimpleReactValidator from "simple-react-validator";
import connect from "react-redux/es/connect/connect";


class ForgetPassword extends Component {
    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator(
            {element: message => <div className="alert text-danger bg-danger-0_1 px-4 py-3" role="alert">
                    {message}
                </div>}
        );

        this.state = {
            email: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { email } = this.state;
        const { dispatch } = this.props;
        if (this.validator.allValid()) {
            dispatch(userActions.resetPassword(email));
            alert("Please check your email to complete resetting your password !");

        }else {
            this.validator.showMessages();
            // rerender to show messages for the first time
            this.forceUpdate();
        }
    }
    render() {
        const { email } = this.state;
        return (
            <section className="padding-y-100 bg-light">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 mx-auto">
                            <div className="card shadow-v2">
                                <div className="card-header px-lg-5 border-bottom">
                                    <h4 className="mt-4">
                                        Get Your Password
                                    </h4>
                                </div>
                                {alert.message &&
                                <div className={`alert ${alert.type} text-white px-4 py-3`} role="alert">
                                    {alert.message}
                                </div>
                                }
                                <div className="card-body">
                                    <form onSubmit={this.handleSubmit} className="px-lg-5">
                                        <p className="marginBottom-40">
                                            Lost your password? Please enter your email address. You will receive a link to create a new password via email.
                                        </p>
                                        <div className="input-group input-group--focus marginBottom-40">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-white ti-email" />
                                            </div>
                                            <input name="email" type="text" value={email} className="form-control border-left-0 pl-0" placeholder="Email" onChange={this.handleChange}  />
                                        </div>
                                        {this.validator.message('email', email, 'required|email')}
                                        <button className="btn btn-block btn-primary mb-5">Reset Password</button>
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
    const { loggingIn } = state.authentication;
    const {alert} = state;

    return {
        loggingIn,
        alert
    };
}

const connectedLoginPage = connect(mapStateToProps)(ForgetPassword);
export { connectedLoginPage as ForgetPassword };