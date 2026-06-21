export default function crearProductosConfig(categorias) {
    return {
        columnas: [
            { clave: 'id_producto', titulo: 'ID' },
            { clave: 'nombre', titulo: 'Nombre' },
            {
                clave: 'precio_venta',
                titulo: 'P. Venta',
                render: (v) => `$${Number(v).toFixed(2)}`,
            },
            {
                clave: 'precio_compra',
                titulo: 'P. Compra',
                render: (v) => `$${Number(v).toFixed(2)}`,
            },
            {
                clave: 'stock',
                titulo: 'Stock',
                render: (v) => (
                <span className={`stock-badge ${v <= 5 ? 'stock-low' : 'stock-ok'}`}>
                    {v}
                </span>
            ),
            },
            { clave: 'codigo_barras', titulo: 'Código' },
            {
                clave: 'id_categoria',
                titulo: 'Categoría',
                render: (v) => {
                    const cat = categorias.find((c) => c.id_categoria === v);
                    return cat ? cat.nombre : '—';
                },
            },
        ],

        campos: [
            { nombre: 'nombre', etiqueta: 'Nombre', tipo: 'text', requerido: true },
            {
                nombre: 'precio_venta',
                etiqueta: 'Precio de Venta',
                tipo: 'number',
                requerido: true,
                paso: '0.01',
            },
            {
                nombre: 'precio_compra',
                etiqueta: 'Precio de Compra',
                tipo: 'number',
                requerido: true,
                paso: '0.01',
            },
            // Stock no se edita manualmente: lo gestiona el sistema con ventas y compras
            { nombre: 'codigo_barras', etiqueta: 'Código de Barras', tipo: 'text' },
            {
                nombre: 'id_categoria',
                etiqueta: 'Categoría',
                tipo: 'select',
                opciones: categorias.map((c) => ({
                    valor: c.id_categoria,
                    texto: c.nombre,
                })),
            },
        ]
    }
}