
export default class ListaCompras {
    lista(req,res) {
        const lista = [
            {id:1,descricao:'banana'},
            {id:2,descricao:'maça'},
            {id:3,descricao:'abacaxi'},
            {id:4,descricao:'morango'},
            {id:5,descricao:'uva'}
        ];
            return res.status(200).json(lista);
    };


}