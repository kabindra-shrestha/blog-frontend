import {questionCreateConstants} from '../_constants';
import {questionCreateService} from '../_services';
import {alertActions} from './';

export const questionCreateActions = {
    questionCreate,
    logout
};

function questionCreate(question) {
    return dispatch => {
        dispatch(request({question}));

        questionCreateService.questionCreate(question)
            .then(
                questionCreate => {
                    dispatch(success(questionCreate));
                    dispatch(alertActions.success(questionCreate.message));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(questionCreate) {
        return {type: questionCreateConstants.QUESTION_CREATE_REQUEST, questionCreate}
    }

    function success(questionCreate) {
        return {type: questionCreateConstants.QUESTION_CREATE_SUCCESS, questionCreate}
    }

    function failure(error) {
        return {type: questionCreateConstants.QUESTION_CREATE_FAILURE, error}
    }
}

function logout() {
    questionCreateService.logout();
    return {type: questionCreateConstants.LOGOUT};
}