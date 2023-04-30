import {Express} from 'express';
import {createServer} from 'http';
import {Server} from 'socket.io';
import sockets from '../sockets';

const socket = (app: Express) => {

    const PORT = process.env.PORT || 8000;

    const development = process.env.NODE_ENV === "development";

    const server = createServer(app);
    
    const io = new Server(server);

    io.on('connection', (socket) => sockets(socket, io) );

    server.listen(PORT);

    if(development) console.log(`localhost${PORT}`);
};

export default socket;