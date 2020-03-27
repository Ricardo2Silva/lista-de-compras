const characters = 'QWERTYUIOPASDFGHJKLZXCVBNM1234567890qwertyuiopasdfghjklzxcvbnm';

export default (size = 6) => {
    let code = '';

    for (let i = 0; i < size; i++) {
        const randomNumber = Math.floor(Math.random() * characters.length);
        code += characters.charAt(randomNumber)
    }

    return code;
}