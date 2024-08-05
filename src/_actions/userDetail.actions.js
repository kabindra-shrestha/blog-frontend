import {userDetailConstants} from '../_constants';
import {userDetailService} from '../_services';
import {alertActions} from './';

export const userDetailActions = {
    userDetail,
    logout
};

function userDetail(username) {
    return dispatch => {
        dispatch(request({username}));

        userDetailService.userDetail(username)
            .then(
                userDetail => {
                    dispatch(success(userDetail));
                    // dispatch(alertActions.success(userDetail.message));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(userDetail) {
        return {type: userDetailConstants.USER_DETAIL_REQUEST, userDetail}
    }

    function success(userDetail) {
        return {type: userDetailConstants.USER_DETAIL_SUCCESS, userDetail}
    }

    function failure(error) {
        return {type: userDetailConstants.USER_DETAIL_FAILURE, error}
    }
}

function logout() {
    userDetailService.logout();
    return {type: userDetailConstants.LOGOUT};
}