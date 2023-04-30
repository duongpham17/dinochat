import { combineReducers } from '@reduxjs/toolkit';

import alert from './alert';
import authentication from './authentication';
import user from './user';
import rooms from './rooms';

const reducers = combineReducers({
    alert,
    authentication,
    user,
    rooms
});

export default reducers;