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
exports.deleteTienda = exports.updateTienda = exports.createTienda = exports.getTienda = exports.getTiendas = void 0;
const tiendaServices = __importStar(require("../services/tienda.services"));
const getTiendas = (req, res) => {
    tiendaServices
        .getTiendas()
        .then((result) => {
        const resultCasted = result;
        if (resultCasted.length > 0) {
            res.status(200).json({
                message: "Tiendas retrieved successfully",
                data: resultCasted[0]
            });
        }
        else {
            res.status(404).send("Tiendas not found. Error 404");
        }
    })
        .catch((err) => {
        res.status(500).send(err);
    });
};
exports.getTiendas = getTiendas;
const getTienda = (req, res) => {
    const { id } = req.params;
    tiendaServices
        .getTienda(id)
        .then((result) => {
        const resultCasted = result;
        if (resultCasted[0].length > 0) {
            res.status(200).json({
                message: "Tienda retrievd successully",
                data: resultCasted[0]
            });
        }
        else {
            res.status(404).send("Tienda not found. Error 404");
        }
    })
        .catch((err) => {
        res.status(500).send(err);
    });
};
exports.getTienda = getTienda;
const createTienda = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tienda = req.body;
    try {
        const resultPost = yield tiendaServices.createTienda(tienda);
        const idInsertado = resultPost[0].insertId;
        const tiendaRecientCreadaEntityResult = yield tiendaServices.getTienda(idInsertado + '');
        res.status(200).json({
            message: "Tienda created successfully",
            data: tiendaRecientCreadaEntityResult[0]
        });
    }
    catch (err) {
        res.status(500).send(err);
    }
});
exports.createTienda = createTienda;
const updateTienda = (req, res) => {
    const tienda = req.body;
    const { id } = req.params;
    tiendaServices
        .updateTienda(id, tienda)
        .then((result) => {
        const resultCasted = result;
        const numeroDeRegistrosActualizados = resultCasted[0].affectedRows;
        if (numeroDeRegistrosActualizados > 0) {
            res.status(200).json({
                message: "Tienda updated successfully",
                data: resultCasted[0]
            });
        }
        else {
            res.status(404).send("Tienda not found. Error 404");
        }
    })
        .catch((err) => {
        res.status(500).send(err);
    });
};
exports.updateTienda = updateTienda;
const deleteTienda = (req, res) => {
    const { id } = req.params;
    tiendaServices
        .deleteTienda(id)
        .then((result) => {
        const resultCasted = result;
        const numeroDeRegistrosEliminados = resultCasted[0].affectedRows;
        if (numeroDeRegistrosEliminados > 0) {
            res.status(200).json({
                message: "Tienda deleted successfully",
            });
        }
        else {
            res.status(404).send("Tienda not found. Error 404");
        }
    })
        .catch((err) => {
        res.status(500).send(err);
    });
};
exports.deleteTienda = deleteTienda;
