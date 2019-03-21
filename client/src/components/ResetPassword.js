import React, {Component} from 'react';
import {alertActions, userActions} from "../_actions";
import SimpleReactValidator from "simple-react-validator";
import connect from "react-redux/es/connect/connect";

class ResetPassword extends Component {
    componentWillMount() {
        console.log(this.props.location.search.substring(1));
       }
    constructor(props) {
        super(props);

        this.validator = new SimpleReactValidator(
            {element: message => <div className="alert text-danger bg-danger-0_1 px-4 py-3" role="alert">
                    {message}
                </div>}
        );

        this.state = {
            email: "",
            password: "",
            confirmpassword : "",
            token : ""
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
        const { password , confirmpassword } = this.state;
        const { dispatch } = this.props;
        if(password !== confirmpassword){
            dispatch(alertActions.error("Password dont match"));
            alert("Passwords don't match");
        }
        else{
            if (this.validator.allValid()) {
                dispatch(userActions.getNewPassword(password, confirmpassword, this.props.location.search.substring(1)));
                alert("Password changed ! Please re-enter your username and password");
                this.render('/login');

            }else {
                this.validator.showMessages();
                // rerender to show messages for the first time
                this.forceUpdate();
            }
        }
    }
    render() {
        const { password , confirmpassword } = this.state;
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
                                            Please enter your new password here !
                                        </p>
                                        <div className="input-group input-group--focus marginBottom-40">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-white ti-email" />
                                            </div>
                                            <input type="password" name="password" value={password} onChange={this.handleChange} className="form-control border-left-0 pl-0" placeholder="Password" required />
                                            </div>
                                        {this.validator.message('password', password, 'required|min:8')}
                                        <div className="input-group input-group--focus marginBottom-40">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-white ti-email" />
                                            </div>
                                            <input type="password" name="confirmpassword" value={confirmpassword} onChange={this.handleChange} className="form-control border-left-0 pl-0" placeholder="Confirm password" required />
                                        </div>
                                        {this.validator.message('confirmpassword', confirmpassword, 'required|min:8')}
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

const connectedLoginPage = connect(mapStateToProps)(ResetPassword);
export { connectedLoginPage as ResetPassword };