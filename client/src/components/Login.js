import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

export class Login extends Component {
    render() {
        return (
            <section className="padding-y-100 bg-light">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 mx-auto">
                            <div className="card shadow-v2">
                                <div className="card-header border-bottom">
                                    <h4 className="mt-4">
                                        Log In to Your Professor Robot Account!
                                    </h4>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col my-2">
                                            <button className="btn btn-block btn-facebook">
                                                <i className="ti-facebook mr-1"></i>
                                                <span>Facebook Sign in</span>
                                            </button>
                                        </div>
                                        <div className="col my-2">
                                            <button className="btn btn-block btn-google-plus">
                                                <i className="ti-google mr-1"></i>
                                                <span>Google Sign in</span>
                                            </button>
                                        </div>
                                    </div>
                                    <p className="text-center my-4">
                                        OR
                                    </p>
                                    <form action="#" method="POST" className="px-lg-4">
                                        <div className="input-group input-group--focus mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-white ti-email"></span>
                                            </div>
                                            <input type="text" className="form-control border-left-0 pl-0"
                                                   placeholder="Email"/>
                                        </div>
                                        <div className="input-group input-group--focus mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-white ti-lock"></span>
                                            </div>
                                            <input type="password" className="form-control border-left-0 pl-0"
                                                   placeholder="Password"/>
                                        </div>
                                        <div className="d-md-flex justify-content-between my-4">
                                            <label className="ec-checkbox check-sm my-2 clearfix">
                                                <input type="checkbox" name="checkbox"/>
                                                <span className="ec-checkbox__control"></span>
                                                <span className="ec-checkbox__lebel">Remember Me</span>
                                            </label>
                                            <a href="page-recover-password.html" className="text-primary my-2 d-block">Forgot
                                                password?</a>
                                        </div>
                                        <button className="btn btn-block btn-primary">Log In</button>
                                        <p className="my-5 text-center">
                                            Don’t have an account? <Link to="/signup"
                                                                         class="text-primary">Register</Link>
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