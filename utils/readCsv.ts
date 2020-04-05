import * as fs from 'fs';


export async function leerDatos(path) {
    let datos = fs.readFileSync(path, 'utf8');
    return datos.split('\n').map(d => {
        if (d !== '') {
            let dSplit = d.split(',');
            return {
                usuario: dSplit[0], // Sería el ciut / documento
                email: dSplit[1] // El contacto siempre es un mail
            };
        } else {
            return undefined;
        }
    }).filter(d => d !== undefined);
}
