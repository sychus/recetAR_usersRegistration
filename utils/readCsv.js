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
const fs = require("fs");
function leerDatos(path) {
    return __awaiter(this, void 0, void 0, function* () {
        let datos = fs.readFileSync(path, 'utf8');
        return datos.split('\n').map(d => {
            if (d !== '') {
                let dSplit = d.split(',');
                return {
                    usuario: dSplit[0],
                    email: dSplit[1] // El contacto siempre es un mail
                };
            }
            else {
                return undefined;
            }
        }).filter(d => d !== undefined);
    });
}
exports.leerDatos = leerDatos;
//# sourceMappingURL=readCsv.js.map