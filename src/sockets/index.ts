import { Socket, Server } from 'socket.io';

import { join, leave, disconnect, sendMessage } from './room';

const sockets = (socket: Socket, io: Server) => {
    join(socket, io);
    leave(socket, io);
    sendMessage(socket, io);
    disconnect(socket, io);
};

export default sockets;