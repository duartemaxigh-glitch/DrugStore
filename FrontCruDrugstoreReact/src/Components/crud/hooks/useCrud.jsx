import { useState, useCallback } from "react";
import { useToast } from "@/hooks/useToast.jsx";
import * as crudService from "../services/crudService.js";

export function useCrud({ endpoint, idCampo, campos, valoresIniciales = {} }) {
    const toast = useToast()
    const [datos, setDatos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [busqueda, setBusqueda] = useState('');
    const [modalAbierto, setModalAbierto] = useState(false);
    const [editando, setEditando] = useState(null);
    const [formulario, setFormulario] = useState({});
    const [enviando, setEnviando] = useState(false);

    const cargarDatos = useCallback(async () => {
        try {
            setCargando(true);
            const resultado = await crudService.obtenerTodos(endpoint);
            setDatos(resultado);
        } 
        catch {
            toast.error('Error al cargar los datos');
        } 
        finally {
            setCargando(false);
        }
    }, [endpoint]);

    function abrirCrear() {
        const inicial = {};
        campos.forEach((c) => {
        inicial[c.nombre] = valoresIniciales[c.nombre] ?? '';
        });
        setFormulario(inicial);
        setEditando(null);
        setModalAbierto(true);
    }

    function abrirEditar(item) {
        const datosForm = {};
        campos.forEach((c) => {
        if (!c.soloCrear) {
            datosForm[c.nombre] = item[c.nombre] ?? '';
        }
        });
        setFormulario(datosForm);
        setEditando(item);
        setModalAbierto(true);
    }

    async function guardar(e) {
        e.preventDefault();
        setEnviando(true);
        try {
        const datosLimpios = { ...formulario };
        campos.forEach((c) => {
            if (!c.requerido && datosLimpios[c.nombre] === '') {
                datosLimpios[c.nombre] = null;
            }
            if (
            c.tipo === 'number' &&
            datosLimpios[c.nombre] !== null &&
            datosLimpios[c.nombre] !== ''
            ) {
                datosLimpios[c.nombre] = Number(datosLimpios[c.nombre]);
            }
        });

        if (editando) {
            await crudService.actualizar(
                endpoint,
                editando[idCampo],
                datosLimpios
            );;
            toast.exito('Actualizado correctamente');
        } else {
            await crudService.crear(
                endpoint,
                datosLimpios
            );
            toast.exito('Creado correctamente');
        }
        setModalAbierto(false);
        cargarDatos();
        } catch (err) {
            toast.error(err.message);
        } finally {
            setEnviando(false);
        }
    }

    async function eliminar(item) {
        if (!window.confirm('¿Estás seguro de que querés eliminar este registro?')) return;
        try {
            await crudService.eliminar(
                endpoint,
                item[idCampo]
            );
            toast.exito('Eliminado correctamente');
            cargarDatos();
        } catch (err) {
            toast.error(err.message);
        }
    }

    // Filtrar por búsqueda (busca en todos los campos)
    const datosFiltrados = datos.filter((item) =>
        Object.values(item).some((val) =>
        String(val ?? '').toLowerCase().includes(busqueda.toLowerCase())
        )
    );

    return {
        datos,
        modalAbierto,
        formulario,
        editando,
        enviando,
        cargando,
        busqueda,
        datosFiltrados,

        abrirCrear,
        abrirEditar,
        guardar,
        eliminar,
        cargarDatos,

        setFormulario,
        setModalAbierto,
        setCargando,
        setBusqueda
    };
}
