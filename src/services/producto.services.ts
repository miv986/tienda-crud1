import db from "../config/db";
import { Producto } from "../models/producto.model";

export const getProductos = () => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM Producto";
        db.execute(query)
            .then((result) => resolve(result))
            .catch((err) => reject(err));
    });
};


export const getProducto = (id: string) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM Producto WHERE id = ?";
        db.execute(query, [id])
            .then((result) => resolve(result))
            .catch((err) => reject(err));
    });
};


export const createProducto = (producto: Producto) => {
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO Producto (descripcion, precio, cantidad) VALUES (?, ?, ?)";
        const { descripcion, precio, cantidad } = producto;
        console.log(producto)
        db.execute(query, [descripcion, precio, cantidad])
            .then((result) => resolve(result))
            .catch((err) => reject(err));
    });
};

export const updateProducto = (id: string, producto: Producto) => {
    return new Promise((resolve, reject) => {
        const query = "UPDATE Producto SET descripcion =?, precio =?, cantidad =? WHERE id =?";
        const { descripcion, precio, cantidad } = producto;
        db.execute(query, [descripcion, precio, cantidad, id])
            .then((result) => resolve(result))
            .catch((err) => reject(err));
    });
};

export const deleteProducto = (id: string) => {
    return new Promise((resolve, reject) => {
        const query = "DELETE  FROM Producto WHERE id = ?";
        db.execute(query, [id])
            .then((result) => resolve(result))
            .catch((err) => reject(err));
    });
};
   