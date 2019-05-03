import React, {Component} from 'react';
import {connect} from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import {userActions} from "../../_actions";
    import axios from 'axios/index';
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';
import {history} from '../../_helpers/history'


class UpdateProfile extends Component {

    constructor(props) {
        super(props)
        this.validator = new SimpleReactValidator(
            {
                element: message => <div className="alert text-danger bg-danger-0_1 px-4 py-3" role="alert">
                    {message}
                </div>
            }
        );
        this.state = {
            user: props.user.user,
            photo: null
        }
        console.log(this.state)
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onUpdate = this.onUpdate.bind(this);

    }

    async handleSubmit(event) {
        event.preventDefault();

        this.setState({submitted: true});
        const {user} = this.state;
        const {dispatch} = this.props;
        if (this.validator.allValid()) {

            console.log(user)
           await dispatch(userActions.updateProfile(user));
          //  await history.push('/profil')

        } else {
            this.validator.showMessages();
            // rerender to show messages for the first time
            this.forceUpdate();
        }
    }

    handleChange(event) {
        const {name, value} = event.target;
        const {user} = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            },


        });
        console.log(user);
    }

    onUpdate(e) {
        const {user} = this.state;


        const formData = new FormData();
        formData.append('myImage', e.target.files[0]);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post("/auth/upload", formData, {
            onUploadProgress: progressEvent => {
                console.log(Math.round(progressEvent.loaded / progressEvent.total) * 100)
            }
        })
            .then((response) => {
                this.setState({
                    user: {
                        ...user,
                        profile_photo:response.data

                    }
                })
            }).catch((error) => {
        });


    }

    render() {
        const {user} = this.state;

        return (
            <div className="tab-pane fade active show" id="Tabs_1-5" role="tabpanel">


                <form onSubmit={this.handleSubmit} name="form">
                    <div className="border-bottom mb-4 pb-4">
                        <h4>
                            Upload Avatar
                        </h4>
                        <div className="media align-items-end mt-4">
                            <div className="position-relative">
                                <input type="file" className="opacity-0 position-absolute as-parent"/>
                                <img
                                    src={user.profile_photo ? user.profile_photo : "assets/img/person.png"}
                                    width="200" height="200"
                                />
                            </div>
                            <div className="media-body ml-4 mb-4 mb-md-0">
                                <p>
                                    JPG or PNG 200x200 px
                                </p>

                                <button className="btn btn-outline-primary">
                                    <input onChange={this.onUpdate} type="file"
                                           className="opacity-0 position-absolute"/>
                                    Upload
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="border-bottom mb-4 pb-4">
                        <h4 className="mb-4">
                            Manage your Account
                        </h4>
                        <div className="form-group row">
                            <label className="col-md-3 col-form-label text-dark">Username</label>
                            <div className="col-md-9">
                                <input name="username" type="text" className="form-control" value={user.username}
                                       onChange={this.handleChange}/>
                            </div>
                        </div>
                        {this.validator.message('username', user.username, 'required')}
                        <div className="form-group row">
                            <label className="col-md-3 col-form-label text-dark">Full Name</label>
                            <div className="col-md-9">
                                <input name="name" type="text" className="form-control" value={user.name}
                                       onChange={this.handleChange}/>
                            </div>
                        </div>
                        {this.validator.message('name', user.name, 'required')}
                        <div className="form-group row">
                            <label className="col-md-3 col-form-label text-dark">Email</label>
                            <div className="col-md-9">
                                <input name="email" type="email" className="form-control" value={user.email}
                                       onChange={this.handleChange}/>
                            </div>
                        </div>
                        {this.validator.message('email', user.email, 'required|email')}

                        <div className="form-group row">
                            <label className="col-md-3 col-form-label text-dark">Phone</label>
                            <div className="col-md-9">
                                <input name="tel" type="tel" className="form-control" value={user.tel}
                                       onChange={this.handleChange}/>
                            </div>
                        </div>
                        {this.validator.message('tel', user.tel, 'required|phone')}

                        <div className="form-group row">
                            <label className="col-md-3 col-form-label text-dark">Location</label>
                            <div className="col-md-9">
                                <input name="address" type="text" className="form-control" value={user.address}
                                       onChange={this.handleChange}/>
                            </div>
                        </div>
                        {this.validator.message('address', user.address, 'required|min:10')}
                        <div className="form-group row">
                            <label className="col-md-3 col-form-label text-dark">Birthday</label>
                            <div className="col-md-9">
                                <input name="birthday" type="date" className="form-control"
                                       value={user.birthday.substr(0, 10)} onChange={this.handleChange}/>
                            </div>
                        </div>
                        {this.validator.message('birthday', user.birthday, 'required')}

                    </div>

                    <div className="border-bottom mb-4 pb-4">
                        <h4 className="mb-4">
                            Social Account
                        </h4>
                        <div className="form-group row">
                            <label className="col-md-3 col-form-label text-dark">Facebook</label>
                            <div className="col-md-9">
                                <input type="text" className="form-control" name="facebook_url"
                                       value={user.facebook_url} onChange={this.handleChange}/>
                            </div>
                        </div>
                        {this.validator.message('facebook_url', user.facebook_url, 'url')}

                        <div className="form-group row">
                            <label className="col-md-3 col-form-label text-dark">Github</label>
                            <div className="col-md-9">
                                <input type="text" className="form-control" name="github_url" value={user.github_url}
                                       onChange={this.handleChange}/>
                            </div>
                        </div>
                        {this.validator.message('github_url', user.github_url, 'url')}

                        <div className="form-group row">
                            <label className="col-md-3 col-form-label text-dark">Linkdin</label>
                            <div className="col-md-9">
                                <input type="text" className="form-control" name="linkedin_url"
                                       value={user.linkedin_url} onChange={this.handleChange}/>
                            </div>
                        </div>
                        {this.validator.message('linkedin_url', user.linkedin_url, 'url')}

                    </div>

                    <div className="my-5">
                        <button className="btn btn-success m-2">Update Profile</button>
                        <button className="btn btn-danger m-2">Cancel</button>
                    </div>
                </form>
            </div>

        );
    }
}

function mapStateToProps(state) {
    const {users, authentication} = state;
    const {user} = authentication;
    return {
        user,
        users
    };
}

const connectedHomePage = connect(mapStateToProps)(UpdateProfile);
export {connectedHomePage as UpdateProfile};
