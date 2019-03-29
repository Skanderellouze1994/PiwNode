import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import axios from 'axios';

class Forum extends Component {

    constructor(props){
        super(props)
        this.state={forum:[]};
    }
    componentWillMount() {
        axios.get('http://localhost:4000/forum/').then(res=>this.setState({forum:res.data}))
    }
    render() {
        if(!this.state.forum)
            return null

        return (

            <div>
                <div className="py-5 bg-cover text-white" data-dark-overlay="5">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-md-6">
                                <h2>Forum</h2>
                            </div>

                        </div>
                    </div>
                </div>

                <section className="pt-5 paddingBottom-100 bg-light-v2">
                    <div className="container">
                        {this.state.forum.map(f=>
                        {return(                        <div className="row">
                            <div className="col-lg-12">
                                <div className="list-card marginTop-40">

                                    <div className="col-md-12 px-md-0">
                                        <div className="card height-100p shadow-v1">
                                            <div className="card-body">
                                                <a href="#" className="h4 mb-3">
                                                    {f.subject}
                                                </a>
                                                <p className="mb-0">
                                                    {f.description}
                                                </p>
                                            </div>
                                            <div className="card-footer">
                                                <div className="media">
                                                    <img className="iconbox" src="assets/img/avatar/4.jpg" alt />
                                                    <div className="media-body ml-4">
                                                        {f.datePost}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> {/* END col-md-8*/}
                                </div> {/* END list-card*/}

                            </div> {/* END col-lg-9 */}

                        </div> )})}

                    </div> {/* END container*/}
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

const connectedHomePage = connect(mapStateToProps)(Forum);
export { connectedHomePage as Forum };