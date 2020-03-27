import { checkSchema } from 'express-validator';

const emailSchema = {
    exists: {
        errorMessage: 'email é requerido',
    },
    isString: {
        errorMessage: 'email deve ser um texto',
    },
    isEmail: {
        errorMessage: 'email nao é valido',
    },
    isLength: {
        errorMessage: ' o tamanho deve ser entre 6 e 255 caracteres',
        options: { min: 6, max: 255 }
    }
};

const ativacaoCodigoSchema = {
    exists: {
        errorMessage: 'o codigo de ativacao é requerido',
    },
    isString: {
        errorMessage:'código de ativação deve ser alfanumérico',
    },
    isLength: {
        errorMessage:'o tamanho do código de ativação deve ter 6 caracteres',
        options: { min: 6, max: 6 }
    }
};

export default (serviceType = 'activation') => {
    if (serviceType === 'activation') {
        return checkSchema({
            email: emailSchema,
            activationCode: ativacaoCodigoSchema
        });
    }

    return checkSchema({email: emailSchema});
}
