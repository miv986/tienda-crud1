import { Router } from "express";
import {
    getTiendas,
    getTienda,
    createTienda,
    updateTienda,
    deleteTienda
}
    from "../controllers/tienda.controller";

const tiendaRouter = Router();

// obtener todos tiendas
tiendaRouter.get("/", getTiendas);

//obtener tienda concreto
tiendaRouter.get("/:id", getTienda);
// crear tienda
tiendaRouter.post("/", createTienda);
//actualizar tienda
tiendaRouter.put("/:id", updateTienda);
//borrar tienda
tiendaRouter.delete("/:id", deleteTienda);


export default tiendaRouter; 