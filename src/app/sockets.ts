import {Express} from 'express';
import {createServer} from 'http';
import {Server} from 'socket.io';
import { development_frontend_url, production_frontend_url } from '../@environment';
import sockets from '../sockets';

const socket = (app: Express) => {

    const port = process.env.PORT || 8000;

    const development = process.env.NODE_ENV === "development";

    const server = createServer(app);
    
    const io = new Server(server, {
        cors: {
            origin: development ? development_frontend_url : production_frontend_url,
            methods: ["GET", "POST", "PATCH", "DELETE"]
        }
    });

    io.on('connection', (socket) => sockets(socket, io) );

    server.listen(port);

    if(development) console.log(`HTTP & SOCKET on port ${port}`);
};

export default socket;