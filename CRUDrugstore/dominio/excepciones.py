# ============================================================
# Excepciones del Dominio
# ============================================================
# Son errores propios del negocio, NO errores técnicos.
# Ejemplo: si alguien manda un DNI con letras, eso es un
# error de validación del negocio.
# ============================================================


class ErrorDeValidacion(Exception):
    """Se lanza cuando un dato no cumple las reglas del negocio."""
    pass


class EntidadNoEncontrada(Exception):
    """Se lanza cuando se busca algo que no existe en la base de datos."""
    pass


class EntidadDuplicada(Exception):
    """Se lanza cuando se intenta crear algo que ya existe (ej: DNI repetido)."""
    pass
