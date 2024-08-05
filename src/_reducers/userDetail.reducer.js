import {userDetailConstants} from '../_constants';

const initialState = {
    fetching: false,
    userDetailStatus: false,
    userDetailMessage: ''
};

export function userDetail(state = initialState, action) {
    switch (action.type) {
        case userDetailConstants.USER_DETAIL_REQUEST:
            return {
                fetching: true,
            };
        case userDetailConstants.USER_DETAIL_SUCCESS:
            return {
                userDetailStatus: true,
                userDetailMessage: "User Fetched Successfully.",
                userDetailData: action.userDetail
            };
        case userDetailConstants.USER_DETAIL_FAILURE:
            return {
                userDetailStatus: false,
                userDetailMessage: action.error,
            };
        case userDetailConstants.LOGOUT:
            return {};
        default:
            return state
    }
}