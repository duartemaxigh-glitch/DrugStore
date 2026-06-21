
import { useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import './ModalCrud.css'

export default function Modal({ titulo, children, onCerrar }) {

    useEffect(() => {
        const manejarEsc = (e) => {
        if (e.key === 'Escape') onCerrar();
        };

        document.addEventListener('keydown', manejarEsc);
        return () => document.removeEventListener('keydown', manejarEsc);
    }, [onCerrar]);

    return (
        <div className="modal-overlay-container">
            <div className="modal-overlay" onClick={onCerrar} />
            <div className="modal-content">
                <header className="modal-header">
                    <h2 className="modal-title">{titulo}</h2>
                    <button onClick={onCerrar} className="modal-close-btn">
                        <XMarkIcon className="modal-close-icon" />
                    </button>
                </header>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    );
}
