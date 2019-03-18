import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

export default class Header extends Component {
    render() {
        return (
            <header className="site-header bg-dark text-white-0_5">
                <div className="container">
                    <div className="row align-items-center justify-content-between mx-0">
                        <ul className="list-inline d-none d-lg-block mb-0">
                            <li className="list-inline-item mr-3">
                                <div className="d-flex align-items-center">
                                    <i className="ti-email mr-2"/>
                                    <a href="mailto:support@educati.com">support@csma-js.com</a>
                                </div>
                            </li>
                            <li className="list-inline-item mr-3">
                                <div className="d-flex align-items-center">
                                    <i className="ti-headphone mr-2"/>
                                    <a href="tel:+8801740411513">+8801740411513</a>
                                </div>
                            </li>
                        </ul>
                        <ul className="list-inline mb-0">
                            <li className="list-inline-item mr-0 p-3 border-right border-left border-white-0_1">
                                <a href="#"><i className="ti-facebook"/></a>
                            </li>
                            <li className="list-inline-item mr-0 p-3 border-right border-white-0_1">
                                <a href="#"><i className="ti-twitter"></i></a>
                            </li>
                            <li className="list-inline-item mr-0 p-3 border-right border-white-0_1">
                                <a href="#"><i className="ti-vimeo"></i></a>
                            </li>
                            <li className="list-inline-item mr-0 p-3 border-right border-white-0_1">
                                <a href="#"><i className="ti-linkedin"></i></a>
                            </li>
                        </ul>
                        <ul className="list-inline mb-0">
                            <li className="list-inline-item mr-0 p-md-3 p-2 border-right border-left border-white-0_1">
                                <Link to="/login">Login</Link>
                            </li>
                            <li className="list-inline-item mr-0 p-md-3 p-2 border-right border-white-0_1">
                                <Link to="/signup">Register</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
        )
    }
}