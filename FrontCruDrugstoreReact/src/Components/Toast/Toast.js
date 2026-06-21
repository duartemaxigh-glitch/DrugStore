import { useToast } from '@/Context/ToastContext';
import {
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/solid';
import './Toast.css';

const iconos = {
  exito: CheckCircleIcon,
  error: XCircleIcon,
  info: InformationCircleIcon,
};

const colores = {
  exito: 'toast-exito',
  error: 'toast-error',
  info: 'toast-info',
};

const coloresIcono = {
  exito: 'toast-icon-exito',
  error: 'toast-icon-error',
  info: 'toast-icon-info',
};

export default function Toast() {
  const { toasts } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => {
        const Icono = iconos[toast.tipo];
        return (
          <div
            key={toast.id}
            className={`toast-item ${colores[toast.tipo]}`}
          >
            <Icono className={`toast-icon ${coloresIcono[toast.tipo]}`} />
            <p className="toast-mensaje">{toast.mensaje}</p>
          </div>
        );
      })}
    </div>
  );
}