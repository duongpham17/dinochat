import express from 'express';
import frontend from './frontend';
import database from './database';
import parser from './parser';
import routes from './routes';
import security from './security';
import port from './port';

const app = express();
  
export default (): void => {

    database();

    security(app);

    parser(app, express);

    routes(app);

    frontend(app, express);

    port(app);
    
};