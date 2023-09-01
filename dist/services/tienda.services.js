"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTienda = exports.updateTienda = exports.createTienda = exports.getTienda = exports.getTiendas = void 0;
const db_1 = __importDefault(require("../config/db"));
const getTiendas = () => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM Tienda";
        db_1.default.execute(query)
            .then((result) => resolve(result))
            .catch((err) => reject(err));
    });
};
exports.getTiendas = getTiendas;
const getTienda = (id) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM Tienda WHERE id = ?";
        db_1.default.execute(query, [id])
            .then((result) => resolve(result))
            .catch((err) => reject(err));
    });
};
exports.getTienda = getTienda;
const createTienda = (tienda) => {
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO Tienda (direccion, ciudad, codigo_postal, pais) VALUES (?, ?, ?, ?)";
        const { direccion, ciudad, codigo_postal, pais } = tienda;
        db_1.default.execute(query, [direccion, ciudad, codigo_postal, pais])
            .then((result) => resolve(result))
            .catch((err) => reject(err));
    });
};
exports.createTienda = createTienda;
const updateTienda = (id, tienda) => {
    return new Promise((resolve, reject) => {
        const query = "UPDATE Tienda SET direccion =?, ciudad =?, codigo_postal = ?, pais=? WHERE id = ?";
        const { direccion, ciudad, codigo_postal, pais } = tienda;
        db_1.default.execute(query, [direccion, ciudad, codigo_postal, pais, id])
            .then((result) => resolve(result))
            .catch((err) => reject(err));
    });
};
exports.updateTienda = updateTienda;
const deleteTienda = (id) => {
    return new Promise((resolve, reject) => {
        const query = "DELETE  FROM Tienda WHERE id = ?";
        db_1.default.execute(query, [id])
            .then((result) => resolve(result))
            .catch((err) => reject(err));
    });
};
exports.deleteTienda = deleteTienda;
