"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const frontend_1 = __importDefault(require("./frontend"));
const database_1 = __importDefault(require("./database"));
const parser_1 = __importDefault(require("./parser"));
const routes_1 = __importDefault(require("./routes"));
const security_1 = __importDefault(require("./security"));
const sockets_1 = __importDefault(require("./sockets"));
const app = (0, express_1.default)();
exports.default = () => {
    (0, database_1.default)();
    (0, security_1.default)(app);
    (0, parser_1.default)(app, express_1.default);
    (0, routes_1.default)(app);
    (0, frontend_1.default)(app, express_1.default);
    (0, sockets_1.default)(app);
};
