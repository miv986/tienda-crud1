"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const empleado_route_1 = __importDefault(require("./empleado.route"));
const producto_route_1 = __importDefault(require("./producto.route"));
const rol_route_1 = __importDefault(require("./rol.route"));
const tienda_route_1 = __importDefault(require("./tienda.route"));
const transacciones_route_1 = __importDefault(require("./transacciones.route"));
const indexRouter = (0, express_1.Router)();
const prefix = "/api";
indexRouter.get(prefix, (req, res) => {
    res.send("Welcome to PlanetScale API2");
});
indexRouter.use(`${prefix}/empleado`, empleado_route_1.default);
indexRouter.use(`${prefix}/producto`, producto_route_1.default);
indexRouter.use(`${prefix}/rol`, rol_route_1.default);
indexRouter.use(`${prefix}/tienda`, tienda_route_1.default);
indexRouter.use(`${prefix}/transacciones`, transacciones_route_1.default);
exports.default = indexRouter;
