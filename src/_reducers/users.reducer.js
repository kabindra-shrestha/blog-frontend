import {userConstants} from '../_constants';

let userData = JSON.parse(localStorage.getItem('userData'));

const initialState = {
    loggedIn: !!userData,
    loading: false,
    error: '',
    usersStatus: false,
    usersMessage: '',
    usersData: {}
};

export function users(state = initialState, action) {
    switch (action.type) {
        case userConstants.GETALL_REQUEST:
            return {
                loggingIn: true
            };
        case userConstants.GETALL_SUCCESS:
            return {
                loggedIn: true,
                usersStatus: true,
                usersMessage: "User Fetched Successfully.",
                usersData: action.users
            };
        case userConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        case userConstants.LOGOUT:
            return {};
        default:
            return state
    }
}