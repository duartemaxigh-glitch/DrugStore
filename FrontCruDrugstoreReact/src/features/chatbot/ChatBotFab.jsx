import { XMarkIcon } from '@heroicons/react/24/outline';

export default function ChatBotFab({ abierto, cerrar, setAbierto }) {
    return (
        <button
            onClick={() => (abierto ? cerrar() : setAbierto(true))}
            aria-label={abierto ? 'Cerrar asistente' : 'Abrir asistente IA'}
            title="Asistente IA"
            className="chat-fab"
        >
            {abierto ? (
                <XMarkIcon className="icon-lg" />
            ) : (
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon-lg chat-fab-icon"
                    aria-hidden="true"
                >
                    {/* Cabeza */}
                    <rect x="3" y="8" width="18" height="12" rx="3" />

                    {/* Ojos */}
                    <circle cx="9" cy="14" r="1.2" fill="currentColor" stroke="none" />
                    <circle cx="15" cy="14" r="1.2" fill="currentColor" stroke="none" />

                    {/* Antena */}
                    <line x1="12" y1="8" x2="12" y2="4" />
                    <circle cx="12" cy="3.5" r="1" fill="currentColor" stroke="none" />

                    {/* Boca */}
                    <line x1="9" y1="17.5" x2="15" y2="17.5" />
                </svg>
            )}
        </button>
    )
}