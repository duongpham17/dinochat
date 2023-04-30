"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = exports.disconnect = exports.leave = exports.join = void 0;
const encryption_1 = require("../@utils/encryption");
const messages_1 = __importDefault(require("../models/messages"));
const rooms_1 = __importDefault(require("../models/rooms"));
const join = (socket, io) => {
    socket.on('joinRoom', (data) => __awaiter(void 0, void 0, void 0, function* () {
        const { user, room } = data;
        const new_room = yield rooms_1.default.findOneAndUpdate({
            _id: room._id,
            users: { $elemMatch: { user_id: user._id } }
        }, {
            $set: {
                "users.$.online": true,
                "users.$.socket_id": socket.id,
                "users.$.name": user.name,
            }
        }, {
            new: true
        });
        const messages = yield messages_1.default.find({ room: room._id });
        if (!messages)
            return;
        const decrypt_contents_data = messages.map(el => (Object.assign(Object.assign({}, el.toObject()), { message: (0, encryption_1.decrypt)(el.message) })));
        socket.join(room._id);
        io.to(room._id).emit('joinedRoom', { messages: decrypt_contents_data, room: new_room });
    }));
};
exports.join = join;
const leave = (socket, io) => {
    socket.on('leaveRoom', (data) => __awaiter(void 0, void 0, void 0, function* () {
        const { user, room } = data;
        const new_room = yield rooms_1.default.findOneAndUpdate({
            _id: room._id,
            users: { $elemMatch: { user_id: user._id } }
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
    }));
};
exports.leave = leave;
const disconnect = (socket, io) => {
    socket.on('disconnect', () => __awaiter(void 0, void 0, void 0, function* () {
        const new_room = yield rooms_1.default.findOneAndUpdate({
            users: { $elemMatch: { socket_id: socket.id } }
        }, {
            $set: {
                "users.$.online": false,
                "users.$.socket_id": ""
            }
        }, {
            new: true
        });
        if (!new_room)
            return;
        io.to(new_room._id).emit('leftRoom', { room: new_room });
    }));
};
exports.disconnect = disconnect;
const sendMessage = (socket, io) => {
    socket.on('sendMessage', (data) => __awaiter(void 0, void 0, void 0, function* () {
        const { message } = data;
        const encrypt_data = Object.assign(Object.assign({}, message), { message: (0, encryption_1.encrypt)(message.message) });
        yield messages_1.default.create(encrypt_data);
        io.to(message.room.toString()).emit('sentMessage', { message });
    }));
};
exports.sendMessage = sendMessage;
