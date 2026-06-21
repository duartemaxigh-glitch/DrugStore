import { PaperAirplaneIcon } from '@heroicons/react/24/outline';

export default function ChatBotPanel({ 
    abierto, 
    respuesta, 
    cargando, 
    parsearMarkdown, 
    enviarPregunta, 
    pregunta, 
    inputRef, 
    setPregunta, 
    manejarTecla }) 
    {
    return (
        <>
            {abierto && (
                <div className="chat-panel">
                    <header className="chat-header">
                        <div className="chat-title">
                    
                        <span className="status-dot"></span>
                        <span>Asistente IA</span>
                        </div>
                    </header>

                    <div className="chat-body">
                        {!respuesta && !cargando && (
                        <p className="chat-empty">
                            Hacé una pregunta sobre los datos del sistema.
                        </p>
                        )}

                        {cargando && (
                        <div className="chat-loading">
                            <div className="loader-green"></div>
                            Consultando...
                        </div>
                        )}

                        {/* Respuesta del bot */}
                        {respuesta && !cargando && (
                        <div className="chat-response">
                            {parsearMarkdown(respuesta)}
                        </div>
                        )}
                    </div>

                    <form
                        onSubmit={enviarPregunta}
                        className="chat-form"
                    >
                        <textarea
                            ref={inputRef}
                            value={pregunta}
                            onChange={(e) => setPregunta(e.target.value)}
                            onKeyDown={manejarTecla}
                            placeholder="Ej: ¿Cuáles son los productos con menos stock?"
                            rows={2}
                            disabled={cargando}
                            className="chat-textarea"
                        />

                        <button
                            type="submit"
                            disabled={!pregunta.trim() || cargando}
                            className="chat-send"
                            aria-label="Enviar pregunta"
                        >
                            <PaperAirplaneIcon className="icon-md" />
                        </button>
                    </form>
                </div>
            )}
        </>
    )
}