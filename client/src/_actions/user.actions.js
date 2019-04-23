import {profileConstants, userConstants} from '../_constants';
import { userService } from '../_services';
import {alertActions, profileAction} from './';
import { history } from '../_helpers';

export const userActions = {
    loginCam,
    loginFacebook,
    login,
    resetPassword,
    getNewPassword,
    logout,
    register,
    getAll,
    delete: _delete,
    updateProfile
};
function updateProfile(user) {

    return dispatch => {
       // dispatch(request({user} ));
console.log(user)
        userService.update(user)
            .then(
                user => {
                    dispatch(success(user));
                    //setTimeout(()=>window.location.reload(),0);
                   // history.push('/profil');
                },
                error => {
                    dispatch(failure("error.toString()"));
                    dispatch(alertActions.error("Username and password invalid"));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.UPDATE_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }


}
function loginCam() {
    return dispatch => {
        dispatch(request({user: {
                role: "",
                username:""
            }}));

        userService.loginCam()
            .then(
                user => {
                    dispatch(success(user));
                    setTimeout(()=>window.location.reload(),1000);
                    history.push('/profil');
                },
                error => {
                    dispatch(failure("error.toString()"));
                    dispatch(alertActions.error("Username and password invalid"));
                }
            );
    };
    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}
function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                 //setTimeout(()=>window.location.reload(),0);
                    history.push('/profil');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error("Username and password invalid"));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function resetPassword(email) {
    return dispatch => {
        dispatch(request({ email }));

        userService.resetPassword(email)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/reset');
                    dispatch(alertActions.error("Please verify your email to continue reseting your password!"));
                },
                error => {
                    dispatch(failure("error.toString()"));
                    dispatch(alertActions.error("Email invalid"));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function getNewPassword(password , confirmpassword, token) {
    return dispatch => {
        dispatch(request({ password }));

        userService.getNewPassword(password , confirmpassword, token)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/login');
                    dispatch(alertActions.success('Passwrd reset ! Please login again'));
                },
                error => {
                    dispatch(failure("error.toString()"));
                    dispatch(alertActions.error("Password invalid"));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function loginFacebook (id) {
    return dispatch => {
        dispatch(request({user: {
                role: "",
                username:""
            }}));

        userService.loginFacebook(id)
            .then(
                user => {
                    dispatch(alertActions.clear())
                    dispatch(success(user))
                    //console.log(user)
                    //setTimeout(()=>window.location.reload(),0);
                    history.push('/profil')
                },
                error => {
                    dispatch(failure("error.toString()"));
                    dispatch(alertActions.error("No account exist"));
                    history.push('/signup')
                    //dispatch(alertActions.password(error));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
profileAction.removeProfile();    //setTimeout(()=>window.location.reload(),0);
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => {
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}
