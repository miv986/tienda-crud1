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
exports.deleteProducto = exports.updateProducto = exports.createProducto = exports.getProducto = exports.getProductos = void 0;
const productoServices = __importStar(require("../services/producto.services"));
const getProductos = (req, res) => {
    productoServices
        .getProductos()
        .then((result) => {
        const resultCasted = result;
        if (resultCasted.length > 0) {
            res.status(200).json({
                message: "Productos retrieved successfully",
                data: resultCasted[0]
            });
        }
        else {
            res.status(404).send("Productos no encontrados. Error 404");
        }
    })
        .catch((err) => {
        res.status(500).send(err);
    });
};
exports.getProductos = getProductos;
const getProducto = (req, res) => {
    const { id } = req.params;
    productoServices
        .getProducto(id)
        .then((result) => {
        const resultCasted = result;
        if (resultCasted[0].length > 0) {
            res.status(200).json({
                message: "Producto retrievd successully",
                data: resultCasted[0]
            });
        }
        else {
            res.status(404).send("Producto no encontrado. Error 404");
        }
    })
        .catch((err) => {
        res.status(500).send(err);
    });
};
exports.getProducto = getProducto;
const createProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const producto = req.body;
    try {
        const resultPost = yield productoServices.createProducto(producto);
        const idInsertado = resultPost[0].insertId;
        const productoRecientCreadoEntityResult = yield productoServices.getProducto(idInsertado + '');
        res.status(200).json({
            message: "Producto creado exitosamente",
            data: productoRecientCreadoEntityResult[0]
        });
    }
    catch (err) {
        res.status(500).send(err);
    }
});
exports.createProducto = createProducto;
const updateProducto = (req, res) => {
    const producto = req.body;
    const { id } = req.params;
    productoServices
        .updateProducto(id, producto)
        .then((result) => {
        const resultCasted = result;
        const numerodeRegistrosActualizados = resultCasted[0].affectedRows;
        if (numerodeRegistrosActualizados > 0) {
            res.status(200).json({
                message: "Producto updated successfully",
                data: resultCasted[0],
            });
        }
        else {
            res.status(404).send("Producto no encontrado. Error 404");
        }
    })
        .catch((err) => {
        res.status(500).send(err);
    });
};
exports.updateProducto = updateProducto;
const deleteProducto = (req, res) => {
    const { id } = req.params;
    productoServices
        .deleteProducto(id)
        .then((result) => {
        const resultCasted = result;
        const numeroDeRegistrosEliminados = resultCasted[0].affectedRows;
        if (numeroDeRegistrosEliminados > 0) {
            res.status(200).json({
                message: "Producto deleted successfully",
            });
        }
        else {
            res.status(404).send("Empleado not found. Error 404");
        }
    })
        .catch((err) => {
        res.status(500).send(err);
    });
};
exports.deleteProducto = deleteProducto;
