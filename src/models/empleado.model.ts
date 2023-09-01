export interface Empleado {
    id: number,
    nombre: string,
    apellidos: string,
    edad: number,
    sexo: 'F' | 'M',
    etnia: string,
    id_tienda: number | null,
    id_rol: number | null
}