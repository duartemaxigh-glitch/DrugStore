import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth.jsx';
import { HomeIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import './NotFound.css';

export default function NotFound() {
  const { usuario } = useAuth();

  // Si el usuario está autenticado, volvemos al dashboard. Si no, al login.
  const rutaRetorno = usuario ? '/dashboard' : '/login';

  return (
    <div className="not-found-container flex-center">
      <div className="not-found-card">
        <span className="not-found-icon-container" role="img" aria-label="Bot de error">
          <ExclamationTriangleIcon className="icon-md" />
        </span>
        <h1 className="not-found-code">404</h1>
        <h2 className="not-found-title">Página no encontrada</h2>
        <p className="not-found-desc">
          ¡Oops! La página que estás buscando no existe o ha sido movida temporalmente.
        </p>
        <Link to={rutaRetorno} className="btn btn-primary not-found-btn">
          <HomeIcon className="not-found-btn-icon" />
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
}
