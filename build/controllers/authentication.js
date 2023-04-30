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
exports.confirmWithCode = exports.confirmWithEmail = exports.login = exports.persist = exports.protect = exports.restrictTo = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const _email_1 = require("../@email");
const helper_1 = require("../@utils/helper");
const users_1 = __importDefault(require("../models/users"));
const authentication_1 = require("./middleware/authentication");
const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new helper_1.appError('You do not have permission to perform this action', 403));
        }
        next();
    };
};
exports.restrictTo = restrictTo;
exports.protect = (0, helper_1.asyncBlock)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token)
        return next(new helper_1.appError('Login to access these features', 401));
    const jwt_secret = process.env.JWT_SECRET;
    const decodedId = jsonwebtoken_1.default.verify(token, jwt_secret);
    const existingUser = yield users_1.default.findById(decodedId.id);
    if (!existingUser)
        return next(new helper_1.appError('The user belonging to this token does not exist.', 401));
    req.user = existingUser;
    next();
}));
exports.persist = (0, helper_1.asyncBlock)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.user._id;
    const user = yield users_1.default.findById(id);
    if (!user)
        return next(new helper_1.appError('please log back in for a new token', 401));
    res.status(201).json({
        status: "success",
        data: user
    });
}));
exports.login = (0, helper_1.asyncBlock)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name } = req.body;
    let user = yield users_1.default.findOne({ email });
    if (user) {
        const { code, hashToken } = user.createVerifyToken();
        const confirmURL = `confirm/${`${code}-${hashToken}`}`;
        yield (0, _email_1.emailLogin)({
            email: user.email,
            url: confirmURL,
            code
        });
    }
    ;
    if (!user) {
        user = yield users_1.default.create({ email, verified: false, name });
        const { code, hashToken } = user.createVerifyToken();
        const confirmURL = `confirm/${code}-${hashToken}`;
        yield (0, _email_1.emailSignup)({
            email: user.email,
            url: confirmURL,
            code
        });
    }
    ;
    res.status(200).json({
        status: "success",
        message: 'sent'
    });
}));
exports.confirmWithEmail = (0, helper_1.asyncBlock)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.params.token;
    const [code, confirmation] = token.split("-");
    let user = yield users_1.default.findOne({ confirmation }).select('+code');
    if (!user)
        return next(new helper_1.appError("User does not exist, signup again.", 401));
    const linkExpired = Date.now() > user.confirmation_expiration;
    if (linkExpired)
        return next(new helper_1.appError("This confirmation code no longer exist", 401));
    const correctUser = !user || (yield user.correctPassword(code, user.code));
    if (!correctUser)
        return next(new helper_1.appError("User does not exist, signup again.", 401));
    user = yield users_1.default.findOneAndUpdate({ confirmation }, { $unset: { code: 1, confirmation: 1, verified: 1, link_expiration_time: 1 } }, { new: true });
    if (!user)
        return next(new helper_1.appError("User does not exist, signup again.", 401));
    const cookie = (0, authentication_1.createSecureToken)(user._id);
    res.status(200).json({
        status: "success",
        data: user,
        cookie
    });
}));
exports.confirmWithCode = (0, helper_1.asyncBlock)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { code, email } = req.body;
    let user = yield users_1.default.findOne({ email }).select('+code');
    if (!user)
        return next(new helper_1.appError("User does not exist, signup again", 401));
    const linkExpired = Date.now() > user.confirmation_expiration;
    if (linkExpired)
        return next(new helper_1.appError("This confirmation code no longer exist", 401));
    const correctUser = !user || (yield user.correctPassword(code, user.code));
    if (!correctUser)
        return next(new helper_1.appError("Invalid code", 401));
    user = yield users_1.default.findOneAndUpdate({ email }, { $unset: { code: 1, confirmation: 1, verified: 1, link_expiration_time: 1 } }, { new: true });
    if (!user)
        return next(new helper_1.appError("Invalid code", 401));
    const cookie = (0, authentication_1.createSecureToken)(user._id);
    res.status(200).json({
        status: "success",
        data: user,
        cookie
    });
}));
