import { useState, useRef } from 'react';
import { URL_BOT } from '@/config/env';

// Mensaje que aparece cuando el servicio no está disponible
const MENSAJE_SERVICIO_INACTIVO = 'El servicio no está habilitado. Comunicate con el desarrollador para adquirirlo o con soporte en caso de que ya lo tengas.';

export default function useChatBot() {
        // Estado de apertura/cierre del panel de chat
    const [abierto, setAbierto] = useState(false);

    // Texto que el usuario escribe en el input
    const [pregunta, setPregunta] = useState('');

    // Respuesta que llegó del bot (string) o null si no hay aún
    const [respuesta, setRespuesta] = useState(null);

    // true mientras se espera la respuesta del back
    const [cargando, setCargando] = useState(false);

    // Referencia al input para hacer foco automático al abrir
    const inputRef = useRef(null);

    // Cierra el panel y limpia el estado
    function cerrar() {
        setAbierto(false);
        setPregunta('');
        setRespuesta(null);
    }

    // Envía la pregunta al back del chatbot
    async function enviarPregunta(e) {
        e.preventDefault();

        const textoPregunta = pregunta.trim();
        if (!textoPregunta || cargando) return;

        setCargando(true);
        setRespuesta(null);

        try {
        const res = await fetch(`${URL_BOT}/preguntar`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pregunta: textoPregunta }),
            // Si el back no responde en 15 segundos, consideramos que está caído
            signal: AbortSignal.timeout(15000),
        });

        if (!res.ok) {
            // El back respondió pero con error HTTP (400, 500, etc.)
            const datos = await res.json().catch(() => ({}));
            setRespuesta(datos.detail || 'Ocurrió un error al procesar tu pregunta.');
        } else {
            const datos = await res.json();
            // El back devuelve { respuesta: "..." } o { resultado: "..." }
            // Tomamos el primer campo de texto que encontremos
            const texto =
            datos.respuesta ??
            datos.resultado ??
            datos.mensaje ??
            JSON.stringify(datos);
            setRespuesta(texto);
        }
        } catch {
        // Error de red o timeout → el servicio está apagado
        setRespuesta(MENSAJE_SERVICIO_INACTIVO);
        } finally {
        setCargando(false);
        // Limpiamos el input una vez que la respuesta llegó (o falló)
        setPregunta('');
        }
    }

  // Permite enviar con Enter (sin Shift)
    function manejarTecla(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            enviarPregunta(e);
        }
    }

    return {
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
    }
}