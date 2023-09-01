"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRol = exports.updateRol = exports.createRol = exports.getRol = exports.getRoles = void 0;
const db_1 = __importDefault(require("../config/db"));
const getRoles = () => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM Rol";
        db_1.default.execute(query)
            .then((result) => resolve(result))
            .catch((err) => reject(err));
    });
};
exports.getRoles = getRoles;
const getRol = (id) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM Rol WHERE id = ?";
        db_1.default.execute(query, [id])
            .then((result) => resolve(result))
            .catch((err) => reject(err));
    });
};
exports.getRol = getRol;
const createRol = (rol) => {
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO Rol (descripcion) VALUES (?)";
        const { descripcion } = rol;
        db_1.default.execute(query, [descripcion])
            .then((result) => resolve(result))
            .catch((err) => reject(err));
    });
};
exports.createRol = createRol;
const updateRol = (id, rol) => {
    return new Promise((resolve, reject) => {
        const query = "UPDATE Rol SET descripcion =? WHERE id = ?";
        const { descripcion } = rol;
        db_1.default.execute(query, [descripcion, id])
            .then((result) => resolve(result))
            .catch((err) => reject(err));
    });
};
exports.updateRol = updateRol;
const deleteRol = (id) => {
    return new Promise((resolve, reject) => {
        const query = "DELETE  FROM Rol WHERE id = ?";
        db_1.default.execute(query, [id])
            .then((result) => resolve(result))
            .catch((err) => reject(err));
    });
};
exports.deleteRol = deleteRol;
