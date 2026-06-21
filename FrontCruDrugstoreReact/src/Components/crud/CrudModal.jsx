import Modal from "../ui/Modal/ModalCrud.jsx"

export default function CrudModal({ 
    editando, 
    modalAbierto, 
    titulo, 
    abrirModal,
    guardar,
    campos,
    formulario,
    agregarFormulario,
    enviando}) {
    return (
        <>
            {modalAbierto && (
            <Modal titulo={editando ? `Editar` : `Crear ${titulo}`} onCerrar={() => abrirModal(false)}>
                <form onSubmit={guardar} className="crud-form">
                    {campos
                    .filter((c) => !(editando && c.soloCrear))
                    .map((campo) => (
                        <div key={campo.nombre} className="form-field">
                            <label className="label">
                                {campo.etiqueta}
                                {campo.requerido && (
                                <span className="required">*</span>
                                )}
                            </label>
                            {campo.tipo === 'select' ? (
                                <select
                                    value={formulario[campo.nombre] ?? ''}
                                    onChange={(e) =>
                                        agregarFormulario({
                                        ...formulario,
                                        [campo.nombre]: e.target.value,
                                        })
                                    }
                                    required={campo.requerido}
                                    className="select"
                                >
                                    <option value="">Seleccionar...</option>
                                    {(campo.opciones || []).map((op) => (
                                        <option key={op.valor} value={op.valor}>
                                        {op.texto}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    type={campo.tipo || 'text'}
                                    value={formulario[campo.nombre] ?? ''}
                                    onChange={(e) =>
                                        agregarFormulario({
                                        ...formulario,
                                        [campo.nombre]: e.target.value,
                                        })
                                    }
                                    required={campo.requerido}
                                    step={campo.paso}
                                    placeholder={campo.placeholder}
                                    className="input"
                                />
                            )}
                        </div>
                    ))}

                    <div className="form-actions">
                    <button type="submit" disabled={enviando} className="btn-submit">
                        {enviando ? 'Guardando...' : 'Guardar'}
                    </button>

                    <button
                        type="button"
                        onClick={() => abrirModal(false)}
                        className="btn-cancel"
                    >
                        Cancelar
                    </button>
                    </div>

                </form>
            </Modal>
            )}
        </>
    )
}