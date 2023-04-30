"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentication_1 = require("../controllers/authentication");
const users_1 = require("../controllers/users");
const router = express_1.default.Router();
router.use(authentication_1.protect);
router.patch('/', users_1.update);
router.delete('/', users_1.destroy);
exports.default = router;
