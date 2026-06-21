import { ChartBarIcon, PrinterIcon } from "@heroicons/react/24/outline";

export default function ReportesHeader({ imprimirReporte, reporte, cargando }) {
    return (
        <div className="reportes-header">
            <h1 className="reportes-title">
                <ChartBarIcon className="reportes-title-icon" />
                Reportes Diarios
            </h1>

            <button
                onClick={imprimirReporte}
                disabled={!reporte || cargando}
                className="reportes-print-button btn"
            >
                <PrinterIcon className="icon-lg reportes-print-icon" />
                Imprimir Reporte
            </button>
        </div>
    );
}