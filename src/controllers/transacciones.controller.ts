import { ResultSetHeader } from "../models/resultsetheader.model";
import { Transacciones } from "../models/transacciones.model";
import * as transaccionesRouter from "../services/transacciones.services";
import * as transaccionesServices from "../services/transacciones.services";
import * as productoServices from "../services/producto.services";
import { Producto } from "../models/producto.model";
// transacciones
/**
 * @swagger
 * components:
 *  schemas:
 *    Transacciones:
 *      type: object
 *      properties:
 *          tienda_id:
 *              type: integer
 *              description: the tienda id
 *          producto_id:
 *              type: integer
 *              description: the product id
 *          cantidad_producto:
 *              type: integer
 *              description: the product quantity
 *      required:
 *          - tienda_id
 *          - producto_id
 *          - cantidad_producto
 *      example:
 *          tienda_id: 1
 *          producto_id: 3
 *          cantidad_producto: 70
 */

//get transacciones
/**
 * @swagger
 * /api/Transacciones:
 *   get:
 *     summary: devuelve todas las transacciones
 *     tags: [Transacciones]
 *     responses:
 *       200:
 *         description: todas las transacciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transacciones'
 */

export const getTransacciones = (req, res) => {
  transaccionesRouter
    .getTransacciones()
    .then((result: any) => {
      const resultCasted = result as [Transacciones[], any[]];
      if (resultCasted.length > 0) {
        res.status(200).json({
          message: "Transacciones retrieved successfully",
          data: resultCasted[0],
        });
      } else {
        res.status(404).send("Transacciones not found. Error 404");
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
//get transaccion
/**
 * @swagger
 * /api/Transacciones{id}:
 *   get:
 *     summary: devuelve transaccion
 *     tags: [Transacciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: the transaccion id
 *     responses:
 *       200:
 *         description: transaccion por id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transacciones'
 *       404:
 *         description: transaccion not found
 */

export const getTransaccion = (req, res) => {
  const { id } = req.params;
  transaccionesRouter
    .getTransaccion(id)
    .then((result: any) => {
      const resultCasted = result as [Transacciones[], any[]];
      if (resultCasted[0].length > 0) {
        res.status(200).json({
          message: "Transaccion retrievd successully",
          data: resultCasted[0],
        });
      } else {
        res.status(404).send("Transaccion not found. Error 404");
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
//create transaccion
/**
 * @swagger
 * /api/Transacciones:
 *  post:
 *   summary: crear nueva transaccion
 *   tags: [Transacciones]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/Transacciones'
 *   responses:
 *      200:
 *          description: nueva transaccion fue creada
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Transacciones'
 */
export const createTransaccion = async (req, res) => {
  const transaccion = req.body as Transacciones;
  const cantidadDeseada = transaccion.cantidad_producto;
  //Intencion comprobar que la cantidad existe en la tabla producto antes de realizar la transaccion
  //1.Obtener producto utilizando la propiedad producto_id de la transaccion entrante
  //2.Comprobar si la cantidad del producto encontrado es suficente para realizar la tx en caso opuesto tirar error "revisar tabla de errores http"
  //3.Si hay cantidad deseada se debe actualizar el producto reduciendo su cantidad (cantidad actual de producto - cantidad deseada tx)
  //4.Realizar tx
  try {
    const producto = await productoServices.getProducto(
      transaccion.producto_id + ""
    );
    const productoCasteado = producto as [Producto[], []];
    const productoSingular = productoCasteado[0][0];

    if (productoSingular.cantidad >= cantidadDeseada) {
      const productoActualizado = {
        ...productoSingular,
        cantidad: productoSingular.cantidad - cantidadDeseada,
      };

      await productoServices.updateProducto(
        productoSingular.id + "",
        productoActualizado
      );
      const resultPost = (await transaccionesServices.createTransaccion(
        transaccion
      )) as [ResultSetHeader, undefined];
      const idInsertado = resultPost[0].insertId;
      const transaccionRecientCreadaEntityResult =
        (await transaccionesServices.getTransaccion(idInsertado + "")) as [
          Transacciones[],
          any[]
        ];

      res.status(200).json({
        message: "Transaccion created successfully",
        data: transaccionRecientCreadaEntityResult[0],
      });
    } else {
      res.status(400).json({
        message: "Cantidad insuficiente producto",
      });
    }
  } catch (err) {
    return res.status(500).send(err);
  } 
};

//delete transaccion
/**
 * @swagger
 * /api/Transacciones/{id}:
 *   delete:
 *    summary: elimina una transaccion
 *    tags: [Transacciones]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the transaccion id
 *    responses:
 *     200:
 *       description: transaccion deleted
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Transacciones'
 *     404:
 *         description: transacciones not found
 */
export const deleteTransaccion = (req, res) => {
  const { id } = req.params;
  transaccionesRouter
    .deleteTransaccion(id)
    .then((result: any) => {
      const resultCasted = result as [ResultSetHeader, undefined];
      const numeroDeRegistrosEliminados = resultCasted[0].affectedRows;
      if (numeroDeRegistrosEliminados > 0) {
        res.status(200).json({
          message: "Transaccion deleted successfully",
        });
      } else {
        res.status(404).send("Transaccion not found. Error 404");
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
