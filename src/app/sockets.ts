import {Express} from 'express';
import {createServer} from 'http';
import {Server} from 'socket.io';
import sockets from '../sockets';

const socket = (app: Express): void => {

    const PORT = process.env.PORT || 8000;

    const development = process.env.NODE_ENV === "development";

    const environment = () => development && console.log(`Listening on port ${PORT}`);

    const server = createServer(app);
    
    const io = new Server(server);

    io.on('connection', (socket) => sockets(socket, io) );

    server.listen(PORT, environment);
};

export default socket;