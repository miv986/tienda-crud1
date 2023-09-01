import { Router } from "express";
import empleadoRouter from "./empleado.route";
import productoRouter from "./producto.route";
import rolRouter from "./rol.route";
import tiendaRouter from "./tienda.route";
import transaccionesRouter from "./transacciones.route";

const indexRouter = Router();

const prefix = "/api";

indexRouter.get(prefix, (req, res) => {
    res.send("Welcome to PlanetScale API2");
});

indexRouter.use(`${prefix}/empleado`, empleadoRouter);
indexRouter.use(`${prefix}/producto`, productoRouter);
indexRouter.use(`${prefix}/rol`, rolRouter);
indexRouter.use(`${prefix}/tienda`, tiendaRouter);
indexRouter.use(`${prefix}/transacciones`, transaccionesRouter);
export default indexRouter;