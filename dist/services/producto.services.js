"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProducto = exports.updateProducto = exports.createProducto = exports.getProducto = exports.getProductos = void 0;
const db_1 = __importDefault(require("../config/db"));
const getProductos = () => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM Producto";
        db_1.default.execute(query)
            .then((result) => resolve(result))
            .catch((err) => reject(err));
    });
};
exports.getProductos = getProductos;
const getProducto = (id) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM Producto WHERE id = ?";
        db_1.default.execute(query, [id])
            .then((result) => resolve(result))
            .catch((err) => reject(err));
    });
};
exports.getProducto = getProducto;
const createProducto = (producto) => {
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO Producto (descripcion, precio, cantidad) VALUES (?, ?, ?)";
        const { descripcion, precio, cantidad } = producto;
        console.log(producto);
        db_1.default.execute(query, [descripcion, precio, cantidad])
            .then((result) => resolve(result))
            .catch((err) => reject(err));
    });
};
exports.createProducto = createProducto;
const updateProducto = (id, producto) => {
    return new Promise((resolve, reject) => {
        const query = "UPDATE Producto SET descripcion =?, precio =?, cantidad =? WHERE id =?";
        const { descripcion, precio, cantidad } = producto;
        db_1.default.execute(query, [descripcion, precio, cantidad, id])
            .then((result) => resolve(result))
            .catch((err) => reject(err));
    });
};
exports.updateProducto = updateProducto;
const deleteProducto = (id) => {
    return new Promise((resolve, reject) => {
        const query = "DELETE  FROM Producto WHERE id = ?";
        db_1.default.execute(query, [id])
            .then((result) => resolve(result))
            .catch((err) => reject(err));
    });
};
exports.deleteProducto = deleteProducto;
