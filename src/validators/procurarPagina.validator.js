import { checkSchema } from 'express-validator';

export default () => {
    return checkSchema({
        pageNumber: {
            optional: {
                options: { nullable: true }
            },
            isInt: {
                errorMessage:'O número da página deve ser um número inteiro'
            }
        },
        pageSize: {
            optional: {
                options: { nullable: true }
            },
            isInt: {
                errorMessage:'O tamanho da página deve ser um número inteiro'
            }
        }
    });
}
