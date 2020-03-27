import { checkSchema } from 'express-validator';
import DataUtil from "../utils/data.util";

const dataUtil = new DataUtil();

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
                errorMessage: `o campo ${field['name']} é requerido`,
            };
        }

        validadores.custom  = {
            errorMessage: `o campo : ${field['name']} deve ser uma data com o seguinte formato: ${dataUtil.getDefaultFormat()}`,
            options: value => dataUtil.checkFormatDate(value)
        };

        objValidadores[field['name']] = validadores;
    });

    return checkSchema(objValidadores);
}
