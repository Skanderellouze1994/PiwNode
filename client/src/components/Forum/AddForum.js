import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import axios from 'axios';
import {history} from "../../_helpers";


class AddForum extends Component {
    constructor(props){
        super(props)
        this.onChangePostSubject = this.onChangePostSubject.bind(this);
        this.onChangePostDescription = this.onChangePostDescription.bind(this);
        this.onChangePostPic = this.onChangePostPic.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            pic: '',
            description: '',
            subject: ''
        }
    }

    onChangePostDescription(e) {
        this.setState({
            description: e.target.value
        });
    }
    onChangePostPic(e) {
        this.setState({
            pic: e.target.value
    });
    }

    onChangePostSubject(e) {
        this.setState({
            subject: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        console.log(`Form submitted:`);
        console.log(`post Description: ${this.state.description}`);
        console.log(`post subject: ${this.state.subject}`);
        console.log(`post pic: ${this.state.pic}`);


        const newPost = {
            description: this.state.description,
            subject: this.state.subject,
            pic: this.state.pic
        }

            axios.post('/forum/add/'+this.props.user.user._id,newPost)
                .then(
                    res => {
                        setTimeout(()=>window.location.reload(),0);
                        history.push('/forum/show/'+res.data._id);
                    })




    }




    render() {
        const {user}=this.props;
        console.log("props"+this.props);

        return (
<div>
            <div>
                <div className="py-5 bg-cover text-white" data-dark-overlay="5">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-md-6">
                                <h2>Add a post</h2>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
    <section className="pt-5 paddingBottom-100 bg-light-v2">
        <div className="container">
            <form onSubmit={this.onSubmit} enctype="multipart/form-data">
                <div className="form-group">
                    <label>Subject: </label>
                    <input  type="text"
                            className="form-control"
                            value={this.state.subject}
                            onChange={this.onChangePostSubject}/>
                </div>
                <div className="form-group">
                    <label>Description: </label>
                    <textarea  type="text"
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangePostDescription}/>
                </div>
                <div className="form-group">
                    <label>Picture: </label>
                    <input  type="file"
                               className="form-control"
                               value={this.state.pic}
                               onChange={this.onChangePostPic}/>
                </div>

                <div className="form-group">
                    <input type="submit" value="Create post" className="btn btn-primary" />
                </div>
            </form>
        </div>
    </section>
</div>
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

const connectedHomePage = connect(mapStateToProps)(AddForum);
export { connectedHomePage as AddForum };
