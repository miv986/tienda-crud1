import { Router } from "express";
import {
    getProductos,
    getProducto,
    createProducto,
    updateProducto,
    deleteProducto
}
    from "../controllers/producto.controller";

const productoRouter = Router();

// obtener todos productos
productoRouter.get("/", getProductos);

//obtener producto concreto
productoRouter.get("/:id", getProducto);
// crear producto
productoRouter.post("/", createProducto);
//actualizar producto
productoRouter.put("/:id", updateProducto);
//borrar producto
productoRouter.delete("/:id", deleteProducto);


export default productoRouter; 