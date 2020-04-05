import { leerDatos } from './utils/readCsv';
import { sendMail } from './utils/mailSend';
import { registerRecetar, login } from './utils/registerRecetar';
import { environment } from './environment';

async function notificar() {
    const opts = {
        errorEventName: 'error',
        logDirectory: 'logs',
        fileNamePattern: 'roll-<DATE>.log',
        dateFormat: 'YYYY.MM.DD'
    };
    const log = require('simple-node-logger').createRollingFileLogger(opts);
    try {
        const generator = require('password-generator');
        let users = await leerDatos('listadoPrueba.csv');
        let notificationList = users.map(u => {
            return {
                usuario: u.usuario.trim(),
                email: u.email,
                password: generator(9, false, /[\w\d\?\-]/)
            }
        });
        log.info('Se ha generado el listado de usuarios desde el csv correctamente.');
        let token = await login(); // get login
        for (let i = 0; i < notificationList.length; i++) {
            let notificacion = {
                from: environment.mail.auth.user,
                to: notificationList[i].email,
                subject: 'RECETAR :: Usuario del Sistema',
                text: `Hola ${notificationList[i].usuario}, hemos activado su cuenta de recetAR, su contraseña de primera vez es ${notificationList[i].password}, deberá cambiarla de inmediato. Haga clic aquí para ir al sitio: ${environment.HOST} ¡Muchas Gracias!`
            };
            // Registra usuario en recetAR
            let register: any = await registerRecetar(notificationList[i], token);
            if (register.newUser) {
                log.info(`El usuario ${register.newUser.username} se ha registrado correctamente`)
                // Notificar
                await sendMail(notificacion, log);
                log.info(`Mail enviado mail a:  ${notificationList[i].usuario}, cuyo mail es: ${notificationList[i].email} y password: ${notificationList[i].password}`);
            } else {
                log.warning(`Hubo problemas al intentar registrar el usuario ${notificationList[i].usuario}`);
            }
        }
    } catch (err) {
        log.error(err);
    }
}

notificar();