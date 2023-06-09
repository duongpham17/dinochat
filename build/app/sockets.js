"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const sockets_1 = __importDefault(require("../sockets"));
const socket = (app) => {
    const PORT = process.env.PORT || 8000;
    const development = process.env.NODE_ENV === "development";
    const environment = () => development && console.log(`Listening on port ${PORT}`);
    const server = (0, http_1.createServer)(app);
    const io = new socket_io_1.Server(server);
    io.on('connection', (socket) => (0, sockets_1.default)(socket, io));
    server.listen(PORT, environment);
};
exports.default = socket;
