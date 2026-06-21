import crearProductosConfig from './productosConfig';
import PaginaCrud from '@/components/crud/PaginaCrud';
import { useCategorias } from '@/features/productos/useProductos'
import './ProductosConfig.css'

export default function ProductosPage() {
    const categorias = useCategorias()
    const { columnas, campos } = crearProductosConfig(categorias)
    return (
        <PaginaCrud
            titulo="Productos"
            endpoint="/productos"
            idCampo="id_producto"
            columnas={columnas}
            campos={campos}
            sinCrear
            sinEliminar
        />
    );
}