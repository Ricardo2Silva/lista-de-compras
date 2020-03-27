import CategoriaService from "../services/categoria.service";
const service = new CategoriaService();

export default class CategoriaController {

    async categoriasLista(req, res) {
        try {
            const categorias = await service.findAll();
            return res.status(200).json(categorias);

        } catch (err) {
            console.log(err);
            return res.status(500).json('erro quando tentou buscar categorias');
        }
    }

}
