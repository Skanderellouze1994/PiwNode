import React, {Component} from 'react';
import {Link} from "react-router-dom";
import connect from "react-redux/es/connect/connect";


class Menu extends Component {
    render() {
        return (
            <nav className="ec-nav sticky-top bg-white">
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
                                    <Link to="/" className="nav-link dropdown-toggle" href="#" data-toggle="dropdown">Home</Link>
                                    <div className="dropdown-menu left-auto p-2 p-md-4">
                                        <div className="row mx-0">
                                            <div className="col-lg-6">
                                                <ul className="list-unstyled">
                                                    <li><Link to="/login" className="nav-link__list px-0">Demo School</Link>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="col-lg-6">
                                                <ul className="list-unstyled">
                                                    <li><Link to="/" className="nav-link__list px-0" href="#">Demo Online
                                                        University</Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </li>

                                <li className="nav-item nav-item__has-dropdown">
                                    <Link to="/addTrainingSession" className="nav-link dropdown-toggle" data-toggle="dropdown">Training Sessions</Link>
                                    <ul className="dropdown-menu">
                                        <li><Link to="/all" className="nav-link__list">All training sessions</Link></li>
                                        <li><Link to="/addTrainingSession" className="nav-link__list">Add a training session</Link></li>
                                    </ul>
                                </li>

                                <li className="nav-item nav-item__has-dropdown">
                                    <Link to="/" className="nav-link dropdown-toggle" href="#" data-toggle="dropdown"> Blog </Link>
                                </li>

                                <li className="nav-item nav-item__has-dropdown">
                                    <Link to="/" className="nav-link dropdown-toggle" href="#" data-toggle="dropdown"> Shop </Link>
                                </li>

                                <li className="nav-item nav-item__has-megamenu">
                                    <Link to="/" className="nav-link dropdown-toggle" href="#" data-toggle="dropdown">Elements</Link>
                                    <div className="dropdown-menu p-2 p-md-4">
                                        <div className="row mx-0">
                                            <div className="col-md-3">
                                                <ul className="list-unstyled">
                                                    <li><Link to="/" className="nav-link__list px-0"
                                                           href="#">Accordions</Link></li>
                                                </ul>
                                            </div>
                                            <div className="col-md-3">
                                                <ul className="list-unstyled">
                                                    <li><Link to="/" className="nav-link__list px-0" href="#">Card</Link>
                                                    </li>
                                                    <li><Link to="/" className="nav-link__list px-0"
                                                           >Lightbox</Link></li>
                                                    <li><Link to="/" className="nav-link__list px-0" href="element-list-group.html">List
                                                        Group</Link></li>
                                                </ul>
                                            </div>
                                            <div className="col-md-3">
                                                <ul className="list-unstyled">
                                                    <li><Link to="/" className="nav-link__list px-0"
                                                           >Tables</Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="nav-toolbar">
                            <ul className="navbar-nav ec-nav__navbar">
                                <li className="nav-item nav-item__has-dropdown">
                                    <Link to="/" className="nav-link dropdown-toggle no-caret"  data-toggle="dropdown"><i
    className="ti-shopping-cart"/></Link>
                                    <ul className="dropdown-menu dropdown-cart" aria-labelledby="navbarDropdown">
                                        <li className="dropdown-cart__item">
                                            <div className="media">
                                                <img className="dropdown-cart__img" src="assets/img/shop/products/2.jpg"
                                                     alt=""/>
                                                <div className="media-body pl-3">
                                                    <Link to="/" className="h6">Quick intro to Python</Link>
                                                    <span className="text-primary">$199.00</span>
                                                </div>
                                            </div>
                                            <Link to="/" className="dropdown-cart__item-remove">
                                                <i className="ti-close"/>
                                            </Link>
                                        </li>
                                        <li className="dropdown-cart__item">
                                            <div className="media">
                                                <img className="dropdown-cart__img" src="assets/img/shop/products/4.jpg"
                                                     alt=""/>
                                                <div className="media-body pl-3">
                                                    <Link to="/" className="h6">Gentel intro to C++</Link>
                                                    <span className="text-primary">$45.00</span>
                                                </div>
                                            </div>
                                            <Link to="/" className="dropdown-cart__item-remove">
                                                <i className="ti-close"></i>
                                            </Link>
                                        </li>
                                        <li className="dropdown-cart__item">
                                            <div className="media">
                                                <img className="dropdown-cart__img" src="assets/img/shop/products/3.jpg"
                                                     alt=""/>
                                                <div className="media-body pl-3">
                                                    <Link to="/" className="h6">Programming 101</Link>
                                                    <span className="text-primary">$79.00</span>
                                                </div>
                                            </div>
                                            <Link to="/" className="dropdown-cart__item-remove">
                                                <i className="ti-close"></i>
                                            </Link>
                                        </li>
                                        <li className="px-2 py-4 text-center">
                                            Subtotal: <span className="text-primary font-weight-semiBold"> $275.00</span>
                                        </li>
                                        <li className="px-2 pb-4 text-center">
                                            <button className="btn btn-outline-primary mx-1">View Cart</button>
                                            <button className="btn btn-primary mx-1">Checkout</button>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item">
                                    <Link to="/" className="nav-link site-search-toggler"/>
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