// ============================================================
// ChatBot — Asistente IA flotante
// ============================================================
// Ícono flotante en la esquina inferior derecha.
// Al hacer clic abre un panel de chat que envía preguntas
// al back del agente SQL (POST /preguntar en el puerto 8007).
//
// No usa historial: cada pregunta es independiente.
//
// Si el back no responde (servicio apagado o error de red),
// muestra el mensaje de contacto al desarrollador.
// ============================================================

import './ChatBotComp.css'
import { useEffect } from 'react';
import useChatBot from '@/features/chatbot/hooks/useChatBot';
import ChatBotPanel from './ChatBotPanel';
import ChatBotFab from './ChatBotFab';

    // Convierte Markdown básico a elementos React de forma segura (sin dangerouslySetInnerHTML).
    // Soporta: **negrita**  →  <strong>
    //         *cursiva*    →  <em>
    // El resto del texto se devuelve como string plano.
function parsearMarkdown(texto) {
    // Dividimos el texto por los marcadores de negrita (**) e itálica (*)
    const partes = texto.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
    return partes.map(function (parte, i) {
        if (parte.startsWith('**') && parte.endsWith('**')) {
        // **negrita** → <strong>
        return (
            <strong key={i} className="font-semibold text-gray-900">
            {parte.slice(2, -2)}
            </strong>
        );
        }
        if (parte.startsWith('*') && parte.endsWith('*')) {
        // *cursiva* → <em>
        return <em key={i}>{parte.slice(1, -1)}</em>;
        }
        // Texto normal: lo devolvemos tal cual
        return parte;
    });
}

export default function ChatBot() {
    const {
        abierto,
        inputRef,
        cerrar,
        respuesta,
        cargando,
        enviarPregunta,
        pregunta,
        manejarTecla,
        setAbierto,
        setPregunta
    } = useChatBot()

    // Cuando se abre el panel, ponemos el foco en el input
    useEffect(() => {
        if (abierto && inputRef.current) {
        inputRef.current.focus();
        }
    }, [abierto]);

    return (
    <>
        <ChatBotPanel 
        abierto={abierto}
        respuesta={respuesta}
        cargando={cargando}
        parsearMarkdown={parsearMarkdown}
        enviarPregunta={enviarPregunta}
        pregunta={pregunta}
        inputRef={inputRef}
        setPregunta={setPregunta}
        manejarTecla={manejarTecla}/>

        <ChatBotFab abierto={abierto} cerrar={cerrar} setAbierto={setAbierto}/>
    </>
    );
}
