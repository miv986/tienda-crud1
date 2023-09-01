"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const empleado_controller_1 = require("../controllers/empleado.controller");
const empleadoRouter = (0, express_1.Router)();
// obtener todos empleados
empleadoRouter.get("/", empleado_controller_1.getEmpleados);
//obtener empleado concreto
empleadoRouter.get("/:id", empleado_controller_1.getEmpleado);
// crear empleado
empleadoRouter.post("/", empleado_controller_1.createEmpleado);
//actualizar empleado
empleadoRouter.put("/:id", empleado_controller_1.updateEmpleado);
//borrar empleado
empleadoRouter.delete("/:id", empleado_controller_1.deleteEmpleado);
exports.default = empleadoRouter;
