import {profileConstants} from "../_constants/profile.constants";

const iState = {
    loaded: false,
    profile: {
        position: [],
        education: [],
        skills: [],

    }
}

let prof = JSON.parse(localStorage.getItem('profile'));
let linkedin = JSON.parse(localStorage.getItem('linkedin'));
const initialState = prof ? {profile: prof, loaded: true,linkedin:linkedin?linkedin:{}} : iState;

export function profile(state = initialState, action) {

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
        case profileConstants.ADD_EDUCATION:
            return {
                profile: action.profile,
                loaded: true
            };
        case profileConstants.DELETE_EDUCATION:
            return {
                profile: action.profile,
                loaded: true
            };
        case profileConstants.UPDATE_EDUCATION:
            return {
                profile: action.profile,
                loaded: true
            };
        case profileConstants.GET_LINKEDIN:
            return {
                ...state,
                linkedin:action.profile
            };
        case profileConstants.REMOVE_PROFILE:
            return iState;
        default:
            return state
    }
}
