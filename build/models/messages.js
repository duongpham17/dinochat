"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
const messagesSchema = new mongoose_1.Schema({
    room: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Rooms'
    },
    user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Users'
    },
    name: {
        type: String
    },
    message: {
        type: String
    },
    createdAt: {
        type: Date,
        default: new Date
    },
});
exports.default = (0, mongoose_1.model)('Messages', messagesSchema);
