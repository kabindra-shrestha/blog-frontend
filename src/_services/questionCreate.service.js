/*import config from 'config';*/

import {authHeader} from "../_helpers";
import {apisConstants} from "../_constants";

export const questionCreateService = {
    questionCreate
};

function questionCreate(question) {
    const form = new FormData();
    form.append("question", question);

    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: form
    };

    return fetch(process.env.REACT_APP_API_ENDPOINT + process.env.REACT_APP_API_VERSION_V1 + apisConstants.QUESTION_CREATE_URL, requestOptions)
        .then(handleResponse)
        .then(questionCreate => {
            return questionCreate;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    localStorage.removeItem('userData');
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                window.location.reload(true);
            }

            const error = data && (data.error_description || data.message);
            return Promise.reject(error);
        }

        return data;
    });
}