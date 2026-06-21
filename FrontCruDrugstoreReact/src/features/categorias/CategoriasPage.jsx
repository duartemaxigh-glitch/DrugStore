import PaginaCrud from "@/components/crud/PaginaCrud";
import { columnas, campos } from "./categoriasConfig";

export default function CategoriasPage() {
    return (
        <PaginaCrud
            titulo="Categorías"
            endpoint="/categorias"
            idCampo="id_categoria"
            columnas={columnas}
            campos={campos}
        />
    );
}