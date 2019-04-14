import {trainingSessionConstants} from "../_constants/trainingSession.constants";

export function session(state = {}, action) {
    switch (action.type) {
        case trainingSessionConstants.ADD_SESSION_REQUEST:
            return {
                loading: true
            };
        case trainingSessionConstants.ADD_SESSION_SUCCESS:
            return {
                item: action.addTrainingSession
            };
        default:
            return state
    }
}
