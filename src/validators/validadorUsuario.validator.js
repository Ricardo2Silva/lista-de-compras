import {checkSchema} from "express-validator";

export default ()=>{
    return checkSchema({
        nome:{
            exists:{
                errorMessage:'o  nome é requerido',
            },
            isString: {
                errorMessage:'o nome deve ser um texto',
            },
            isLength: {
                errorMessage: 'o tamanho do nome deve conter entre 3 e 255 caracteres',
                options:{min:3,max:255}
            }
        },
        email:{
            exists:{
                errorMessage:'o  email é requerido',
            },
            isString: {
                errorMessage:'o email deve ser um texto',
            },
            isLength: {
                errorMessage: 'o tamanho do email deve conter entre 6 e 255 caracteres',
                options: {min: 6, max: 255},
            },
            isEmail:{
                errorMessage:' o email esta no formato errado',
            }


        },
        senha:{
            exists:{
                errorMessage:'a  senha é requerida',
            },
            isString: {
                errorMessage:'a senha deve ser um texto',
            },
            isLength: {
                errorMessage: 'o tamanho da senha deve conter entre 3 e 1024 caracteres',
                options: {min: 6, max: 1024}
            }
        }

    });

};