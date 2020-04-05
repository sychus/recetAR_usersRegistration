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
const readCsv_1 = require("./utils/readCsv");
const mailSend_1 = require("./utils/mailSend");
const registerRecetar_1 = require("./utils/registerRecetar");
const environment_1 = require("./environment");
function notificar() {
    return __awaiter(this, void 0, void 0, function* () {
        const opts = {
            errorEventName: 'error',
            logDirectory: 'logs',
            fileNamePattern: 'roll-<DATE>.log',
            dateFormat: 'YYYY.MM.DD'
        };
        const log = require('simple-node-logger').createRollingFileLogger(opts);
        try {
            const generator = require('password-generator');
            let users = yield readCsv_1.leerDatos('listadoPrueba.csv');
            let notificationList = users.map(u => {
                return {
                    usuario: u.usuario.trim(),
                    email: u.email,
                    password: generator(9, false, /[\w\d\?\-]/)
                };
            });
            log.info('Se ha generado el listado de usuarios desde el csv correctamente.');
            let token = yield registerRecetar_1.login(); // Me logueo con un admi provisorio para generar un token
            for (let i = 0; i < notificationList.length; i++) {
                let notificacion = {
                    from: environment_1.environment.mail.auth.user,
                    to: notificationList[i].email,
                    subject: 'RECETAR :: Usuario del Sistema',
                    text: `Hola ${notificationList[i].usuario}, hemos activado su cuenta de recetAR, su contraseña de primera vez es ${notificationList[i].password}, deberá cambiarla de inmediato. ¡Muchas gracias!. 
                haga clic aquí para ir al sitio: ${environment_1.environment.HOST}`
                };
                // hacer post para insertar usuario y password en el sistema
                let register = yield registerRecetar_1.registerRecetar(notificationList[i], token);
                if (register.newUser) {
                    log.info(`El usuario ${register.newUser.username} se ha registrado correctamente`);
                    // Notificar
                    yield mailSend_1.sendMail(notificacion, log);
                    log.info(`Mail enviado mail a:  ${notificationList[i].usuario}, cuyo mail es: ${notificationList[i].email} y password: ${notificationList[i].password}`);
                }
                else {
                    log.warning(`Hubo problemas al intentar registrar el usuario ${notificationList[i].usuario}`);
                }
            }
        }
        catch (err) {
            log.error(err);
        }
    });
}
notificar();
//# sourceMappingURL=index.js.map