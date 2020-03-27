import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const listaComprasSchema = Schema({
    usuarioId: {
        type: Schema.Types.ObjectId,
        ref: 'usuario'
    },
    categoriaId: {
        type: Schema.Types.ObjectId,
        ref: 'categoria'
    },
    descricao: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    created: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('lista-compra', listaComprasSchema);