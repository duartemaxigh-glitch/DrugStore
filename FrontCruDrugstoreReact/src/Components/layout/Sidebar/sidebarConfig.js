import {
    HomeIcon,
    ShoppingCartIcon,
    TruckIcon,
    CubeIcon,
    TagIcon,
    UserGroupIcon,
    BuildingStorefrontIcon,
    CreditCardIcon,
    UsersIcon,
    ChartBarIcon,
} from "@heroicons/react/24/outline";

export const navegacion = [
    { nombre: "Inicio", ruta: "/dashboard", icono: HomeIcon },
    { nombre: "Ventas", ruta: "/dashboard/ventas", icono: ShoppingCartIcon },
    { nombre: "Compras", ruta: "/dashboard/compras", icono: TruckIcon },
    { nombre: "Productos", ruta: "/dashboard/productos", icono: CubeIcon },
    { nombre: "Categorías", ruta: "/dashboard/categorias", icono: TagIcon },
    { nombre: "Clientes", ruta: "/dashboard/clientes", icono: UserGroupIcon },
    {
        nombre: "Proveedores",
        ruta: "/dashboard/proveedores",
        icono: BuildingStorefrontIcon,
    },
    {
        nombre: "Medios de Pago",
        ruta: "/dashboard/medios-pago",
        icono: CreditCardIcon,
    },
];

export const navegacionJefe = [
    { nombre: "Usuarios", ruta: "/dashboard/usuarios", icono: UsersIcon },
    { nombre: "Reportes", ruta: "/dashboard/reportes", icono: ChartBarIcon },
];