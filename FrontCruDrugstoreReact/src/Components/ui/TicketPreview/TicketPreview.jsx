import Modal from "../Modal/ModalCrud";
import './TicketPreview.css'

export default function TicketPreview({ texto, onCerrar }) {
    function imprimir() {
        // Escapamos caracteres HTML para seguridad
        const textoSeguro = texto
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');

        const ventana = window.open('', '_blank', 'width=350,height=600');
        if (!ventana) return;

        ventana.document.write(
            '<!DOCTYPE html><html><head><title>Ticket</title>' +
            '<style>' +
            'body{font-family:"Courier New",monospace;font-size:12px;width:80mm;margin:0 auto;padding:5mm}' +
            'pre{white-space:pre-wrap;word-wrap:break-word;margin:0}' +
            '@media print{body{padding:0;margin:0}}' +
            '</style></head><body>' +
            '<pre>' + textoSeguro + '</pre>' +
            '<script>window.onload=function(){window.print()}</script>' +
            '</body></html>'
        );
        ventana.document.close();
    }
    return (
        <Modal titulo="Vista Previa del Ticket" onCerrar={onCerrar} ancho="max-w-sm">
            <div className="ticket-preview">
                <pre className="ticket-preview__text">
                    {texto}
                </pre>
            </div>
            <div className="ticket-preview__actions">
                <button
                    onClick={imprimir}
                    className="btn btn-primary"
                >
                    🖨️ Imprimir
                </button>
                <button
                    onClick={onCerrar}
                    className="btn btn-secondary"
                >
                    Cerrar
                </button>
            </div>
        </Modal>
    );
}