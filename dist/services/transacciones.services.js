"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTransaccion = exports.updateTransaccion = exports.createTransaccion = exports.getTransaccion = exports.getTransacciones = void 0;
const db_1 = __importDefault(require("../config/db"));
const getTransacciones = () => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM Transacciones";
        db_1.default.execute(query)
            .then((result) => resolve(result))
            .catch((err) => reject(err));
    });
};
exports.getTransacciones = getTransacciones;
const getTransaccion = (id) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM Transacciones WHERE id = ?";
        db_1.default.execute(query, [id])
            .then((result) => resolve(result))
            .catch((err) => reject(err));
    });
};
exports.getTransaccion = getTransaccion;
const createTransaccion = (transaccion) => {
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO Transacciones (tienda_id, producto_id, cantidad_producto) VALUES (?, ?, ?)";
        const { tienda_id, producto_id, cantidad_producto } = transaccion;
        db_1.default.execute(query, [tienda_id, producto_id, cantidad_producto])
            .then((result) => resolve(result))
            .catch((err) => reject(err));
    });
};
exports.createTransaccion = createTransaccion;
const updateTransaccion = (id, transaccion) => {
    return new Promise((resolve, reject) => {
        const query = "UPDATE Transacciones SET tienda_id =?, producto_id =?, cantidad_producto = ? WHERE id = ?";
        const { tienda_id, producto_id, cantidad_producto } = transaccion;
        db_1.default.execute(query, [tienda_id, producto_id, cantidad_producto, id])
            .then((result) => resolve(result))
            .catch((err) => reject(err));
    });
};
exports.updateTransaccion = updateTransaccion;
const deleteTransaccion = (id) => {
    return new Promise((resolve, reject) => {
        const query = "DELETE  FROM Transacciones WHERE id = ?";
        db_1.default.execute(query, [id])
            .then((result) => resolve(result))
            .catch((err) => reject(err));
    });
};
exports.deleteTransaccion = deleteTransaccion;
