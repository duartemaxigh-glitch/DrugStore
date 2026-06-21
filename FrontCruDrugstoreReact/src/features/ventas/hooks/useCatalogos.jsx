import { useEffect } from "react";
import { useState } from "react";
import * as ventasService from "../services/ventasServices";

// Responsable únicamente de obtener datos maestros
export default function useCatalogos({ toast }) {
    // Datos generales
    const [productos, setProductos] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [mediosPago, setMediosPago] = useState([]);
    const [cargando, setCargando] = useState(true);

    async function cargarDatosMaestros() {
        try {
            const [prods, clis, mps] = await ventasService.obtenerDatosMaestros()
            setProductos(prods)
            setClientes(clis)
            setMediosPago(mps)
        } catch {
            toast.error('Error al cargar datos')
        } finally {
            setCargando(false)
        }
    }

    // Cargar datos iniciales
    useEffect(() => {
        cargarDatosMaestros()
    }, []);

    return {
        productos,
        clientes,
        mediosPago,
        cargando,

        setProductos
    };
}