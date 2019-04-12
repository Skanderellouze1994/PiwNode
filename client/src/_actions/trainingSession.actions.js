import {trainingSessionService} from "../_services";
import {alertActions} from "./alert.actions";
import {userConstants} from "../_constants";
import {history} from "../_helpers";
import {trainingSessionConstants} from "../_constants/trainingSession.constants";

export const trainingSessionAction ={
    addTrainingSession,
    getAll,
};

function addTrainingSession(id , session) {
    return dispatch => {
        dispatch(request( session ));
        console.log(session)
        trainingSessionService.addTrainingSession(id, session)
            .then(
                session => {
                    console.log(session);
                    dispatch(success(session));
                    //history.push('/all');
                },
                error => {
                    dispatch(failure("error in action"));
                    dispatch(alertActions.error("Error"));
                }
            );
    };
    function request(session) { return { type: trainingSessionConstants.ADD_SESSION_REQUEST, session } }
    function success(session) { return { type: trainingSessionConstants.ADD_SESSION_SUCCESS, session } }
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