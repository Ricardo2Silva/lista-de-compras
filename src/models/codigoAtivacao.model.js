import mongoose from 'mongoose';
import  gerarCodigo from '../utils/codigoGerador.util';

const categoriaSchema =new mongoose.Schema({
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    gerado: {
        type: Date,
        default: Date.now
    },
    codigo: {
        type: String,
        default: gerarCodigo()
    }
});

export default mongoose.model('codigoAtivacao', categoriaSchema);
