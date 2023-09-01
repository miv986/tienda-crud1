"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rol_controller_1 = require("../controllers/rol.controller");
const rolRouter = (0, express_1.Router)();
// obtener todos roles
rolRouter.get("/", rol_controller_1.getRoles);
//obtener rol concreto
rolRouter.get("/:id", rol_controller_1.getRol);
// crear rol
rolRouter.post("/", rol_controller_1.createRol);
//actualizar rol
rolRouter.put("/:id", rol_controller_1.updateRol);
//borrar rol
rolRouter.delete("/:id", rol_controller_1.deleteRol);
exports.default = rolRouter;
