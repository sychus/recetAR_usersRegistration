"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const environment_1 = require("./../environment");
const request = require('request');
function registerRecetar(data, token) {
    let info = {
        password: data.password,
        username: data.usuario
    };
    return new Promise((resolve, reject) => {
        const url = `${environment_1.environment.HOST}/api/auth/register`;
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
exports.registerRecetar = registerRecetar;
function login() {
    let admin = {
        password: environment_1.environment.ADMIN.password,
        identifier: environment_1.environment.ADMIN.identifier
    };
    return new Promise((resolve, reject) => {
        const url = `${environment_1.environment.HOST}/api/auth/login`;
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
exports.login = login;
//# sourceMappingURL=registerRecetar.js.map