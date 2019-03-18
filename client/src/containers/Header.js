import React, {Component} from 'react';
import { Link} from "react-router-dom";

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
                                    <Link to={"/"}>support@csma-js.com</Link>
                                </div>
                            </li>
                            <li className="list-inline-item mr-3">
                                <div className="d-flex align-items-center">
                                    <i className="ti-headphone mr-2"/>
                                    <Link to={"/"}>+8801740411513</Link>
                                </div>
                            </li>
                        </ul>
                        <ul className="list-inline mb-0">
                            <li className="list-inline-item mr-0 p-3 border-right border-left border-white-0_1">
                                <Link ><i className="ti-facebook"/></Link>
                            </li>
                            <li className="list-inline-item mr-0 p-3 border-right border-white-0_1">
                                <Link><i className="ti-twitter"/></Link>
                            </li>
                            <li className="list-inline-item mr-0 p-3 border-right border-white-0_1">
                                <Link><i className="ti-vimeo"/></Link>
                            </li>
                            <li className="list-inline-item mr-0 p-3 border-right border-white-0_1">
                                <Link ><i className="ti-linkedin"/></Link>
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