import { environment } from './../environment';
const request = require('request');


export function registerRecetar(data, token) {
    let info = {
        password: data.password,
        username: data.usuario
    }
    return new Promise((resolve: any, reject: any) => {
        const url = `${environment.HOST}/api/auth/register`;
        const options = {
            url,
            method: 'POST',
            json: true,
            body: info,
            headers: {
                Authorization: `JWT ${token}`
            }
        };
        request(options, (error, response, body) => {
            if (response.statusCode >= 200 && response.statusCode < 300) {
                return resolve(body);
            }
            return resolve(error || body);
        });
    });
}

export function login() {
    let admin = {
        password: environment.ADMIN.password,
        identifier: environment.ADMIN.identifier
    };
    return new Promise((resolve: any, reject: any) => {
        const url = `${environment.HOST}/api/auth/login`;
        const options = {
            url,
            method: 'POST',
            json: true,
            body: admin,
        };
        request(options, (error, response, body) => {
            if (response.statusCode >= 200 && response.statusCode < 300) {
                return resolve(body.jwt);
            }
            return resolve(error || body);
        });
    });
}