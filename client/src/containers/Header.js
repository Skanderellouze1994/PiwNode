import React, {Component} from 'react';
import { Link} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import initialState from "../_reducers/index";


class Header extends Component {
    constructor(props) {
        super(props);
       // this.state = {loggingIn: false};
        //this.props = initialState.loggedIn;
        //var user ={};
    }

    render() {
        const {authentication} = this.props;
console.log(authentication);
        //const loggingIn = this.state.loggingIn;
        //console.log(this.state.loggingIn);
        //console.log(this.props.user.user.username);
       // console.log(this.props.user);
        function f() {
            if(authentication){
                return( <Link to="/login">Login</Link>  )}
            else{
                return( <a>Welcome <b>{authentication.user.user.username}</b></a>)}


        }

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
                                {f()}
                            </li>
                            <li className="list-inline-item mr-0 p-md-3 p-2 border-right border-left border-white-0_1">
                                {authentication ?  (
                                    <Link to="/profil">My profile</Link>
                                ): (
                                    <a></a>
                                )}
                            </li>
                            <li className="list-inline-item mr-0 p-md-3 p-2 border-right border-white-0_1">
                                {authentication ? (
                                    <Link to="/login">Logout</Link>
                                ) : (
                                    <Link to="/signup">Register</Link>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            </header>

        )

    }

}
function mapStateToProps(state) {
    const { users, authentication } = state;

    console.log();
    return {
        authentication,
        users
    };
}

const connectedHomePage = connect(mapStateToProps)(Header);
export { connectedHomePage as Header };