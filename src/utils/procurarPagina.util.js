export default class ProcurarPaginaUtil {

    pegarObjetoPaginado(pageSize, pageNumber, totalSize, items) {
        return {
            pageSize,
            pageNumber,
            items,
            totalSize,
            currentPageSize: items.length || 0
        }
    }

}