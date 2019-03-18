import React, {Component} from 'react';
import {userActions} from "../_actions";
import { connect } from 'react-redux';
import axios from 'axios';
import FormData from 'form-data'

class Signup extends Component {
    constructor(props) {
        super(props);

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

            },
            submitted: false,
            selectedFile:null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }
fileSelectedHandler= event=>{
        console.log(event.target.files[0]);
        this.setState({selectedFile:event.target.files[0]})
}
    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        const { dispatch } = this.props;
        if (user.role && user.email && user.username && user.password) {
            const fd = new FormData();
            fd.append('image',this.state.selectedFile,this.state.selectedFile.name);
            axios.post('http://localhost:4000/auth/upload',fd).then(res=>{
                console.log(res);
            });
            dispatch(userActions.register(user));
        }
    }

    render() {
        const { registering  } = this.props;
        const { user, submitted } = this.state;
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
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col my-2">
                                            <button className="btn btn-block btn-facebook">
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
                                    <form onSubmit={this.handleSubmit} className="px-lg-4" name="form">
                                        <div className="input-group input-group--focus mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-white ti-user"/>
                                            </div>
                                            <input type="text" className="form-control border-left-0 pl-0" name="name"
                                                   placeholder="Name"  value={user.name} onChange={this.handleChange}/>
                                        </div>
                                        <div className="input-group input-group--focus mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-white ti-user"/>
                                            </div>

                                            <input type="text" className="form-control border-left-0 pl-0" name="address"
                                                   placeholder="Address"  value={user.address} onChange={this.handleChange}/>
                                        </div>
                                        <div className="input-group input-group--focus mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-white ti-user"/>
                                            </div>
                                            <input type="date" className="form-control border-left-0 pl-0" name="birthday"
                                                   placeholder="birthday"  value={user.birthday} onChange={this.handleChange}/>
                                        </div>

                                        <div className="input-group input-group--focus mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-white ti-user"/>
                                            </div>
                                            <input type="text" className="form-control border-left-0 pl-0" name="username"
                                                   placeholder="Username"  value={user.username} onChange={this.handleChange}/>
                                        </div>
                                        <div className="input-group input-group--focus mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-white ti-email"/>
                                            </div>
                                            <input type="email" className="form-control border-left-0 pl-0" name="email"
                                                   placeholder="Email"  value={user.email} onChange={this.handleChange}/>
                                        </div>
                                        <div className="input-group input-group--focus mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-white ti-lock"/>
                                            </div>
                                            <input type="password" className="form-control border-left-0 pl-0" name="password"
                                                   placeholder="Password" required value={user.password} onChange={this.handleChange}/>
                                        </div>
                                        <div className="input-group input-group--focus mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-white ti-lock"/>
                                            </div>
                                            <input type="text" className="form-control border-left-0 pl-0" name="role"
                                                   placeholder="Role" required value={user.role} onChange={this.handleChange}/>
                                        </div>
                                        <div className="input-group input-group--focus mb-3">
                                            <div className="input-group-prepend">

                                            </div>
                                            <input type="file" className="form-control border-left-0 pl-0 " name="profile_photo"
                                                   placeholder="profile_photo"  value={user.profile_photo} onChange={this.fileSelectedHandler}/>
                                        </div>
                                        <div className="my-4">
                                            <label className="ec-checkbox check-sm my-2 clearfix">
                                                <input type="checkbox" name="checkbox"/>
                                                <span className="ec-checkbox__control mt-1"/>
                                                <span className="ec-checkbox__lebel">
                                                        By signing up, you agree to our
                                                         <button  className="text-primary">Terms of Use</button>
                                                            and
                                                         <button  className="text-primary">Privacy Policy.</button>
                                                 </span>
                                            </label>
                                        </div>
                                        <button className="btn btn-block btn-primary">Register Now</button>
                                        <p className="my-5 text-center">
                                            Already have an account? <button className="text-primary">Login</button>
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
    return {
        registering
    };
}

const connectedRegisterPage = connect(mapStateToProps)(Signup);
export { connectedRegisterPage as Signup };