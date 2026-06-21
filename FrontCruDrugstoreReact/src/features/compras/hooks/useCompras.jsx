import { useState, useEffect, useMemo } from 'react';
import { useToast } from '@/hooks/useToast';
import * as comprasService from '../services/comprasService';

export default function useCompras() {
    const toast = useToast();

    const [vista, setVista] = useState('nueva');

    // Datos
    const [productos, setProductos] = useState([]);
    const [proveedores, setProveedores] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [cargando, setCargando] = useState(true);

    // Modal nuevo producto
    const [modalProducto, setModalProducto] = useState(false);
    const [nuevoProducto, setNuevoProducto] = useState({
        nombre: '',
        precio_venta: '',
        precio_compra: '',
        codigo_barras: '',
        id_categoria: '',
    });
    const [guardandoProducto, setGuardandoProducto] = useState(false);

    // Modal nuevo proveedor
    const [modalProveedor, setModalProveedor] = useState(false);
    const [nuevoProveedor, setNuevoProveedor] = useState({
        razon_social: '',
        cuit_cuil: '',
        contacto_nombre: '',
        telefono: '',
        email: '',
    });
    const [guardandoProveedor, setGuardandoProveedor] = useState(false);

    // Nueva compra
    const [proveedorId, setProveedorId] = useState('');
    const [carrito, setCarrito] = useState([]);
    const [finalizando, setFinalizando] = useState(false);
    const [compraExitosa, setCompraExitosa] = useState(null);

    // Búsqueda de producto
    const [terminoBusqueda, setTerminoBusqueda] = useState('');
    const [resultadosBusqueda, setResultadosBusqueda] = useState([]);
    const [productoEncontrado, setProductoEncontrado] = useState(null);
    const [cantidadAgregar, setCantidadAgregar] = useState(1);
    const [precioAgregar, setPrecioAgregar] = useState('');

    // Historial
    const [compras, setCompras] = useState([]);
    const [compraDetalle, setCompraDetalle] = useState(null);

    async function cargarDatosIniciales() {
    try {
        const [prods, provs, cats] =
            await comprasService.obtenerDatosIniciales();

        setProductos(prods);
        setProveedores(provs);
        setCategorias(cats);

        if (provs.length > 0) {
            setProveedorId(provs[0].id_proveedor);
        }
    } catch {
        toast.error('Error al cargar datos');
    } finally {
        setCargando(false);
    }
    }

    useEffect(() => {
        cargarDatosIniciales()
    }, []);

    // Contador para IDs temporales de productos nuevos (negativos para no colisionar)
    const [contadorTemp, setContadorTemp] = useState(-1);

    async function crearProducto() {
        if (!nuevoProducto.nombre || !nuevoProducto.precio_venta || !nuevoProducto.precio_compra) {
            toast.error('Nombre, precio de venta y precio de compra son obligatorios');
            return;
        }
        // No se guarda en BD todavía — solo se crea localmente hasta confirmar la compra
        const productoLocal = {
            id_producto: contadorTemp,        // ID temporal negativo
            _esNuevo: true,                   // marca para persistir al finalizar
            _datos: {
                nombre: nuevoProducto.nombre,
                precio_venta: Number(nuevoProducto.precio_venta),
                precio_compra: Number(nuevoProducto.precio_compra),
                codigo_barras: nuevoProducto.codigo_barras || null,
                id_categoria: nuevoProducto.id_categoria ? Number(nuevoProducto.id_categoria) : null,
            },
            nombre: nuevoProducto.nombre,
            precio_compra: Number(nuevoProducto.precio_compra),
            precio_venta: Number(nuevoProducto.precio_venta),
            codigo_barras: nuevoProducto.codigo_barras || null,
            stock: 0,
        };
        setContadorTemp((prev) => prev - 1);
        setProductos((prev) => [...prev, productoLocal]);
        seleccionarProducto(productoLocal);
        setNuevoProducto({ nombre: '', precio_venta: '', precio_compra: '', codigo_barras: '', id_categoria: '' });
        setModalProducto(false);
        toast.info(`Producto "${productoLocal.nombre}" listo — se guardará al confirmar la compra`);
    }

    async function crearProveedor() {
        if (!nuevoProveedor.razon_social) {
            toast.error('La razón social es obligatoria');
            return;
        }
        setGuardandoProveedor(true);
        try {
            const payload = {
                razon_social: nuevoProveedor.razon_social,
                cuit_cuil: nuevoProveedor.cuit_cuil || null,
                contacto_nombre: nuevoProveedor.contacto_nombre || null,
                telefono: nuevoProveedor.telefono || null,
                email: nuevoProveedor.email || null,
            };
            const creado = await comprasService.crearProveedor(payload);
            const nuevaLista = await comprasService.obtenerProveedores();
            setProveedores(nuevaLista);
            setProveedorId(creado.id_proveedor);
            setNuevoProveedor({ razon_social: '', cuit_cuil: '', contacto_nombre: '', telefono: '', email: '' });
            setModalProveedor(false);
            toast.exito(`Proveedor "${creado.razon_social}" creado y seleccionado`);
        } catch (err) {
            toast.error(err.message);
        } finally {
            setGuardandoProveedor(false);
        }
    }

    function seleccionarProducto(prod) {
        setProductoEncontrado(prod);
        setTerminoBusqueda(prod.nombre);
        setResultadosBusqueda([]);
        setPrecioAgregar(prod.precio_compra.toString());
        setCantidadAgregar(1);
    }

    function limpiarBusqueda() {
        setProductoEncontrado(null);
        setTerminoBusqueda('');
        setResultadosBusqueda([]);
        setPrecioAgregar('');
        setCantidadAgregar(1);
    }

    async function cargarCompras() {
    try {
        const compras = await comprasService.obtenerCompras();
        setCompras(compras);
    } catch {
        // opcional
    }
}

    useEffect(() => {
        if (vista === 'historial') cargarCompras();
    }, [vista]);

    const total = useMemo(
        () => carrito.reduce((sum, i) => sum + i.cantidad * i.precioUnitario, 0),
        [carrito]
    );

    function agregarAlCarrito() {
        if (!productoEncontrado || !precioAgregar || cantidadAgregar < 1) {
            toast.error('Buscá y seleccioná un producto primero');
            return;
        }
        setCarrito((prev) => {
            const existente = prev.find((i) => i.id_producto === productoEncontrado.id_producto);
            if (existente) {
                return prev.map((i) =>
                    i.id_producto === productoEncontrado.id_producto
                        ? {
                            ...i,
                            cantidad: i.cantidad + cantidadAgregar,
                            precioUnitario: Number(precioAgregar),
                        }
                        : i
                );
            }
            return [
                ...prev,
                {
                    id_producto: productoEncontrado.id_producto,
                    nombre: productoEncontrado.nombre,
                    cantidad: cantidadAgregar,
                    precioUnitario: Number(precioAgregar),
                },
            ];
        });
        limpiarBusqueda();
    }

    function quitarDelCarrito(id) {
        setCarrito((prev) => prev.filter((i) => i.id_producto !== id));
    }

    async function finalizarCompra() {
        if (carrito.length === 0) return;
        if (!proveedorId) {
            toast.error('Seleccioná un proveedor');
            return;
        }

        setFinalizando(true);
        try {
            // 1. Persistir en BD los productos nuevos (los que tienen ID temporal negativo)
            const mapaIdReal = {}; // idTemporal -> idReal
            for (const item of carrito) {
                if (item.id_producto < 0) {
                    const prod = productos.find((p) => p.id_producto === item.id_producto);
                    if (prod && prod._esNuevo) {
                        const creado = await comprasService.crearProducto(prod._datos);
                        mapaIdReal[item.id_producto] = creado.id_producto;
                    }
                }
            }

            // 2. Reemplazar IDs temporales por los reales en el payload
            const payload = {
                id_proveedor: Number(proveedorId),
                detalles: carrito.map((i) => ({
                    id_producto: mapaIdReal[i.id_producto] ?? i.id_producto,
                    cantidad: i.cantidad,
                    precio_unitario: i.precioUnitario,
                })),
            };

            const compra = await comprasService.crearCompra(payload);
            setCompraExitosa(compra);
            setCarrito([]);
            setContadorTemp(-1);
            toast.exito('¡Compra registrada correctamente!');
            const productos = await comprasService.obtenerProductos();
            setProductos(productos)
        } catch (err) {
            toast.error(err.message);
        } finally {
            setFinalizando(false);
        }
    }

    async function verDetalle(idCompra) {
        try {
            const compra = await comprasService.obtenerDetalleCompra(idCompra);
            setCompraDetalle(compra);
        } catch {
            toast.error('Error al obtener el detalle');
        }
    }

    async function eliminarCompra(idCompra) {
        if (!window.confirm('¿Estás seguro de eliminar esta compra?')) return;
        try {
            await comprasService.eliminarCompra(idCompra);
            toast.exito('Compra eliminada');
            cargarCompras();
        } catch (err) {
            toast.error(err.message);
        }
    }

    const productoNombre = (id) =>
        productos.find((p) => p.id_producto === id)?.nombre || `#${id}`;
    const proveedorNombre = (id) =>
        proveedores.find((p) => p.id_proveedor === id)?.razon_social || `#${id}`;

    return {
        // estados
        vista,
        cargando,
        productos,
        proveedores,
        categorias,

        // modales
        modalProducto,
        nuevoProducto,
        guardandoProducto,

        modalProveedor,
        nuevoProveedor,
        guardandoProveedor,

        // compra
        proveedorId,
        carrito,
        total,
        finalizando,
        compraExitosa,

        // búsqueda
        terminoBusqueda,
        resultadosBusqueda,
        productoEncontrado,
        cantidadAgregar,
        precioAgregar,

        // historial
        compras,
        compraDetalle,

        // setters
        setVista,
        setModalProducto,
        setNuevoProducto,
        setModalProveedor,
        setNuevoProveedor,
        setProveedorId,
        setTerminoBusqueda,
        setResultadosBusqueda,
        setCantidadAgregar,
        setPrecioAgregar,
        setCompraDetalle,
        setCompraExitosa,
        setCarrito,
        setContadorTemp,
        setProductoEncontrado,
        setProductos,

        // acciones
        crearProducto,
        crearProveedor,
        seleccionarProducto,
        limpiarBusqueda,
        agregarAlCarrito,
        quitarDelCarrito,
        finalizarCompra,
        verDetalle,
        eliminarCompra,

        // helpers
        productoNombre,
        proveedorNombre,
    };
}
