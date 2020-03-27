import mongoose from 'mongoose';
import { checkSchema } from 'express-validator';

const ObjetoId = mongoose.Types.ObjectId;

export default (...fields) => {
    const objValidadores = {};

    fields.forEach(field => {
        const validadores = {};
        const eOpcional = !(field['required'] === undefined || field['required']);

        if (eOpcional) {
            validadores.optional = {
                options: { nullable: true }
            };

        } else {
            validadores.exists = {
                errorMessage: `o campo ${field['nome']} é requerido`,
            };
        }

        validadores.custom  = {
            errorMessage: `o ${field['name']} formato é invalido.Deve ser uma string com 12 bytes ou 24 caracteres hexadecimais`,
            options: value => ObjetoId.isValid(value)
        };

        objValidadores[field['nome']] = validadores;
    });

    return checkSchema(objValidadores);
}
