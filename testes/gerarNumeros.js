
let letras ='0123456789ABCDEFGHIJKLMNOPQRSTUVXZWYabcdefghijklmnopqrstuvxzwy';

export default (numero = 6) =>{

    let codigo ='';


    for(let i= 0; i < numero; i++){
        const numeroRandomico =Math.floor((Math.random() *letras.length) );

        let senha = letras.charAt(numeroRandomico);

        codigo+= senha;

    }
    return codigo;
 };

