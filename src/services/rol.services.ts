import db from "../config/db";
import { Rol } from "../models/rol.model";

export const getRoles = () => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM Rol";
        db.execute(query)
            .then((result) => resolve(result))
            .catch((err) => reject(err));
    });
};


export const getRol = (id: string) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM Rol WHERE id = ?";
        db.execute(query, [id])
            .then((result) => resolve(result))
            .catch((err) => reject(err));
    });
};


export const createRol = (rol: Rol) => {
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO Rol (descripcion) VALUES (?)";
        const { descripcion } = rol;
        db.execute(query, [descripcion])
            .then((result) => resolve(result))
            .catch((err) => reject(err));
    });
};

export const updateRol = (id: string, rol: Rol) => {
    return new Promise((resolve, reject) => {
        const query = "UPDATE Rol SET descripcion =? WHERE id = ?";
        const { descripcion } = rol;
        db.execute(query, [descripcion, id])
            .then((result) => resolve(result))
            .catch((err) => reject(err));
    });
};

export const deleteRol = (id: string) => {
    return new Promise((resolve, reject) => {
        const query = "DELETE  FROM Rol WHERE id = ?";
        db.execute(query, [id])
            .then((result) => resolve(result))
            .catch((err) => reject(err));
    });
}
