import * as fs from 'fs';
const generator = require('password-generator');

export async function leerDatos(path) {
    let datos = fs.readFileSync(path, 'utf8');
    let myArray = datos.split('\n').map(d => {
        if (d !== '') {
            let dSplit = d.split(',');
            let doc = {
                cuil: dSplit[0], // cuil | dni
                username: (dSplit[3] === 'pharmacist') ? dSplit[1] : dSplit[0], // Switcheamos entre email si es farmacia o documento si es médico
                email: dSplit[1],
                enrollment: (dSplit[3] === 'professional') ? dSplit[4] : null, // matricula
                businessName: dSplit[2], // Nombre farmacia | nombre de del médico
                roleType: dSplit[3], // rol
                password: generator(9, false, /[\w\d\?\-]/) // password generación automática
            };
            return doc;
        } else {
            return undefined;
        }
    }).filter(d => d !== undefined);
    return myArray
}