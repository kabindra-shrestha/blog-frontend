import {userListConstants} from '../_constants';

const initialState = {
    fetching: false,
    userListStatus: false,
    userListMessage: ''
};

export function userList(state = initialState, action) {
    switch (action.type) {
        case userListConstants.USER_LIST_REQUEST:
            return {
                fetching: true,
            };
        case userListConstants.USER_LIST_SUCCESS:
            return {
                userListStatus: true,
                userListMessage: "Users Fetched Successfully.",
                userListData: action.userList
            };
        case userListConstants.USER_LIST_FAILURE:
            return {
                userListStatus: false,
                userListMessage: action.error,
            };
        case userListConstants.LOGOUT:
            return {};
        default:
            return state
    }
}