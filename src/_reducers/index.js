import {combineReducers} from 'redux';

import {alert} from './alert.reducer';
import {login} from './login.reducer';
import {users} from "./users.reducer";
import {userList} from "./userList.reducer";
import {userDetail} from "./userDetail.reducer";
import {userVerificationIdDelete} from "./userVerificationIdDelete.reducer";
import {questionCreate} from "./questionCreate.reducer";

const rootReducer = combineReducers({
    alert,
    login,
    users,
    userList,
    userDetail,
    userVerificationIdDelete,
    questionCreate
});

export default rootReducer;