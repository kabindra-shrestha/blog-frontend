import {loginConstants} from '../_constants';

let user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    loginStatus: false,
    loginMessage: '',
    user: user ? user : {}
};

export function login(state = initialState, action) {
    switch (action.type) {
        case loginConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
                user: action.user
            };
        case loginConstants.LOGIN_SUCCESS:
            return {
                loggingIn: true,
                loginStatus: true,
                loginMessage: "Logging Successful.",
                user: action.user
            };
        case loginConstants.LOGIN_FAILURE:
            return {
                loginStatus: false,
                loginMessage: action.error,
            };
        case loginConstants.LOGOUT:
            return {};
        default:
            return state
    }
}