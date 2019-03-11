import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class Header extends Component {
    render(){
        return(
            <header class="site-header bg-dark text-white-0_5">
            <div class="container">
            <div class="row align-items-center justify-content-between mx-0">
            <ul class="list-inline d-none d-lg-block mb-0">
            <li class="list-inline-item mr-3">
            <div class="d-flex align-items-center">
            <i class="ti-email mr-2"></i>
            <a href="mailto:support@educati.com">support@csma-js.com</a>
        </div>
        </li>
        <li class="list-inline-item mr-3">
            <div class="d-flex align-items-center">
            <i class="ti-headphone mr-2"></i>
            <a href="tel:+8801740411513">+8801740411513</a>
            </div>
            </li>
            </ul>
            <ul class="list-inline mb-0">
            <li class="list-inline-item mr-0 p-3 border-right border-left border-white-0_1">
            <a href="#"><i class="ti-facebook"></i></a>
        </li>
        <li class="list-inline-item mr-0 p-3 border-right border-white-0_1">
            <a href="#"><i class="ti-twitter"></i></a>
        </li>
        <li class="list-inline-item mr-0 p-3 border-right border-white-0_1">
            <a href="#"><i class="ti-vimeo"></i></a>
        </li>
        <li class="list-inline-item mr-0 p-3 border-right border-white-0_1">
            <a href="#"><i class="ti-linkedin"></i></a>
        </li>
        </ul>
        <ul class="list-inline mb-0">
            <li class="list-inline-item mr-0 p-md-3 p-2 border-right border-left border-white-0_1">
            <Link to="/login" >Login</Link>
            </li>
            <li class="list-inline-item mr-0 p-md-3 p-2 border-right border-white-0_1">
            <Link to="/signup">Register</Link>
            </li>
            </ul>
            </div>
            </div>
            </header>
        )
    }
}