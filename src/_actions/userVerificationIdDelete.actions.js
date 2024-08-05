import {userVerificationIdDeleteConstants} from '../_constants';
import {userVerificationIdDeleteService} from '../_services';
import {alertActions} from './';

export const userVerificationIdDeleteActions = {
    userVerificationIdDelete,
    logout
};

function userVerificationIdDelete(username) {
    return dispatch => {
        dispatch(request({username}));

        userVerificationIdDeleteService.userVerificationIdDelete(username)
            .then(
                userVerificationIdDelete => {
                    dispatch(success(userVerificationIdDelete));
                    dispatch(alertActions.success(userVerificationIdDelete.message));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(userVerificationIdDelete) {
        return {type: userVerificationIdDeleteConstants.USER_VERIFICATION_ID_DELETE_REQUEST, userVerificationIdDelete}
    }

    function success(userVerificationIdDelete) {
        return {type: userVerificationIdDeleteConstants.USER_VERIFICATION_ID_DELETE_SUCCESS, userVerificationIdDelete}
    }

    function failure(error) {
        return {type: userVerificationIdDeleteConstants.USER_VERIFICATION_ID_DELETE_FAILURE, error}
    }
}

function logout() {
    userVerificationIdDeleteService.logout();
    return {type: userVerificationIdDeleteConstants.LOGOUT};
}