import { Socket, Server } from 'socket.io';
import { encrypt, decrypt } from '../@utils/encryption';
import { IUsers } from '../models/users';
import Messages, { IMessages } from '../models/messages';
import Rooms, { IRooms }  from '../models/rooms';

export const join = (socket: Socket, io: Server) => {
    socket.on('joinRoom', async data => {
        const {user, room} : {user: IUsers, room: IRooms} = data;

        const new_room = await Rooms.findOneAndUpdate({
            _id: room._id,
            users: {$elemMatch: {user_id: user._id}}
        }, {
            $set: {
                "users.$.online": true,
                "users.$.socket_id": socket.id,
                "users.$.name": user.name,
            }
        }, {
            new: true
        });
        
        const messages = await Messages.find({room: room._id});

        if(!messages) return;

        const decrypt_contents_data = messages.map(el => ({
            ...el.toObject(), 
            message: decrypt(el.message)
        }));

        socket.join(room._id);

        io.to(room._id).emit('joinedRoom', { messages: decrypt_contents_data, room: new_room });
    });
};

export const leave = (socket: Socket, io: Server) => {
    socket.on('leaveRoom', async data => {
        const {user, room} : {user: IUsers, room: IRooms} = data;

        const new_room = await Rooms.findOneAndUpdate({
            _id: room._id,
            users: {$elemMatch: {user_id: user._id}}
        }, {
            $set: {
                "users.$.online": false,
                "users.$.socket_id": ""
            }
        }, {
            new: true
        });

        socket.leave(room._id);
        
        io.to(room._id).emit('leftRoom', {
            user, 
            room: new_room,
        });
    });
};

export const disconnect = (socket: Socket, io: Server) => {
    socket.on('disconnect', async () => {
        const new_room = await Rooms.findOneAndUpdate({
            users: {$elemMatch: {socket_id: socket.id}}
        }, {
            $set: {
                "users.$.online": false,
                "users.$.socket_id": ""
            }
        }, {
            new: true
        });

        if(!new_room) return;

        io.to(new_room._id).emit('leftRoom', { room: new_room });
    });
};

export const sendMessage = (socket: Socket, io: Server) => {
    socket.on('sendMessage', async data => {
        const { message } : { message: IMessages } = data;

        const encrypt_data: IMessages = {
            ...message,
            message: encrypt(message.message)
        };
        
        await Messages.create(encrypt_data);

        io.to(message.room.toString()).emit('sentMessage', {message});
    });
};
