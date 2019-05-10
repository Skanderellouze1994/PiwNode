import React, {Component} from 'react';
import {Link} from "react-router-dom";
import connect from "react-redux/es/connect/connect";


class Menu extends Component {
    render() {
        return (
            <nav className="ec-nav sticky-top bg-white" style={{position: 'relative',zIndex:'2'}}>
                <div className="container">
                    <div className="navbar p-0 navbar-expand-lg">
                        <div className="navbar-brand">
                            <Link to="/home" className="logo-default"><img alt="" src="assets/img/logo-black.png"/></Link>
                        </div>
                        <span aria-expanded="false" className="navbar-toggler ml-auto collapsed"
                              data-target="#ec-nav__collapsible" data-toggle="collapse">
                            <div className="hamburger hamburger--spin js-hamburger">
                            <div className="hamburger-box">
                            <div className="hamburger-inner"/>
                            </div>
                            </div>
                        </span>
                        <div className="collapse navbar-collapse when-collapsed" id="ec-nav__collapsible">
                            <ul className="nav navbar-nav ec-nav__navbar ml-auto">
                                <li className="nav-item nav-item__has-megamenu megamenu-col-2">
                                    <Link to="/home" className="nav-link" >Home</Link>
                                </li>

                                <li className="nav-item">
                                    <Link to="/all" className="nav-link">Training Sessions</Link>
                                    <ul className="dropdown-menu">
                                        <li><Link to="/all" className="nav-link__list">All training sessions</Link></li>
                                    </ul>
                                </li>


                                <li className="nav-item nav-item__has-dropdown">
                                    <Link to="/addTrainingSession" className="nav-link dropdown-toggle" data-toggle="dropdown">Forum</Link>
                                    <ul className="dropdown-menu">
                                        <li><Link to="/forumall" className="nav-link__list"> Forum </Link></li>
                                        <li><Link to="/responses" className="nav-link__list"> Top responses </Link></li>
                                    </ul>
                                </li>
                                <li className="nav-item ">
                                    <Link to="/TutorStream" className="nav-link "> Streaming </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}
function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users,
        authentication
    };
}

const connectedHomePage = connect(mapStateToProps)(Menu);
export { connectedHomePage as Menu };
