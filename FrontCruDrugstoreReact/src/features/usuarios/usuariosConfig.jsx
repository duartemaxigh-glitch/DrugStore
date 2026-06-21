export const columnas = [
    { clave: 'id_usuario', titulo: 'ID' },
    { clave: 'apellido', titulo: 'Apellido' },
    { clave: 'nombre', titulo: 'Nombre' },
    { clave: 'dni', titulo: 'DNI' },
    { clave: 'email', titulo: 'Email' },
    {
        clave: 'rol',
        titulo: 'Rol',
        render: (v) => (
            <span className={`badge ${v === 'jefe' ? 'badge-jefe' : 'badge-usuario'}`}>
                {v}
            </span>
        ),
    },
    { clave: 'telefono', titulo: 'Teléfono' },
];

export const campos = [
    { nombre: "apellido", etiqueta: "Apellido", tipo: "text", requerido: true },
    { nombre: "nombre", etiqueta: "Nombre", tipo: "text", requerido: true },
    { nombre: "dni", etiqueta: "DNI", tipo: "text", requerido: true },
    { nombre: "email", etiqueta: "Email", tipo: "email", requerido: true },
    {
        nombre: "password",
        etiqueta: "Contraseña",
        tipo: "password",
        requerido: true,
        soloCrear: true,
    },
    {
        nombre: "rol",
        etiqueta: "Rol",
        tipo: "select",
        requerido: true,
        opciones: [ { valor: "empleado", texto: "Empleado" }, { valor: "jefe", texto: "Jefe" },
        ],
    },
    { nombre: "telefono", etiqueta: "Teléfono", tipo: "text" },
];