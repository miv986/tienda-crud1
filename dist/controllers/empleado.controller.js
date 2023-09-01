"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmpleado = exports.updateEmpleado = exports.createEmpleado = exports.getEmpleado = exports.getEmpleados = void 0;
const empleadoServices = __importStar(require("../services/empleado.services"));
const getEmpleados = (req, res) => {
    empleadoServices
        .getEmpleados()
        .then((result) => {
        const resultCasted = result;
        if (resultCasted.length > 0) {
            res.status(200).json({
                message: "Empleados retrieved successfully",
                data: resultCasted[0]
            });
        }
        else {
            res.status(404).send("Empleados not found. Error 404");
        }
    })
        .catch((err) => {
        res.status(500).send(err);
    });
};
exports.getEmpleados = getEmpleados;
const getEmpleado = (request, response) => {
    const { id } = request.params;
    empleadoServices
        .getEmpleado(id)
        .then((result) => {
        const resultCasted = result;
        if (resultCasted[0].length > 0) {
            response.status(200).json({
                message: "Empleado retrievd successully",
                data: resultCasted[0]
            });
        }
        else {
            response.status(404).send("Empleado no encontrado. Error 404.");
        }
    })
        .catch((err) => {
        response.status(500).send(err);
    });
};
exports.getEmpleado = getEmpleado;
const createEmpleado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const empleado = req.body;
    try {
        const resultPost = yield empleadoServices.createEmpleado(empleado);
        const idInsertado = resultPost[0].insertId;
        const empleadoRecientCreadoEntityResult = yield empleadoServices.getEmpleado(idInsertado + '');
        res.status(200).json({
            message: "Empleado creado exitosamente",
            data: empleadoRecientCreadoEntityResult[0]
        });
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.createEmpleado = createEmpleado;
const updateEmpleado = (req, res) => {
    const empleado = req.body;
    const { id } = req.params;
    empleadoServices
        .updateEmpleado(id, empleado)
        .then((result) => {
        const resultCasted = result;
        const numeroDeRegistrosActualizados = resultCasted[0].affectedRows;
        if (numeroDeRegistrosActualizados > 0) {
            res.status(200).json({
                message: "Empleado updated successfully",
                data: resultCasted[0],
            });
        }
        else {
            res.status(404).send("Empleado no encontrado. Error 404.");
        }
    })
        .catch((err) => {
        res.status(500).send(err);
    });
};
exports.updateEmpleado = updateEmpleado;
const deleteEmpleado = (req, res) => {
    const { id } = req.params;
    empleadoServices
        .deleteEmpleado(id)
        .then((result) => {
        const resultCasted = result;
        const numeroDeRegistrosEliminados = resultCasted[0].affectedRows;
        if (numeroDeRegistrosEliminados > 0) {
            res.status(200).json({
                message: "Empleado deleted successfully",
            });
        }
        else {
            res.status(404).send("Empleado no encontrado. Error 404.");
        }
    })
        .catch((err) => {
        res.status(500).send(err);
    });
};
exports.deleteEmpleado = deleteEmpleado;
