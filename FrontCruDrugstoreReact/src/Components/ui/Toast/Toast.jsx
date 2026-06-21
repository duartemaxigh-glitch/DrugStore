import { useToast } from '@/hooks/useToast';
import {
    CheckCircleIcon,
    XCircleIcon,
    InformationCircleIcon,
} from '@heroicons/react/24/solid';

import './toast.css';

const iconos = {
    exito: CheckCircleIcon,
    error: XCircleIcon,
    info: InformationCircleIcon,
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
                        className={`toast toast-${toast.tipo}`}
                    >
                        <Icono className={`toast-icon toast-icon-${toast.tipo}`} />
                        <p className="toast-message">{toast.mensaje}</p>
                    </div>
                );
            })}
        </div>
    );
}