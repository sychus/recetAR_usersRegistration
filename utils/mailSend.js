"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const environment_1 = require("./../environment");
const nodemailer = require('nodemailer');
function sendMail(options, log) {
    return __awaiter(this, void 0, void 0, function* () {
        const mailOptions = {
            from: options.from,
            to: options.to,
            subject: options.subject,
            text: options.text
        };
        try {
            const transporter = yield nodemailer.createTransport({
                host: environment_1.environment.mail.host,
                port: environment_1.environment.mail.port,
                secure: environment_1.environment.mail.secure,
                auth: environment_1.environment.mail.auth
            });
            return yield transporter.sendMail(mailOptions);
        }
        catch (err) {
            log.error('Error al enviar el mail: ', err);
            return err;
        }
    });
}
exports.sendMail = sendMail;
//# sourceMappingURL=mailSend.js.map