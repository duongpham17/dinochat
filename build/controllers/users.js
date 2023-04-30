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
exports.destroy = exports.update = void 0;
const helper_1 = require("../@utils/helper");
const users_1 = __importDefault(require("../models/users"));
const rooms_1 = __importDefault(require("../models/rooms"));
const messages_1 = __importDefault(require("../models/messages"));
exports.update = (0, helper_1.asyncBlock)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const rooms = yield users_1.default.findByIdAndUpdate(req.user._id, req.body, { new: true });
    if (!rooms)
        return next(new helper_1.appError('Could not find any users', 400));
    return res.status(200).json({
        status: "success",
        data: rooms
    });
}));
exports.destroy = (0, helper_1.asyncBlock)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const rooms = yield rooms_1.default.find({ admin: req.user._id });
    const [rooms_ids, messages_ids] = [rooms.map(el => el._id), rooms.map(el => el.id)];
    yield Promise.all([
        yield messages_1.default.deleteMany({ room: { $in: messages_ids } }),
        yield rooms_1.default.deleteMany({ _id: { $in: rooms_ids } }),
        yield users_1.default.findByIdAndDelete(req.user._id)
    ]);
    return res.status(200).json({
        status: "success",
    });
}));
