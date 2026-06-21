export default function ReportesResumen({ tab, reporte }) {
    return (
        <div className="reportes-resumen">
            <div className="resumen-card">
                <p className="resumen-label">
                    {tab === 'ventas' ? 'Ventas del día' : 'Compras del día'}
                </p>

                <p className="resumen-value">
                    {tab === 'ventas'
                        ? reporte.cantidad_ventas
                        : reporte.cantidad_compras}
                </p>
            </div>

            <div className="resumen-card">
                <p className="resumen-label">
                    Total del día
                </p>

                <p
                    className={`resumen-total ${
                        tab === 'ventas'
                            ? 'resumen-total-ventas'
                            : 'resumen-total-compras'
                    }`}
                >
                    ${reporte.total_dia.toFixed(2)}
                </p>
            </div>
        </div>
    );
}