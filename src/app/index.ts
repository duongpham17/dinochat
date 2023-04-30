import express from 'express';
import frontend from './frontend';
import database from './database';
import parser from './parser';
import routes from './routes';
import security from './security';
import sockets from './sockets';

const app = express();
  
export default (): void => {

    database();

    security(app);

    parser(app, express);

    routes(app);

    frontend(app, express);

    sockets(app);
    
};