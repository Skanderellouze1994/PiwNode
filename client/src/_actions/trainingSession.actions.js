import {trainingSessionService} from "../_services";
import {alertActions} from "./alert.actions";
import {userConstants} from "../_constants";

export const trainingSessionAction ={
    addTrainingSession,
    getAll,
};

function addTrainingSession(id , session) {
    return dispatch => {
        dispatch(request({ id }));
        trainingSessionService.addTrainingSession(id, session)
            .then(
                session => {
                    dispatch(success(session));
              },
                error => {
                    dispatch(failure("error.toString()"));
                    dispatch(alertActions.error("Error"));
                }
            );
    };
    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function getAll() {
   // return dispatch => {
    //    dispatch(request());

        trainingSessionService.getAll()
            .then(
                console.log("after get all")
      //          sessions => dispatch(success(sessions)),
      //          error => dispatch(failure(error.toString()))
            );
}