import {Express} from 'express';

import authentication from './authentication';
import rooms from './rooms';
import users from './users';

const endpoints = (app: Express) => {
    app.use('/api/authentication', authentication);
    app.use('/api/rooms', rooms);
    app.use('/api/users', users);
}

export default endpoints