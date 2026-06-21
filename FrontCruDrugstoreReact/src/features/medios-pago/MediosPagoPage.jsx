import PaginaCrud from "@/components/crud/PaginaCrud";
import { columnas, campos } from "./mediosPagoConfig";

export default function MediosPagoPage() {
    return (
        <PaginaCrud
            titulo="Medios de Pago"
            endpoint="/medios-pago"
            idCampo="id_medio_pago"
            columnas={columnas}
            campos={campos}
        />
    );
}