import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Login from '@/features/login/LoginPage.jsx';
import DashboardLayout from '@/components/layout/MainLayout/MainLayout.jsx';
import DashboardPage from '@/features/dashboard/DashboardPage.jsx';
import UsuariosPage from '@/features/usuarios/UsuariosPage.jsx';
import ProductosPage from '@/features/productos/ProductosPage.jsx';
import CategoriasPage from '@/features/categorias/CategoriasPage';
import ClientesPage from '@/features/clientes/ClientesPage';
import NotFound from '@/features/NotFound/NotFound.jsx';
import ProveedoresPage from '@/features/proveedores/ProveedoresPage';
import MediosPagoPage from '@/features/medios-pago/MediosPagoPage';
import VentasPage from '@/features/ventas/VentasPage';
import ReportesPage from '@/features/reportes/ReportesPage';
import ComprasPage from '@/features/compras/ComprasPage';

// 1. Definimos la estructura de rutas como un array de objetos JavaScript
export const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/login" replace />,
        errorElement: <NotFound />
    },
    {
        path: "/login",
        element: <Login />,
        errorElement: <NotFound />
    },
    {
        path: "/dashboard",
        element: <DashboardLayout />, // Este layout debe contener el <Outlet />
        errorElement: <NotFound />,
        children: [
            {
                index: true, // Esto equivale a /dashboard
                element: <DashboardPage />
            },
            {
                path: "usuarios",
                element: <UsuariosPage />
            },
            {
                path: "productos",
                element: <ProductosPage />
            },
            {
                path: "categorias",
                element: <CategoriasPage />
            },
            {
                path: "clientes",
                element: <ClientesPage />
            },
            {
                path: "proveedores",
                element: <ProveedoresPage />
            },
            {
                path: "medios-pago",
                element: <MediosPagoPage />
            },
            {
                path: "ventas",
                element: <VentasPage />
            },
            {
                path: "compras",
                element: <ComprasPage />
            },
            {
                path: "reportes",
                element: <ReportesPage />
            },
            {
                path: "*",
                element: <NotFound />
            }
        ]
    },
    {
        path: "*",
        element: <NotFound />
    }
]);

// 2. El componente principal solo renderiza el proveedor con nuestro router
export default function AppRouter() {
    return <RouterProvider router={router} />;
}
