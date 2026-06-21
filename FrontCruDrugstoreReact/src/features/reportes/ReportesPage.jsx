import TicketPreview from "@/components/ui/TicketPreview/TicketPreview";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import useReportes from "@/features/reportes/hooks/useReportes";
import { useToast } from "@/hooks/useToast";
import ReportesHeader from "./ReportesHeader";
import Controles from "./controles/Controles";
import ReportesResumen from "./ReportesResumen";
import ReportesTablaDetalle from "./ReportesTablaDetalle";
import './ReportesPage.css'

export default function ReportesPage() {
    const { esJefe } = useAuth();
    const toast = useToast();

    const {
        reporte,
        cargando,
        tab,
        ticketTexto,
        fecha,

        imprimirReporte,

        setTab,
        setFecha,
        setTicketTexto
    } = useReportes({ esJefe, toast });

    if (!esJefe()) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <div className="reportes-page">
            <ReportesHeader
                imprimirReporte={imprimirReporte}
                reporte={reporte}
                cargando={cargando}
            />

            <Controles
                fecha={fecha}
                tab={tab}
                setFecha={setFecha}
                setTab={setTab}
            />

            {cargando ? (
                <div className="loading-container">
                    <div className="loading-spinner" />
                </div>
            ) : !reporte ? (
                <div className="empty-state">
                    <p className="empty-state-text">
                        Seleccioná una fecha para ver el reporte
                    </p>
                </div>
            ) : (
                <>
                    <ReportesResumen tab={tab} reporte={reporte} />
                    <ReportesTablaDetalle tab={tab} reporte={reporte} />
                </>
            )}

            {ticketTexto && (
                <TicketPreview
                    texto={ticketTexto}
                    onCerrar={() => setTicketTexto(null)}
                />
            )}
        </div>
    );
}
