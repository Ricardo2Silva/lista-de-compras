import { checkSchema } from 'express-validator';

export default () => {
    return checkSchema({
        quantidade: {
            optional: {
                options: { nullable: true }
            },
            isInt: {
                errorMessage: 'quantidade deve ser um numero inteiro'
            }
        },
        descricao: {
            optional: {
                options: { nullable: true }
            },
            isString: {
                errorMessage: 'a descricao deve ser um texto',
            },
            isLength: {
                errorMessage: ' o tamanho da descricao deve estar entre 6 e 1024 caracteres',
                options: { min: 6, max: 255 }
            }
        },
        comprado: {
            optional: {
                options: { nullable: true }
            },
            isBoolean: {
                errorMessage: 'o campo comprado deve ser true ou false',
            }
        },
        preco: {
            optional: {
                options: { nullable: true }
            },
            isDecimal: {
                errorMessage: 'o preco dever ser um valor decimal',
            }
        },
        url: {
            optional: {
                options: { nullable: true }
            },
            isString: {
                errorMessage: 'a url deve ser um texto',
            },
            isLength: {
                errorMessage: ' o tamanho da url deve estar entre 6 e 1024 caracteres',
                options: { min: 6, max: 1024 }
            }
        }
    });
}
