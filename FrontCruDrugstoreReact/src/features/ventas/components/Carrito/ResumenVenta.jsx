export default function ResumenVenta({
    total,
    finalizarVenta,
    carrito,
    finalizando
}) {
    return (
        <div className="resumen-venta">

            <div className="resumen-venta__total">
                <span className="resumen-venta__label">
                    TOTAL
                </span>

                <span className="resumen-venta__monto">
                    ${total.toFixed(2)}
                </span>
            </div>

            <button
                onClick={finalizarVenta}
                disabled={carrito.length === 0 || finalizando}
                className="resumen-venta__btn"
            >
                {finalizando
                    ? 'Procesando...'
                    : 'Finalizar Venta'}
            </button>

        </div>
    );
}