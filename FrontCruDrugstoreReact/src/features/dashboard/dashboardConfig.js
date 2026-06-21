import {
    ShoppingCartIcon,
    CubeIcon,
    UserGroupIcon,
    UsersIcon,
    ChartBarIcon,
    TruckIcon,
} from "@heroicons/react/24/outline";

export const accesos = [
    {
        titulo: "Nueva Venta",
        descripcion: "Registrar una venta",
        icono: ShoppingCartIcon,
        ruta: "/dashboard/ventas",
        color: "bg-yellow",
    },
    {
        titulo: "Nueva Compra",
        descripcion: "Registrar compra a proveedor",
        icono: TruckIcon,
        ruta: "/dashboard/compras",
        color: "bg-blue",
    },
    {
        titulo: "Productos",
        descripcion: "Gestionar inventario",
        icono: CubeIcon,
        ruta: "/dashboard/productos",
        color: "bg-purple",
    },
    {
        titulo: "Clientes",
        descripcion: "Gestionar clientes",
        icono: UserGroupIcon,
        ruta: "/dashboard/clientes",
        color: "bg-amber",
    },
];

export const accesosJefe = [
    {
        titulo: "Usuarios",
        descripcion: "Gestionar empleados",
        icono: UsersIcon,
        ruta: "/dashboard/usuarios",
        color: "bg-red",
    },
    {
        titulo: "Reportes",
        descripcion: "Ver informes del día",
        icono: ChartBarIcon,
        ruta: "/dashboard/reportes",
        color: "bg-cyan",
    },
];

