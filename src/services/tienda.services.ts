import db from "../config/db";
import { Tienda } from "../models/tienda.model";

export const getTiendas = () => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM Tienda";
        db.execute(query)
            .then((result) => resolve(result))
            .catch((err) => reject(err));
    });
};


export const getTienda = (id: string) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM Tienda WHERE id = ?";
        db.execute(query, [id])
            .then((result) => resolve(result))
            .catch((err) => reject(err));
    });
};


export const createTienda = (tienda: Tienda) => {
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO Tienda (direccion, ciudad, codigo_postal, pais) VALUES (?, ?, ?, ?)";
        const { direccion, ciudad, codigo_postal, pais } = tienda;
        db.execute(query, [direccion, ciudad, codigo_postal, pais])
            .then((result) => resolve(result))
            .catch((err) => reject(err));
    });
};

export const updateTienda = (id: string, tienda: Tienda) => {
    return new Promise((resolve, reject) => {
        const query = "UPDATE Tienda SET direccion =?, ciudad =?, codigo_postal = ?, pais=? WHERE id = ?";
        const { direccion, ciudad, codigo_postal, pais } = tienda;
        db.execute(query, [direccion, ciudad, codigo_postal, pais, id])
            .then((result) => resolve(result))
            .catch((err) => reject(err));
    });
};

export const deleteTienda = (id: string) => {
    return new Promise((resolve, reject) => {
        const query = "DELETE  FROM Tienda WHERE id = ?";
        db.execute(query, [id])
            .then((result) => resolve(result))
            .catch((err) => reject(err));
    });
};