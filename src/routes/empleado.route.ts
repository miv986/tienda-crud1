import { Router } from "express";
import {
    getEmpleados,
    getEmpleado,
    createEmpleado,
    updateEmpleado,
    deleteEmpleado
}
    from "../controllers/empleado.controller";

const empleadoRouter = Router();



// obtener todos empleados
empleadoRouter.get("/", getEmpleados);

//obtener empleado concreto
empleadoRouter.get("/:id", getEmpleado);
// crear empleado
empleadoRouter.post("/", createEmpleado);
//actualizar empleado
empleadoRouter.put("/:id", updateEmpleado);
//borrar empleado
empleadoRouter.delete("/:id", deleteEmpleado);


export default empleadoRouter; 