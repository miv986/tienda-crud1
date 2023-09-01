"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const producto_controller_1 = require("../controllers/producto.controller");
const productoRouter = (0, express_1.Router)();
// obtener todos productos
productoRouter.get("/", producto_controller_1.getProductos);
//obtener producto concreto
productoRouter.get("/:id", producto_controller_1.getProducto);
// crear producto
productoRouter.post("/", producto_controller_1.createProducto);
//actualizar producto
productoRouter.put("/:id", producto_controller_1.updateProducto);
//borrar producto
productoRouter.delete("/:id", producto_controller_1.deleteProducto);
exports.default = productoRouter;
