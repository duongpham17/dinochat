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
exports.verify_private = exports.verify_public = exports.remove = exports.update = exports.create = exports.room = exports.chats = exports.search = exports.free = void 0;
const logo_1 = require("../@assets/logo");
const helper_1 = require("../@utils/helper");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const rooms_1 = __importDefault(require("../models/rooms"));
const messages_1 = __importDefault(require("../models/messages"));
exports.free = (0, helper_1.asyncBlock)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const messages = yield messages_1.default.find().sort("-createdAt").limit(20);
    if (!messages)
        return next(new helper_1.appError('Could not find any chat rooms', 400));
    return res.status(200).json({
        status: "success",
        data: messages
    });
}));
exports.search = (0, helper_1.asyncBlock)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const rooms = yield rooms_1.default.find({ name: { $regex: new RegExp(req.params.name, "i") } }).sort("-createdAt").limit(20);
    if (!rooms)
        return next(new helper_1.appError('Could not find any rooms', 400));
    return res.status(200).json({
        status: "success",
        data: rooms
    });
}));
exports.chats = (0, helper_1.asyncBlock)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = req.user._id;
    const chats = yield rooms_1.default.find({ users: { $elemMatch: { user_id } } }).sort("-createdAt").limit(20);
    if (!chats)
        return next(new helper_1.appError('Could not find any chat rooms', 400));
    return res.status(200).json({
        status: "success",
        data: chats
    });
}));
exports.room = (0, helper_1.asyncBlock)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const room_id = req.params.id;
    const room = yield rooms_1.default.findById(room_id);
    if (!room)
        return next(new helper_1.appError('Could not create room', 400));
    return res.status(200).json({
        status: "success",
        data: room
    });
}));
exports.create = (0, helper_1.asyncBlock)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const [user, inputs] = [req.user, req.body];
    const password = inputs.password ? yield bcryptjs_1.default.hash(inputs.password, 12) : "";
    let room = yield rooms_1.default.create({
        name: inputs.name,
        password: password,
        image: logo_1.logo[Math.floor(Math.random() * logo_1.logo.length)],
        admin: user._id,
        users: [{
                user_id: user._id,
                name: user.name,
                online: false,
                socket_id: "",
            }],
        createdAt: new Date()
    });
    if (!room)
        return next(new helper_1.appError('Could not create room', 400));
    return res.status(200).json({
        status: "success",
        data: room
    });
}));
exports.update = (0, helper_1.asyncBlock)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const room = yield rooms_1.default.findByIdAndUpdate(req.body._id, req.body, { new: true });
    if (!room)
        return next(new helper_1.appError('Could not create room', 400));
    return res.status(200).json({
        status: "success",
        data: room
    });
}));
exports.remove = (0, helper_1.asyncBlock)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const room_id = req.params.id;
    const room = yield rooms_1.default.findByIdAndDelete(room_id);
    if (!room)
        return next(new helper_1.appError('Could not create room', 400));
    yield messages_1.default.deleteMany({ room: room._id });
    return res.status(200).json({
        status: "success",
        data: room
    });
}));
exports.verify_public = (0, helper_1.asyncBlock)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.body;
    let room = yield rooms_1.default.findByIdAndUpdate(_id);
    if (!room)
        return next(new helper_1.appError('Could not create room', 400));
    const new_user = {
        name: req.user.name,
        user_id: req.user._id,
        online: true,
        socket_id: "",
    };
    const index = room.users.findIndex(el => el.user_id === new_user.user_id.toString());
    if (index === -1) {
        room.users = [...room.users, new_user];
    }
    else {
        room.users[index] = new_user;
    }
    ;
    yield room.save();
    return res.status(200).json({
        status: "success",
        data: room
    });
}));
exports.verify_private = (0, helper_1.asyncBlock)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id, passwordCheck } = req.body;
    const room = yield rooms_1.default.findById(_id).select("+password");
    if (!room)
        return next(new helper_1.appError('Could not create room', 400));
    const correct = yield room.correctPassword(passwordCheck, room.password);
    if (!correct)
        return next(new helper_1.appError("Incorrect password, try again", 401));
    room.users = [...room.users, {
            name: req.user.name,
            user_id: req.user._id,
            online: true,
            socket_id: "",
        }];
    yield room.save();
    return res.status(200).json({
        status: "success",
        data: room
    });
}));
