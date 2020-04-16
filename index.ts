import { leerDatos } from './utils/readCsv';
import { sendMail, ValidateEmail } from './utils/mailSend';
import { registerRecetar, login } from './utils/registerRecetar';
import { environment } from './environment';

async function notificar() {
    const opts = {
        errorEventName: 'error',
        logDirectory: 'logs',
        fileNamePattern: 'farmacias-<DATE>.log',
        dateFormat: 'YYYY.MM.DD'
    };
    const log = require('simple-node-logger').createRollingFileLogger(opts);
    try {
        const generator = require('password-generator');
        let token = await login(); // get login}

        const users = await leerDatos('farmacias.csv');
        log.info('Se ha generado el listado de usuarios desde el csv correctamente.', users);

        for (let i = 0; i < users.length; i++) {
            const isMailValid = ValidateEmail(users[i].email);
            if (isMailValid) {
                let notificacion = {
                    from: environment.mail.auth.user,
                    to: users[i].email,
                    subject: 'RECETAR :: Usuario del Sistema',
                    text: `Hola ${users[i].businessName}, hemos activado su cuenta de recetAR, su usuario es ${users[i].username} y su contraseña de primera vez es ${users[i].password}, deberá cambiarla de inmediato. Haga clic aquí para ir al sitio: ${environment.HOST} ¡Muchas Gracias!`
                };
                // Registra usuario en recetAR
                let register: any = await registerRecetar(users[i], token);
                if (register.newUser) {
                    log.info(`El usuario ${register.newUser.username} se ha registrado correctamente`)
                    // Notificar
                    await sendMail(notificacion, log);
                    log.info(`Mail enviado mail a:  ${users[i].username}, cuyo mail es: ${users[i].email} y password: ${users[i].password}`);
                } else {
                    log.info(`Hubo problemas al intentar registrar el usuario ${users[i].username}`);
                }
            } else {
                log.info(`El mail del usuario ${users[i].username} no es válido: ${users[i].email}`);
            }
            console.log('Registros procesados: ', i);
        }
    } catch (err) {
        log.error(err);
    }
}

notificar();
