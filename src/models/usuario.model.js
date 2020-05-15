import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({

    nome:{
        type: String,
        required:true,
        min: 3,
        max:255
    },
    email:{
        type: String,
        required:true,
        min: 6,
        max:255

    },

    senha:{
        type: String,
        required:true,
        min: 6,
        max:1024
    },
    created:{
        type:Date,
        default:Date.now
    },
    active: {
        type: Boolean,
        default: false
    }
});

export default mongoose.model('usuario',usuarioSchema);
