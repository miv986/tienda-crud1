import db from "../config/db";
import { Empleado } from "../models/empleado.model";



export const getEmpleados = () => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM Empleado";
        db.execute(query)
            .then((result) => resolve(result))
            .catch((err) => reject(err));
    });
};


export const getEmpleado = (id: string) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM Empleado WHERE id = ?";
        db.execute(query, [id])
            .then((result) => resolve(result))
            .catch((err) => reject(err));
    });
};


export const createEmpleado = (empleado: Empleado) => {
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO Empleado (nombre, apellidos, edad, sexo, etnia) VALUES (?, ?, ?, ?, ?)";
        const { nombre, apellidos, edad, sexo, etnia } = empleado;
        db.execute(query, [nombre, apellidos, edad, sexo, etnia,])
            .then((result) => resolve(result))
            .catch((err) => reject(err));
    });
};

export const updateEmpleado = (id: string, empleado: Empleado) => {
    return new Promise((resolve, reject) => {
        const query = "UPDATE Empleado SET nombre =?, apellidos =?, edad = ?, sexo=?, etnia =? WHERE id = ?";
        const { nombre, apellidos, edad, sexo, etnia } = empleado;
        db.execute(query, [nombre, apellidos, edad, sexo, etnia, Number(id)])
            .then((result) => resolve(result))
            .catch((err) => reject(err));
    });
};

export const deleteEmpleado = (id: string) => {
    return new Promise((resolve, reject) => {
        const query = "DELETE  FROM Empleado WHERE id = ?";
        db.execute(query, [id])
            .then((result) => resolve(result))
            .catch((err) => reject(err));
    });
};
