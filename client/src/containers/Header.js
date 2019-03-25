import React, {Component} from 'react';
import { Link} from "react-router-dom";
import connect from "react-redux/es/connect/connect";


class Header extends Component {
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(prevProps);
        console.log(this.props);

console.log('aaaaa');
           //this.forceUpdate();

    }
    componentDidCatch(error, errorInfo) {
        this.forceUpdate();
    }

    componentWillMount() {
       console.log(this.props);
       try {


           this.setState({username: this.props.user.user.username})
       }
       catch (e) {
           this.setState({username:""})
       }

    }

    constructor(props) {
        super(props);
this.state={username:""};
    }

    render() {
        const {authentication} = this.props;
        let auth = this.props;
       // console.log(auth.authentication.user.user.username);
        if(!this.props.user){
            auth ="";
        }else{
            auth = authentication;
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
                                <Link to="/" ><i className="ti-facebook"/></Link>
                            </li>
                            <li className="list-inline-item mr-0 p-3 border-right border-white-0_1">
                                <Link to="/"><i className="ti-twitter"/></Link>
                            </li>
                            <li className="list-inline-item mr-0 p-3 border-right border-white-0_1">
                                <Link to="/"><i className="ti-vimeo"/></Link>
                            </li>
                            <li className="list-inline-item mr-0 p-3 border-right border-white-0_1">
                                <Link to="/" ><i className="ti-linkedin"/></Link>
                            </li>
                        </ul>
                        <ul className="list-inline mb-0">
                            {!auth &&
                            <li className="list-inline-item mr-0 p-md-3 p-2 border-right border-left border-white-0_1">

                                <Link to="/login">Login</Link>

                            </li>
                            }
                            <li className="list-inline-item mr-0 p-md-3 p-2 border-right border-white-0_1">
                                {auth ? (
                                    <div className="dropdown" style={{zIndex : 9999}}>
                                        <Link to="/" className="dropdown-toggle" data-toggle="dropdown">
                                            <span><b>{this.state.username}</b></span>
                                            <img className="iconbox iconbox-sm mx-1" src="assets/img/avatar/4.jpg" alt="aaa"  />
                                        </Link>
                                        <div className="dropdown-menu">
                                            <Link to="/profil" className="dropdown-item">
                                                <i className="ti-user mr-2" />
                                                <span className="mr-2">
                                                        My profile
                                                </span>
                                            </Link>
                                            <div className="dropdown-divider" />
                                            <Link to="/login" className="dropdown-item" >
                                                <i className="ti-back-left mr-2" />
                                                <span className="mr-2">Logout</span>
                                            </Link>
                                        </div>
                                    </div>
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
    const { user } = authentication;
    return {
        user,
        users,
        authentication
    };
}

const connectedHomePage = connect(mapStateToProps)(Header);
export { connectedHomePage as Header };