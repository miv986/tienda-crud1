import { Router } from "express";
import {
    getTransacciones,
    getTransaccion,
    createTransaccion,
    deleteTransaccion
}
    from "../controllers/transacciones.controller";

const transaccionesRouter = Router();

// obtener todas transacciones
transaccionesRouter.get("/", getTransacciones);

//obtener empleado concreto
transaccionesRouter.get("/:id", getTransaccion);
// crear empleado
transaccionesRouter.post("/", createTransaccion);
//actualizar empleado
//transaccionesRouter.put("/:id", updateTransaccion);
//borrar empleado
transaccionesRouter.delete("/:id", deleteTransaccion);


export default transaccionesRouter; 