import React, {Component} from 'react';
import {userActions} from "../_actions";
import { connect } from 'react-redux';
import {Link} from "react-router-dom";
import SimpleReactValidator from 'simple-react-validator';
import FacebookLogin from 'react-facebook-login';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator(
            {element: message => <div className="alert text-danger bg-danger-0_1 px-4 py-3" role="alert">
                    {message}
                </div>}
        );
        this.state = {
            user: {

                username: '',
                email:'',
                password: '',
                role:'',
                name:'',
                address:'',
                birthday:'',
                profile_photo:'',
                size:''

            },
            submitted: false,
            selectedFile:null,
            accepted:false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleChangee = this.handleChangee.bind(this);
        this.huandleLoginFacebook = this.huandleLoginFacebook.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        console.log(value);
        this.setState({
            user: {
                ...user,
                [name]: value
            },


        });
    }

    handleChangee(event) {
        const {accepted} = this.state;
        this.setState({
            accepted:!accepted
        })

    }
    huandleLoginFacebook(event){
        console.log("dkhal");
        const { dispatch } = this.props;
        dispatch(userActions.loginFacebook())
    }
    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        const { dispatch } = this.props;
        if (this.validator.allValid()) {

            dispatch(userActions.register(user));

        }else {
            this.validator.showMessages();
            // rerender to show messages for the first time
            this.forceUpdate();
        }
    }
    responseFacebook(response) {
        console.log(response);
    }
    render() {
        const {alert} = this.props;
        const { user } = this.state;
        return (
            <section className="padding-y-100 bg-light">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 mx-auto">
                            <div className="card shadow-v2">
                                <div className="card-header border-bottom">
                                    <h4 className="mt-4">
                                        Sign Up and Start Learning!
                                    </h4>
                                </div>
                                <FacebookLogin
                                    appId="426024058143152"
                                    autoLoad={true}
                                    fields="name,email,picture"
                                    scope="public_profile,user_friends"
                                    callback={this.responseFacebook}
                                />
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col my-2">
                                            <button className="btn btn-block btn-facebook" onClick={this.huandleLoginFacebook}>
                                                <i className="ti-facebook mr-1"/>
                                                <span>Facebook Sign in</span>
                                            </button>
                                        </div>
                                        <div className="col my-2">
                                            <button className="btn btn-block btn-google-plus">
                                                <i className="ti-google mr-1"/>
                                                <span>Google Sign in</span>
                                            </button>
                                        </div>
                                    </div>
                                    <p className="text-center my-4">
                                        OR
                                    </p>
                                    {alert.message &&
                                    <div className={`alert ${alert.type} text-white px-4 py-3`} role="alert">
                                        {alert.message}
                                    </div>
                                    }
                                    <form onSubmit={this.handleSubmit} className="px-lg-4" name="form">
                                        <div className="input-group input-group--focus mb-3 ">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-white ti-user"/>
                                            </div>
                                            <input type="text" className="form-control border-left-0 pl-0" name="name"
                                                   placeholder="Name"  value={user.name} onChange={this.handleChange}/>
                                        </div>
                                        {this.validator.message('name', user.name, 'required')}


                                        <div className="input-group input-group--focus mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-white ti-location-arrow"/>
                                            </div>

                                            <input type="text" className="form-control border-left-0 pl-0" name="address"
                                                   placeholder="Address"  value={user.address} onChange={this.handleChange}/>
                                        </div>
                                        {this.validator.message('address', user.address, 'required|min:10')}
                                        <div className="input-group input-group--focus mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-white ti-time"/>
                                            </div>
                                            <input type="date" className="form-control border-left-0 pl-0" name="birthday"
                                                   placeholder="birthday"  value={user.birthday} onChange={this.handleChange}/>
                                        </div>
                                        {this.validator.message('birthday', user.birthday, 'required')}

                                        <div className="input-group input-group--focus mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-white ti-user"/>
                                            </div>
                                            <input type="text" className="form-control border-left-0 pl-0" name="username"
                                                   placeholder="Username"  value={user.username} onChange={this.handleChange}/>
                                        </div>
                                        {this.validator.message('username', user.username, 'required')}

                                        <div className="input-group input-group--focus mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-white ti-email"/>
                                            </div>
                                            <input type="email" className="form-control border-left-0 pl-0" name="email"
                                                   placeholder="Email"  value={user.email} onChange={this.handleChange}/>
                                        </div>
                                        {this.validator.message('email', user.email, 'required|email')}

                                        <div className="input-group input-group--focus mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-white ti-lock"/>
                                            </div>
                                            <input type="password" className="form-control border-left-0 pl-0" name="password"
                                                   placeholder="Password"  value={user.password} onChange={this.handleChange}/>
                                        </div>
                                        {this.validator.message('password', user.password, 'required|min:8')}

                                        <label className="ec-radio radio-thin radio-sm mb-3 mr-4">
                                            <input type="radio" name="role" value="Student" onChange={this.handleChange}/>
                                                <span className="ec-radio__control"/>
                                                <span className="ec-radio__label">Student</span>
                                        </label>
                                        <label className="ec-radio radio-thin radio-sm mb-3 mr-4">
                                            <input type="radio" name="role" value="Tutor" onChange={this.handleChange}/>
                                            <span className="ec-radio__control"/>
                                            <span className="ec-radio__label">Tutor</span>
                                        </label>
                                        {this.validator.message('role', user.role, 'required')}


                                        <div className="my-4">
                                            <label className="ec-checkbox check-sm my-2 clearfix">
                                                <input type="checkbox" name="accepted"   onChange={this.handleChangee} />
                                                <span className="ec-checkbox__control mt-1"/>
                                                <span className="ec-checkbox__lebel">
                                                        By signing up, you agree to our
                                                         <Link  className="text-primary"> Terms of Use </Link>
                                                            and
                                                         <Link  className="text-primary"> Privacy Policy. </Link>
                                                 </span>
                                            </label>
                                        </div>
                                        <button className="btn btn-block btn-primary" disabled={!this.state.accepted}>Register Now</button>
                                        <p className="my-5 text-center">
                                            Already have an account? <Link className="text-primary">Login</Link>
                                        </p>
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
    const { registering } = state.registration;
    const {alert} = state;
    return {
        registering,
        alert
    };
}

const connectedRegisterPage = connect(mapStateToProps)(Signup);
export { connectedRegisterPage as Signup };