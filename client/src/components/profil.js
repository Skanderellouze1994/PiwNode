import React, {Component} from 'react';
import {store} from "../_helpers";
import {connect} from "react-redux";
import state from "../_reducers";


 class Profil extends Component {

    render() {
const {user}=this.props.user;
        return (
            <div>
                <p>{user.username}</p>
            </div>
        )
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

const connectedHomePage = connect(mapStateToProps)(Profil);
export { connectedHomePage as Profil };