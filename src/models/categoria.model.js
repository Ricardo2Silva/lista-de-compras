import mongoose from 'mongoose';

const categoriaSchema =new mongoose.Schema({
    descricao: {
        type: String,
        required: true,
        min: 6,
        max: 100
    },
});

export default mongoose.model('categoria', categoriaSchema);