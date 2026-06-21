export default function DatosVentas({
    clienteId,
    setClienteId,
    clientes,
    medioPagoId,
    setMedioPagoId,
    mediosPago
}) {
    return (
        <div className="datos-venta">

            <div className="datos-venta__grupo">
                <label className="datos-venta__label">
                    Cliente (opcional)
                </label>

                <select
                    value={clienteId}
                    onChange={(e) => setClienteId(e.target.value)}
                    className="datos-venta__select"
                >
                    <option value="">
                        Sin cliente
                    </option>

                    {clientes.map((c) => (
                        <option
                            key={c.id_cliente}
                            value={c.id_cliente}
                        >
                            {[c.nombre, c.apellido]
                                .filter(Boolean)
                                .join(' ') ||
                                `Cliente #${c.id_cliente}`}
                        </option>
                    ))}
                </select>
            </div>

            <div className="datos-venta__grupo">
                <label className="datos-venta__label">
                    Medio de Pago *
                </label>

                <select
                    value={medioPagoId}
                    onChange={(e) => setMedioPagoId(e.target.value)}
                    required
                    className="datos-venta__select"
                >
                    {mediosPago.map((mp) => (
                        <option
                            key={mp.id_medio_pago}
                            value={mp.id_medio_pago}
                        >
                            {mp.nombre}
                        </option>
                    ))}
                </select>
            </div>

        </div>
    );
}