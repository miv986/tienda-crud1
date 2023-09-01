import { Router } from "express";
import {
    getRoles,
    getRol,
    createRol,
    updateRol,
    deleteRol
}
    from "../controllers/rol.controller";

const rolRouter = Router();

// obtener todos roles
rolRouter.get("/", getRoles);

//obtener rol concreto
rolRouter.get("/:id", getRol);
// crear rol
rolRouter.post("/", createRol);
//actualizar rol
rolRouter.put("/:id", updateRol);
//borrar rol
rolRouter.delete("/:id", deleteRol);


export default rolRouter; 