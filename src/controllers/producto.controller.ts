import { Producto } from "../models/producto.model";
import { ResultSetHeader } from "../models/resultsetheader.model";
import * as productoServices from "../services/producto.services";


//productos
/**
 * @swagger
 * components:
 *  schemas:
 *    Producto:
 *      type: object      
 *      properties:
 *          descripcion:
 *              type: string
 *              description: the product name
 *          precio:
 *              type: double
 *              description: the product price
 *          cantidad:    
 *              type: integer
 *              description: the product quantity
 *      required:
 *          - descripcion
 *          - precio
 *          - cantidad
 *      example:
 *          descripcion: Agua Bronchales
 *          precio: 2'60
 *          cantidad: 70
 */

//get productos
/**
 * @swagger
 * /api/Producto:
 *  get:
 *   summary: devuelve todos los productos
 *   tags: [Producto]
 *   responses:
 *      200:
 *        description: todos los productos
 *        content:        
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Producto'
 */
export const getProductos = (req, res) => {
    productoServices
        .getProductos()
        .then((result: any) => {
            const resultCasted = result as [Producto[], any[]]
            if (resultCasted.length > 0) {
                res.status(200).json({
                    message: "Productos retrieved successfully",
                    data: resultCasted[0]
                })
            } else {

                res.status(404).send("Productos no encontrados. Error 404");
            }
        })
        .catch((err) => {
            res.status(500).send(err);
        })
};

//get producto
/**
 * @swagger
 * /api/Producto/{id}:
 *   get:
 *     summary: devuelve un producto
 *     tags: [Producto]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: the product id
 *     responses:
 *      200:
 *        description: producto
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Producto'
 *      404:
 *          description: product not found
 */


export const getProducto = (req, res) => {
    const { id } = req.params;
    productoServices
        .getProducto(id)
        .then((result: any) => {
            const resultCasted = result as [Producto[], any[]]
            if (resultCasted[0].length > 0) {
                res.status(200).json({
                    message: "Producto retrievd successully",
                    data: resultCasted[0]
                })
            } else {
                res.status(404).send("Producto no encontrado. Error 404")
            }
        })
        .catch((err) => {
            res.status(500).send(err);
        })

};

//create producto
/**
 * @swagger
 * /api/Producto:
 *  post:
 *   summary: crear nuevo producto
 *   tags: [Producto]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/Producto'
 *   responses:
 *      200:
 *          description: nuevo producto fue creado
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Producto'
 */
export const createProducto = async (req, res) => {
    const producto = req.body;
    try {
        const resultPost = await productoServices.createProducto(producto) as [ResultSetHeader, undefined]
        const idInsertado = resultPost[0].insertId;
        const productoRecientCreadoEntityResult = await productoServices.getProducto(idInsertado + '') as [Producto[], any[]]
        res.status(200).json({
            message: "Producto creado exitosamente",
            data: productoRecientCreadoEntityResult[0]
        })
    } catch (err) {
        res.status(500).send(err);
    }
};
//actualizar producto
/**
 * @swagger
 * /api/Producto/{id}:
 *   put:
 *    summary: actualiza un producto
 *    tags: [Producto]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the product id
 *    requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/Producto'
 *    responses:
 *     200:
 *       description: actualiza
 *       content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Producto'
 *     404:
 *       description: product not found
 
 */
export const updateProducto = (req, res) => {
    const producto = req.body;
    const { id } = req.params;
    productoServices
        .updateProducto(id, producto)
        .then((result) => {
            const resultCasted = result as [ResultSetHeader, undefined]
            const numerodeRegistrosActualizados = resultCasted[0].affectedRows;
            if (numerodeRegistrosActualizados > 0) {
                res.status(200).json({
                    message: "Producto updated successfully",
                    data: resultCasted[0],
                });
            } else {
                res.status(404).send("Producto no encontrado. Error 404")
            }
        })

        .catch((err) => {
            res.status(500).send(err);
        });


};
//delete producto
/**
 * @swagger
 * /api/Producto/{id}:
 *   delete:
 *    summary: elimina un producto
 *    tags: [Producto]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the product id
 *    responses:
 *     200:
 *       description: producto deleted
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Producto'
 *     404:
 *         description: user not found
 */
export const deleteProducto = (req, res) => {
    const { id } = req.params;
    productoServices
        .deleteProducto(id)
        .then((result: any) => {
            const resultCasted = result as [ResultSetHeader, undefined]
            const numeroDeRegistrosEliminados = resultCasted[0].affectedRows;
            if (numeroDeRegistrosEliminados > 0) {
                res.status(200).json({
                    message: "Producto deleted successfully",
                });
            } else {
                res.status(404).send("Empleado not found. Error 404")
            }
        })
        .catch((err) => {
            res.status(500).send(err);
        });
};