import {userListConstants} from '../_constants';
import {userListService} from '../_services';
import {alertActions} from './';

export const userListActions = {
    userList,
    logout
};

function userList(page) {
    return dispatch => {
        dispatch(request({page}));

        userListService.userList(page)
            .then(
                userList => {
                    dispatch(success(userList));
                    // dispatch(alertActions.success(userList.message));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(userList) {
        return {type: userListConstants.USER_LIST_REQUEST, userList}
    }

    function success(userList) {
        return {type: userListConstants.USER_LIST_SUCCESS, userList}
    }

    function failure(error) {
        return {type: userListConstants.USER_LIST_FAILURE, error}
    }
}

function logout() {
    userListService.logout();
    return {type: userListConstants.LOGOUT};
}