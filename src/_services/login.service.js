/*import config from 'config';*/

import {apisConstants} from "../_constants";

export const loginService = {
    login,
    logout
};

function login(username, password) {
    const form = new FormData();
    form.append("username", username);
    form.append("password", password);
    form.append("grant_type", "password");

    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + Buffer.from(process.env.REACT_APP_BASIC_AUTH_USERNAME + ":" + process.env.REACT_APP_BASIC_AUTH_PASSWORD).toString('base64')
        },
        body: form
    };

    return fetch(process.env.REACT_APP_API_ENDPOINT + process.env.REACT_APP_API_VERSION_V1 + apisConstants.LOGIN_URL, requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user.access_token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
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