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
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const crypto_1 = __importDefault(require("crypto"));
;
const usersSchema = new mongoose_1.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: "user",
    },
    verified: {
        type: Boolean
    },
    code: {
        type: String,
        select: false,
    },
    confirmation: {
        type: String
    },
    confirmation_expiration: {
        type: Number,
        default: Date.now() + (1 * 60 * 60 * 1000),
    },
    createdAt: {
        type: Date,
        default: new Date
    },
});
//hashing the code
usersSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        //only run this when password has been modified
        if (!this.code)
            return next();
        //hash password
        this.code = yield bcryptjs_1.default.hash(this.code, 12);
        next();
    });
});
//check if confirm code matches the encrypted code.
usersSchema.methods.correctPassword = function (candidateCode, userCode) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcryptjs_1.default.compare(candidateCode, userCode);
    });
};
//generate a random token to verify users email
usersSchema.methods.createVerifyToken = function () {
    const verifyToken = crypto_1.default.randomBytes(32).toString('hex');
    const hashToken = crypto_1.default.createHash('sha256').update(verifyToken).digest('hex');
    const code = Math.floor(100000 + Math.random() * 900000);
    //given to user to verify account
    this.code = code;
    this.confirmation = hashToken;
    //link will expire timer in 5min
    this.confirmation_expiration = Date.now() + (5 * 60 * 1000);
    this.save();
    return { hashToken, code };
};
exports.default = (0, mongoose_1.model)('Users', usersSchema);
