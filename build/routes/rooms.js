"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentication_1 = require("../controllers/authentication");
const rooms_1 = require("../controllers/rooms");
const router = express_1.default.Router();
router.use(authentication_1.protect);
router.get('/', rooms_1.chats);
router.post('/', rooms_1.create);
router.patch('/', rooms_1.update);
router.delete('/:id', rooms_1.remove);
router.get('/:id', rooms_1.room);
router.get('/search/:name', rooms_1.search);
router.post('/verify/private', rooms_1.verify_private);
router.post('/verify/public', rooms_1.verify_public);
exports.default = router;
