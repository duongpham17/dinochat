import {Express} from 'express';
import {createServer} from 'http';
import {Server} from 'socket.io';
import sockets from '../sockets';

const socket = (app: Express) => {

    const PORT = process.env.PORT || 8000;

    const development = process.env.NODE_ENV === "development";

    app.listen(PORT, () => development && console.log(`http://localhost:${PORT}`))

    // const server = createServer(app);
    
    // const io = new Server(server);

    // io.on('connection', (socket) => sockets(socket, io) );

    // server.listen(port);

    // if(development) console.log(`HTTP & SOCKET on port ${port}`);
};

export default socket;