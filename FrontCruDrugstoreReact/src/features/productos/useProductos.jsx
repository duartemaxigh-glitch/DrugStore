import { useEffect, useState } from 'react';
import api from '@/services/api';

export function useCategorias() {
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        api.get('/categorias')
            .then(setCategorias)
            .catch(() => { });
    }, []);

    return categorias;
}