import {profileConstants} from "../_constants/profile.constants";

const iState = {
    loaded: false,
    profile: {
        position: [],
        education: [],
        skills: [],

    }
}

export function profile(state = iState, action) {
    switch (action.type) {
        case profileConstants.GETPROFILE_REQUEST:
            return {
                loading: true
            };
        case profileConstants.GETPROFILE_SUCCESS:
            return {
                profile: action.profile,
                loaded: true
            };
        case profileConstants.ADD_POSITION:
            return {
                profile: action.position,
                loaded: true
            };
        case profileConstants.DELETE_POSITION:
            return {
                profile: action.position,
                loaded: true


            };
        case profileConstants.UPDATE_POSITION:
            return {
                profile: action.position,
                loaded: true
            };
        case profileConstants.UPDATE_PROFILE:
            return {
                loaded: true,
                profile: action.profile
            };
        default:
            return state
    }
}
