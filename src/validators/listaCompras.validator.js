import { checkSchema } from 'express-validator';

export default () => {
    return checkSchema({
        descricao: {
            exists: {
                errorMessage: 'a descricao é requerida',
            },
            isString: {
                errorMessage: ' a descricao deve ser um texto ',
            },
            isLength: {
                errorMessage: ' o tamanho da descricao deve ter entre 6 e 1024 caracteres',
                options: { min: 6, max: 1024 }
            }
        }
    });
}
