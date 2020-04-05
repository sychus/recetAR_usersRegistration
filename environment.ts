export const environment = {
    ADMIN: {
        identifier: 'user',
        password: 'pas'
    },
    HOST: process.env.HOST || 'https://recetar.andes.gob.ar',
    mail: {
        host: process.env.MAIL_HOST || 'smtp.gmail.com',
        port: process.env.MAIL_PORT || 587,
        secure: false,
        auth: {
            user: process.env.MAIL_USER || 'mailAccount',
            pass: process.env.MAIL_PASSWORD || 'mailPassword'
        }
    }
};
