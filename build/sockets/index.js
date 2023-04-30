"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const room_1 = require("./room");
const sockets = (socket, io) => {
    (0, room_1.join)(socket, io);
    (0, room_1.leave)(socket, io);
    (0, room_1.sendMessage)(socket, io);
    (0, room_1.disconnect)(socket, io);
};
exports.default = sockets;
