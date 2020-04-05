"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = {
    ADMIN: {
        identifier: '11111111',
        password: 'M_Y?xW3Qm'
    },
    HOST: process.env.HOST || 'https://recetar.andes.gob.ar',
    mail: {
        host: process.env.MAIL_HOST || 'smtp.gmail.com',
        port: process.env.MAIL_PORT || 587,
        secure: false,
        auth: {
            user: process.env.MAIL_USER || 'info@andes.gob.ar',
            pass: process.env.MAIL_PASSWORD || 'x-6G9$ang`by'
        }
    }
};
//# sourceMappingURL=environment.js.map