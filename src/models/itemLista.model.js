import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const itemLista = new Schema({
    quantidade: {
        type: Number,
        default: 1
    },
    descricao: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    comprado: {
        type: Boolean,
        default: false
    },
    preco: {
        type: Number,
        default: 0.0
    },
    url: {
        type: String,
        required: false,
        min: 6,
        max: 4000
    },
    listaId: {
        type: Schema.Types.ObjectId,
        ref: 'lista-compra'
    },
    created: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('item-lista', itemLista);