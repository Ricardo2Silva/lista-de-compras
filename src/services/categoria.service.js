import CategoriaModel from '../models/categoria.model';
import mongoose from "mongoose";
const ObjetoId = mongoose.Types.ObjectId;

export default class CategoriaService {

    categoriaPopularColecao() {
        const categorias = [
            {descricao: 'alimentos'},
            {descricao: 'eletronicos'},
            {descricao: 'infantil'},
            {descricao: 'roupas'},
            {descricao: 'games'},
            {descricao: 'esportes'}
        ];

        categorias.forEach(cat => {
            const categoria = new CategoriaModel({
                descricao: cat.descricao.toUpperCase()
            });

            categoria
                .save()
                .then(r => {
                    console.log('lista de categorias foi mantida');
                })
                .catch(err => {
                    console.log(' ocorreu um erro ao tentar persistir a lista de categorias', err);
                });
        });
    }

    findAll() {
        return CategoriaModel.find();
    }

    getOne(id) {
        const isValid = ObjetoId.isValid(id);

        if (isValid) {
            return CategoriaModel.findOne({_id: id}) || {};
        }

        return {}
    }

}
