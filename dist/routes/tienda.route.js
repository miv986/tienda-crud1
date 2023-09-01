"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tienda_controller_1 = require("../controllers/tienda.controller");
const tiendaRouter = (0, express_1.Router)();
// obtener todos tiendas
tiendaRouter.get("/", tienda_controller_1.getTiendas);
//obtener tienda concreto
tiendaRouter.get("/:id", tienda_controller_1.getTienda);
// crear tienda
tiendaRouter.post("/", tienda_controller_1.createTienda);
//actualizar tienda
tiendaRouter.put("/:id", tienda_controller_1.updateTienda);
//borrar tienda
tiendaRouter.delete("/:id", tienda_controller_1.deleteTienda);
exports.default = tiendaRouter;
