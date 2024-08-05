import {questionCreateConstants} from '../_constants';

const initialState = {
    fetching: false,
    questionCreateStatus: false,
    questionCreateMessage: ''
};

export function questionCreate(state = initialState, action) {
    switch (action.type) {
        case questionCreateConstants.QUESTION_CREATE_REQUEST:
            return {
                fetching: true,
            };
        case questionCreateConstants.QUESTION_CREATE_SUCCESS:
            return {
                questionCreateStatus: true,
                questionCreateMessage: action.questionCreate.message,
            };
        case questionCreateConstants.QUESTION_CREATE_FAILURE:
            return {
                questionCreateStatus: false,
                questionCreateMessage: action.error,
            };
        case questionCreateConstants.LOGOUT:
            return {};
        default:
            return state
    }
}