"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transacciones_controller_1 = require("../controllers/transacciones.controller");
const transaccionesRouter = (0, express_1.Router)();
// obtener todas transacciones
transaccionesRouter.get("/", transacciones_controller_1.getTransacciones);
//obtener empleado concreto
transaccionesRouter.get("/:id", transacciones_controller_1.getTransaccion);
// crear empleado
transaccionesRouter.post("/", transacciones_controller_1.createTransaccion);
//actualizar empleado
transaccionesRouter.put("/:id", transacciones_controller_1.updateTransaccion);
//borrar empleado
transaccionesRouter.delete("/:id", transacciones_controller_1.deleteTransaccion);
exports.default = transaccionesRouter;
