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
exports.emailLogin = exports.emailSignup = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const template_1 = require("./template");
const email_address = process.env.EMAIL_ADDRESS;
const email_password = process.env.EMAIL_PASSWORD;
const Email = () => nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: email_address,
        pass: email_password,
    }
});
;
const emailSignup = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = Email();
    const mailOptions = {
        from: `${email_address} <${email_address}>`,
        to: data.email,
        subject: "Confirm Email",
        html: `
            ${(0, template_1.authTemplate)("Confirm Email", data.url, data.code)}
        `
    };
    yield transporter.sendMail(mailOptions);
});
exports.emailSignup = emailSignup;
const emailLogin = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = Email();
    const mailOptions = {
        from: `${email_address} <${email_address}>`,
        to: data.email,
        subject: `Magic Link ${data.code}`,
        html: `
            ${(0, template_1.authTemplate)("Login link", data.url, data.code)}
        `
    };
    yield transporter.sendMail(mailOptions);
});
exports.emailLogin = emailLogin;
