"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authentication_1 = __importDefault(require("./authentication"));
const rooms_1 = __importDefault(require("./rooms"));
const users_1 = __importDefault(require("./users"));
const endpoints = (app) => {
    app.use('/api/authentication', authentication_1.default);
    app.use('/api/rooms', rooms_1.default);
    app.use('/api/users', users_1.default);
};
exports.default = endpoints;
