import {profileService, trainingSessionService} from "../_services";
import {alertActions} from "./alert.actions";
import {profileConstants, userConstants} from "../_constants";

export const profileAction ={
    getProfile,
    updateProfile,
    addPosition,
    deletePosition,
    updatePosition,
    addEducation,
    deleteEducation,
    updateEducation
};

function getProfile(id) {
    return dispatch => {
        profileService.getProfile(id)
            .then(

                profile => {
                  //  console.log(profile)
                    dispatch(success(profile));
                },
                error => {
                    console.log(error)
                   // dispatch(failure("error.toString()"));
                  //  dispatch(alertActions.error("Error"));
                }
            );
    };
    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(profile) { return { type: profileConstants.GETPROFILE_SUCCESS, profile } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}
function updateProfile(profile) {
    return dispatch => {
        profileService.updateProfile(profile)
            .then(

                profile => {
                    //  console.log(profile)
                    dispatch(success(profile));
                },
                error => {
                    console.log(error)
                    // dispatch(failure("error.toString()"));
                    //  dispatch(alertActions.error("Error"));
                }
            );
    };
    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(profile) { return { type: profileConstants.UPDATE_PROFILE, profile } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}
function addPosition(id,position) {
    return dispatch => {
        profileService.addPosition(id,position)
            .then(

                position => {
                    //  console.log(profile)
                    dispatch(success(position));
                },
                error => {
                    // dispatch(failure("error.toString()"));
                    //  dispatch(alertActions.error("Error"));
                }
            );
    };
    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(position) { return { type: profileConstants.ADD_POSITION, position } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}
function deletePosition(id,position) {
    return dispatch => {
        profileService.deletePosition(id,position)
            .then(

                position => {
                      console.log(position)
                   dispatch(success(position));
                },
                error => {
                    // dispatch(failure("error.toString()"));
                    //  dispatch(alertActions.error("Error"));
                }
            );
    };
    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(position) { return { type: profileConstants.DELETE_POSITION, position } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}
function updatePosition(id,position) {
    return dispatch => {
        //console.log(position)
        profileService.updatePosition(id,position)
            .then(

                position => {
                    // console.log(position)
                    dispatch(success(position));
                },
                error => {
                    // dispatch(failure("error.toString()"));
                    //  dispatch(alertActions.error("Error"));
                }
            );
    };
    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(position) { return { type: profileConstants.UPDATE_POSITION, position } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}
function addEducation(id,education) {
    return dispatch => {
        profileService.addEducation(id,education)
            .then(

                profile => {
                    //  console.log(profile)
                    dispatch(success(profile));
                },
                error => {
                    // dispatch(failure("error.toString()"));
                    //  dispatch(alertActions.error("Error"));
                }
            );
    };
    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(profile) { return { type: profileConstants.ADD_EDUCATION, profile } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}
function deleteEducation(id,education) {
    return dispatch => {
        profileService.deleteEducation(id,education)
            .then(

                profile => {
                    //console.log(profile)
                    dispatch(success(profile));
                },
                error => {
                    // dispatch(failure("error.toString()"));
                    //  dispatch(alertActions.error("Error"));
                }
            );
    };
    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(profile) { return { type: profileConstants.DELETE_EDUCATION, profile } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}
function updateEducation(id,education) {
    return dispatch => {
        //console.log(position)
        profileService.updateEducation(id,education)
            .then(

                profile => {
                     console.log(profile)
                    dispatch(success(profile));
                },
                error => {
                    // dispatch(failure("error.toString()"));
                    //  dispatch(alertActions.error("Error"));
                }
            );
    };
    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(profile) { return { type: profileConstants.UPDATE_EDUCATION, profile } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}
