import PaginaCrud from '@/components/crud/PaginaCrud.jsx';
import { campos, columnas } from './usuariosConfig.jsx';
import './UsuariosConfig.css'
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { router } from '@/routes/AppRouter.jsx';
import { useAuth } from '@/hooks/useAuth.jsx';

export default function UsuariosPage() {
    const { esJefe } = useAuth();

    if (!esJefe()) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <PaginaCrud
            titulo="Usuarios"
            endpoint="/usuarios"
            idCampo="id_usuario"
            columnas={columnas}
            campos={campos}
            valoresIniciales={{ rol: 'empleado' }}
        />
    );
}