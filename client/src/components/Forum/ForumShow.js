import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import axios from 'axios';
class ForumShow extends Component {

    constructor(props) {
        super(props);

        this.state ={
            post:{}
        };
    }

    componentDidMount(){
        axios
            .get(`http://localhost:4000/forum/${this.props.match.params.id}`)
            .then(response => {
                this.setState({ post: response.data });
                console.log(response.data)
            })
    }
    render() {


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
                                </div>
                            </div>
                        </div>
                    </div>
                        <div className="card shadow-v5 mt-5 padding-40">
                            <h4>
                                Leave a Reply
                            </h4>

                            <form action="#" method="POST">

                                <textarea className="form-control mb-4" rows="5" placeholder="Your text *"></textarea>
                                <button className="btn btn-primary">Post Comment</button>
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