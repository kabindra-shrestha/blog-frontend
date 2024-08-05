import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {routeConstants} from "../_constants";

export const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        localStorage.getItem('user')
            ? <Component {...props} />
            : <Redirect to={{pathname: routeConstants.LOGIN_URL, state: {from: props.location}}}/>
    )}/>
);