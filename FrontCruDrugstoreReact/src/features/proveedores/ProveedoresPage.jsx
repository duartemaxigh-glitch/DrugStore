import PaginaCrud from "@/components/crud/PaginaCrud";
import { columnas, campos } from "./proveedoresConfig";

export default function ProveedoresPage() {
    return (
        <PaginaCrud
            titulo="Proveedores"
            endpoint="/proveedores"
            idCampo="id_proveedor"
            columnas={columnas}
            campos={campos}
        />
    );
}