import React, {Component} from 'react';
import {connect} from "react-redux";
import Modal from 'react-responsive-modal';
import {ClipLoader} from 'react-spinners';
import SimpleReactValidator from "simple-react-validator";
import {profileAction, userActions} from "../../_actions";
import axios from 'axios/index';



class ElementCallToAction extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            loading: false,
            user: this.props.user.user

        };
        this.validator = new SimpleReactValidator(
            {
                element: message => <div className="alert text-danger bg-danger-0_1 px-4 py-3" role="alert">
                    {message}
                </div>
            }
        );
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }



    handleSubmit(event) {
        event.preventDefault();

        this.setState({submitted: true});
        const {user} = this.state;
        const {dispatch} = this.props;
        if (this.validator.allValid()) {
            console.log(user)
            dispatch(userActions.updateProfile(user));
            this.setState({loading:true})
            axios.get('http://127.0.0.1:4000/scrapping/'+user._id).then(res=>{
                console.log(res)
                this.setState({open:false})
                dispatch(profileAction.getLinkedin(res.data))
            })

        } else {
            this.validator.showMessages();
            // rerender to show messages for the first time
            this.forceUpdate();
        }
    }

    handleChange(event) {
        const {name, value} = event.target;
        const {user} = this.state;
        console.log(user);
        this.setState({
            user: {
                ...user,
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

    render() {
        var {user} = this.state
        var {profile} = this.props.profile
        var {authentication} = this.props
        console.log(authentication.loggedIn)
        if ((profile.skills.length > 0 || profile.education.length > 0 || profile.position.leading > 0) && authentication.loggedIn)
            return null;
        if (!authentication.loggedIn)
            return null;
        else
            return (
                <section className="bg-primary py-5">
                    <Modal open={this.state.open} onClose={this.onCloseModal} center>
                        <div className='sweet-loading'>
                            <ClipLoader
                                sizeUnit={"px"}
                                size={150}
                                color={'#123abc'}
                                loading={this.state.loading}
                            />
                        </div>
                        <form onSubmit={this.handleSubmit} name="form">


                            <div className="border-bottom mb-4 pb-4">
                                <h4 className="mb-4">
                                    Social Account
                                </h4>
                                <div className="form-group row">
                                    <label className="col-md-3 col-form-label text-dark">Linkdin</label>
                                    <div className="col-md-9">
                                        <input disabled={this.state.loading} type="text" className="form-control" name="linkedin_url"
                                               value={user.linkedin_url} onChange={this.handleChange}/>
                                    </div>
                                </div>
                                {this.validator.message('linkedin_url', user.linkedin_url, 'required|url')}

                            </div>

                            <div className="my-5">
                                <button className="btn btn-success m-2" disabled={this.state.loading}>Update Profile</button>
                                <button className="btn btn-danger m-2" disabled={this.state.loading}>Cancel</button>
                            </div>
                        </form>

                    </Modal>
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="d-md-flex justify-content-center align-items-center">
                                    <p className="mb-0 mr-4 lead">
                                        Import your curriculum vitae from LinkedIn
                                    </p>
                                    <button onClick={this.onOpenModal} className="btn btn-outline-white"><i
                                        className="ti-linkedin"/> Purchase Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            );
    }
}

function mapStateToProps(state) {
    const {users, authentication, profile} = state;
    const {user} = authentication;
    return {
        authentication,
        users,
        profile,
        user
    };
}

const connectedHomePage = connect(mapStateToProps)(ElementCallToAction);
export {connectedHomePage as ElementCallToAction};

