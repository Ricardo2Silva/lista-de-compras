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
                errorMessage: ' a descricao deve ser um texto',
            }
        },
        comprado: {
            optional: {
                options: { nullable: true }
            },
            isBoolean: {
                errorMessage: ' o campo comprado deve ser true ou false',
            }
        },
        preco: {
            optional: {
                options: { nullable: true }
            },
            isDecimal: {
                errorMessage: ' o preco deve ser um valor decimal',
            }
        },
        url: {
            optional: {
                options: { nullable: true }
            },
            isString: {
                errorMessage: 'a url deve ser um texto',
            }
        }
    });
}
