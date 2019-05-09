import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import axios from 'axios';
import {history} from "../../_helpers";
import Swal from "sweetalert2";
import {
    FacebookShareCount,
    GooglePlusShareCount,
    LinkedinShareCount,
    PinterestShareCount,

    FacebookShareButton,
    GooglePlusShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    PinterestShareButton,

    FacebookIcon,
    TwitterIcon,
    GooglePlusIcon,
    LinkedinIcon,
    PinterestIcon,
} from 'react-share';
var dateFormat = require('dateformat');


class ForumShow extends Component {

    constructor(props) {
        super(props);
        this.onChangeResponseDescription = this.onChangeResponseDescription.bind(this);
        this.validateResponse = this.validateResponse.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state ={
            post:{},
            resp:[],
            u:[{}],
            description: ''
        };
    }



    componentDidMount(){
        axios
            .get(`/forum/${this.props.match.params.id}`)
            .then(response => {
                this.setState({ post: response.data });
                this.setState({ resp: response.data.responses });
                console.log(response.data)
            })
    }

    onChangeResponseDescription(e) {
        this.setState({
            description: e.target.value
        });
    }




    onSubmit(e) {
        e.preventDefault();

        console.log(`Form submitted:`);
        console.log(`response Description: ${this.state.description}`);



        const newResponse = {
            description: this.state.description,
            userResponse: this.props.user.user
        }

        axios.post('forum/response/add/'+this.state.post._id+'/'+this.props.user.user._id,newResponse)
            .then(
                res => {
                    setTimeout(()=>window.location.reload(),0);

                })




    }


    validateResponse(e,id) {
        axios.put('/forum/'+this.state.post._id+'/response/validate/'+e)
            .then(
                res => {
                    Swal.fire({
                            title:'Done !',
                            text:'You validated this response',
                            type:'success',

                        }
                    )
                    Swal.clickConfirm(setTimeout(window.location.reload(),4000))
                })


    }



    render() {


        if(!this.state.post)
            return null
        const url = window.location.href;
        return (

            <div>
                <div className="py-5 bg-cover text-white" data-dark-overlay="5">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-md-6">
                                <h2>{this.state.post.subject}</h2>
                            </div>

                        </div>
                    </div>
                </div>
                <section className="pt-5 paddingBottom-150 bg-light-v2">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 mt-4">
                                <div className="card">
                                    <div className="card-body">



                                        <h2 className="my-4">
                                            {this.state.post.subject}
                                        </h2>

                                        <p>
                                            {this.state.post.description}


                                        </p>
                                        <ul className="list-inline d-inline-block py-2 px-4 shadow-v3 bg-white rounded-pill">
                                            <li className="list-inline-item">Share <span className="d-none d-md-inline-block">this post :</span></li>
                                            <li className="list-inline-item mx-0">
                                                <a className="btn btn-opacity-primary iconbox iconbox-xs">
                                                    <FacebookShareButton
                                                        url="http://github.com/Skanderellouze1994/PiwNode"
                                                        quote={url}
                                                    >
                                                        <FacebookIcon
                                                            size={32}
                                                            round />
                                                    </FacebookShareButton>
                                                </a>
                                            </li>
                                            <li className="list-inline-item mx-0">
                                                <a className="btn btn-opacity-primary iconbox iconbox-xs">
                                                    <TwitterShareButton
                                                        url={url}
                                                        title="test"
                                                        className="Demo__some-network__share-button">
                                                        <TwitterIcon
                                                            size={32}
                                                            round />
                                                    </TwitterShareButton>
                                                </a>
                                            </li>
                                            <li className="list-inline-item mx-0">
                                                <a className="btn btn-opacity-primary iconbox iconbox-xs">
                                                    <LinkedinShareButton
                                                        url="http://github.com/Skanderellouze1994/PiwNode"
                                                        title="test"
                                                        windowWidth={750}
                                                        windowHeight={600}
                                                        className="Demo__some-network__share-button">
                                                        <LinkedinIcon
                                                            size={32}
                                                            round />
                                                    </LinkedinShareButton>
                                                </a>
                                            </li>
                                            <li className="list-inline-item mx-0">
                                                <a className="btn btn-opacity-primary iconbox iconbox-xs">
                                                    <GooglePlusShareButton
                                                        url="http://github.com/Skanderellouze1994/PiwNode">
                                                        <GooglePlusIcon
                                                            size={32}
                                                            round />
                                                    </GooglePlusShareButton>
                                                </a>
                                            </li>
                                        </ul>
                                        <div className="card shadow-v5 mt-5 padding-40">
                                            {this.state.resp.map(f=>
                                            {return(

                                                <ol className="list-unstyled comments-area">
                                                    <li>

                                                        <div className="media mb-5">
                                                            <img className="iconbox iconbox-lg mr-3" src="assets/img/avatar/5.jpg" alt=""/>
                                                            <div className="media-body">

                                                                {this.props.user.user.role == 'Tutor' && f.status==false  ? <a onClick={(e) => this.validateResponse(f._id, e)}
                                                                                                                               className="float-right btn btn-outline-primary btn-pill btn-sm">
                                                                    <i className="ti-check"></i> VALIDATE
                                                                </a> : <p></p>}
                                                                {this.props.user.user.role == 'Tutor' && f.status==true  ? <p
                                                                    className="float-right btn btn-outline-primary btn-pill btn-sm">
                                                                    <i className="ti-check"></i> VALIDATED
                                                                </p> : <p></p>}
                                                                {this.props.user.user.role == 'Student' && f.status==true  ? <p
                                                                    className="float-right btn btn-outline-primary btn-pill btn-sm">
                                                                    <i className="ti-check"></i> VALIDATED
                                                                </p> : <p></p>}


                                                                <h4 className="h5 mb-0">
                                                                    {f.userResponse.username}
                                                                </h4>
                                                                <p className="text-gray">
                                                                    {dateFormat(f.dateResponse, "dddd, mmmm dS, yyyy, h:MM:ss TT")}
                                                                </p>
                                                                <p>
                                                                    {f.description}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ol>

                                            )})}
                                        </div>
                                    </div>
                                </div>
                            </div>



                        </div>
                        <div className="card shadow-v5 mt-5 padding-40">
                            <h4>
                                Leave a Reply
                            </h4>

                            <form onSubmit={this.onSubmit}>

                                <textarea className="form-control mb-4"
                                          rows="5" placeholder="Your text *"
                                          type="text"
                                          className="form-control"
                                          value={this.state.description}
                                          onChange={this.onChangeResponseDescription}
                                />
                                <input type="submit" value="Post Comment" className="btn btn-primary" />

                            </form>
                        </div>
                    </div>
                </section>


            </div>
        );
    }


}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedHomePage = connect(mapStateToProps)(ForumShow);
export { connectedHomePage as ForumShow };
