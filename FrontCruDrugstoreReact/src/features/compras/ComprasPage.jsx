import useCompras from './hooks/useCompras.jsx';
import HistorialCompras from './components/HistorialCompras.jsx';
import ModalDetalleCompra from './components/ModalDetalleCompra.jsx';
import ModalProveedor from './components/ModalProveedor.jsx';
import NuevaCompra from './components/NuevaCompra.jsx';
import ModalProducto from './components/ModalProducto.jsx';
import ComprasTabs from './components/ComprasTabs.jsx';
import './ComprasPage.css'

export default function ComprasPage() {
    const compra = useCompras();

    if (compra.cargando) {
        return (
            <div className="flex-center loading-container">
                <div className="spinner spinner-md"></div>
            </div>
        );
    }

    return (
        <div className="compras-page">
            <h1 className="compras-title">Compras</h1>

            <ComprasTabs
                vista={compra.vista}
                setVista={compra.setVista}
            />

            {compra.vista === 'nueva' ? (
                <NuevaCompra compras={compra} />
            ) : (
                <HistorialCompras
                    compras={compra.compras}
                    proveedorNombre={compra.proveedorNombre}
                    verDetalle={compra.verDetalle}
                    eliminarCompra={compra.eliminarCompra}
                />
            )}

            <ModalProveedor
                modalProveedor={compra.modalProveedor}
                setModalProveedor={compra.setModalProveedor}
                nuevoProveedor={compra.nuevoProveedor}
                setNuevoProveedor={compra.setNuevoProveedor}
                crearProveedor={compra.crearProveedor}
                guardandoProveedor={compra.guardandoProveedor}
            />

            <ModalProducto
                modalProducto={compra.modalProducto}
                setModalProducto={compra.setModalProducto}
                setNuevoProducto={compra.setNuevoProducto}
                nuevoProducto={compra.nuevoProducto}
                categorias={compra.categorias}
                crearProducto={compra.crearProducto}
                guardandoProducto={compra.guardandoProducto}
            />

            <ModalDetalleCompra
                compraDetalle={compra.compraDetalle}
                setCompraDetalle={compra.setCompraDetalle}
                proveedorNombre={compra.proveedorNombre}
                productoNombre={compra.productoNombre}
            />
        </div>
    );
}
