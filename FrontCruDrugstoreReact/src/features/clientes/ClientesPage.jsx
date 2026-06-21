import PaginaCrud from "@/components/crud/PaginaCrud";
import { columnas, campos } from "./clientesConfig";

export default function ClientesPage() {
    return (
        <PaginaCrud
            titulo="Clientes"
            endpoint="/clientes"
            idCampo="id_cliente"
            columnas={columnas}
            campos={campos}
        />
    );
}