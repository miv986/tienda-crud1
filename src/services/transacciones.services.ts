import db from "../config/db";
import { Transacciones } from "../models/transacciones.model";

export const getTransacciones = () => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM Transacciones";
        db.execute(query)
            .then((result) => resolve(result))
            .catch((err) => reject(err));
    });
};


export const getTransaccion = (id: string) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM Transacciones WHERE id = ?";
        db.execute(query, [id])
            .then((result) => resolve(result))
            .catch((err) => reject(err));
    });
};


export const createTransaccion = (transaccion: Transacciones) => {
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO Transacciones (tienda_id, producto_id, cantidad_producto) VALUES (?, ?, ?)";
        const { tienda_id, producto_id, cantidad_producto } = transaccion;
        db.execute(query, [tienda_id, producto_id, cantidad_producto])
            .then((result) => resolve(result))
            .catch((err) => reject(err));
    });
};

// export const updateTransaccion = (id: string, transaccion: Transacciones) => {
//     return new Promise((resolve, reject) => {
//         const query = "UPDATE Transacciones SET tienda_id =?, producto_id =?, cantidad_producto = ? WHERE id = ?";
//         const { tienda_id, producto_id, cantidad_producto } = transaccion;
//         db.execute(query, [tienda_id, producto_id, cantidad_producto, id])
//             .then((result) => resolve(result))
//             .catch((err) => reject(err));
//     });
// };

export const deleteTransaccion = (id: string) => {
    return new Promise((resolve, reject) => {
        const query = "DELETE  FROM Transacciones WHERE id = ?";
        db.execute(query, [id])
            .then((result) => resolve(result))
            .catch((err) => reject(err));
    });
};
