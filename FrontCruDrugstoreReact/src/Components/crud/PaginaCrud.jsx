import "./PaginaCrud.css";
import { useEffect } from 'react';
import CrudHeader from './CrudHeader.jsx';
import SearchBar from './SearchBar.jsx';
import CrudTabla from './CrudTabla.jsx';
import CrudModal from './CrudModal.jsx';
import { useCrud } from '@/components/crud/hooks/useCrud.jsx';

export default function PaginaCrud({
    titulo,
    endpoint,
    idCampo,
    columnas,
    campos,
    valoresIniciales = {},
    sinCrear = false,
    sinEditar = false,
    sinEliminar = false,
}) {
    const {
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
        setBusqueda } = useCrud({ endpoint, idCampo, campos, valoresIniciales })

    useEffect(() => {
        cargarDatos();
    }, [cargarDatos]);

    return (
        <div className="crud-page">
            <CrudHeader titulo={titulo} sinCrear={sinCrear} abrirCrear={abrirCrear} />
            <SearchBar busqueda={busqueda} buscar={setBusqueda} />
            {cargando ? (
                <div className="loader-container flex-center">
                    <div className="loader-crud"/>
                </div>
                ) : <CrudTabla 
                        datosFiltrados={datosFiltrados}
                        columnas={columnas}
                        sinEditar={sinEditar}
                        abrirEditar={abrirEditar}
                        sinEliminar={sinEliminar}
                        eliminar={eliminar}
                        datos={datos}
                        idCampo={idCampo}
                    />
            }

            <CrudModal 
                editando={editando}
                modalAbierto={modalAbierto}
                titulo={titulo}
                abrirModal={setModalAbierto}
                guardar={guardar}
                campos={campos}
                formulario={formulario}
                agregarFormulario={setFormulario}
                enviando={enviando}
            />
        </div>
        
    );
}
