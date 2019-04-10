import {profileService, trainingSessionService} from "../_services";
import {alertActions} from "./alert.actions";
import {profileConstants, userConstants} from "../_constants";

export const profileAction ={
    getProfile,
};

function getProfile(id) {
    return dispatch => {
        profileService.getProfile(id)
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
    function success(profile) { return { type: profileConstants.GETPROFILE_SUCCESS, profile } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}
