"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmpleado = exports.updateEmpleado = exports.createEmpleado = exports.getEmpleado = exports.getEmpleados = void 0;
const db_1 = __importDefault(require("../config/db"));
const getEmpleados = () => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM Empleado";
        db_1.default.execute(query)
            .then((result) => resolve(result))
            .catch((err) => reject(err));
    });
};
exports.getEmpleados = getEmpleados;
const getEmpleado = (id) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM Empleado WHERE id = ?";
        db_1.default.execute(query, [id])
            .then((result) => resolve(result))
            .catch((err) => reject(err));
    });
};
exports.getEmpleado = getEmpleado;
const createEmpleado = (empleado) => {
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO Empleado (nombre, apellidos, edad, sexo, etnia) VALUES (?, ?, ?, ?, ?)";
        const { nombre, apellidos, edad, sexo, etnia } = empleado;
        db_1.default.execute(query, [nombre, apellidos, edad, sexo, etnia,])
            .then((result) => resolve(result))
            .catch((err) => reject(err));
    });
};
exports.createEmpleado = createEmpleado;
const updateEmpleado = (id, empleado) => {
    return new Promise((resolve, reject) => {
        const query = "UPDATE Empleado SET nombre =?, apellidos =?, edad = ?, sexo=?, etnia =? WHERE id = ?";
        const { nombre, apellidos, edad, sexo, etnia } = empleado;
        db_1.default.execute(query, [nombre, apellidos, edad, sexo, etnia, Number(id)])
            .then((result) => resolve(result))
            .catch((err) => reject(err));
    });
};
exports.updateEmpleado = updateEmpleado;
const deleteEmpleado = (id) => {
    return new Promise((resolve, reject) => {
        const query = "DELETE  FROM Empleado WHERE id = ?";
        db_1.default.execute(query, [id])
            .then((result) => resolve(result))
            .catch((err) => reject(err));
    });
};
exports.deleteEmpleado = deleteEmpleado;
