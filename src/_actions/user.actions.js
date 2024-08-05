import {routeConstants, userConstants} from '../_constants';
import {userService} from '../_services';
import {history} from "../_helpers";
import {alertActions} from "./alert.actions";

export const userActions = {
    getUser,
    logout
};

function getUser() {
    return dispatch => {
        dispatch(request());

        userService.getUser()
            .then(
                users => {
                    dispatch(success(users));
                    history.push(routeConstants.DASHBOARD_URL);
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() {
        return {type: userConstants.GETALL_REQUEST}
    }

    function success(users) {
        return {type: userConstants.GETALL_SUCCESS, users}
    }

    function failure(error) {
        return {type: userConstants.GETALL_FAILURE, error}
    }
}

function logout() {
    userConstants.logout();
    return {type: userConstants.LOGOUT};
}