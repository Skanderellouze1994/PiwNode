import {profileConstants} from "../_constants/profile.constants";

export function profile(state = {}, action) {
    switch (action.type) {
        case profileConstants.GETPROFILE_REQUEST:
            return {
                loading: true
            };
        case profileConstants.GETPROFILE_SUCCESS:
            return {
                profile: action.profile
            };
        default:
            return state
    }
}
