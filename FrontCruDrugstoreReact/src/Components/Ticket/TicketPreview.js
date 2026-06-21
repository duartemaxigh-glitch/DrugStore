import Modal from '@/Components/Modal/ModalCrud';
import './TicketPreview.css';

export default function TicketPreview({ texto, onCerrar }) {
  function imprimir() {
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
      <div className="ticket-preview-content">
        <pre className="ticket-preview-pre">
          {texto}
        </pre>
      </div>
      <div className="ticket-preview-buttons">
        <button
          onClick={imprimir}
          className="ticket-preview-btn-print"
        >
          🖨️ Imprimir
        </button>
        <button
          onClick={onCerrar}
          className="ticket-preview-btn-close"
        >
          Cerrar
        </button>
      </div>
    </Modal>
  );
}