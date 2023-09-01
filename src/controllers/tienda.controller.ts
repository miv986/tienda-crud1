import { ResultSetHeader } from "../models/resultsetheader.model";
import { Tienda } from "../models/tienda.model";
import * as tiendaServices from "../services/tienda.services";
//tiendas
/**
 * @swagger
 * components:
 *  schemas:
 *      Tienda:
 *          type: object
 *          properties:
 *               direccion:
 *                  type: string
 *                  description: the tienda direction
 *               ciudad:
 *                  type: string
 *                  description: the tienda city
 *               codigo_postal:
 *                  type: integer
 *                  description: the city postal code
 *               pais:
 *                  type: string
 *                  description: the city country
 *          required:
 *              - direccion
 *              - ciudad
 *              - codigo_postal
 *              - pais
 *          example:
 *              direccion: Avenida de los Países
 *              ciudad: Toronto
 *              codigo_postal: 22112
 *              pais: America
 */

//get tiendas
/**
 * @swagger
 * /api/Tienda:
 *  get:
 *    summary: devuelve todas las tiendas
 *    tags: [Tienda]
 *    responses:
 *      200:
 *        description: todas las tiendas
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                 $ref: '#/components/schemas/Tienda'
 */
export const getTiendas = (req, res) => {
  tiendaServices
    .getTiendas()
    .then((result: any) => {
      const resultCasted = result as [Tienda[], any[]];
      if (resultCasted.length > 0) {
        res.status(200).json({
          message: "Tiendas retrieved successfully",
          data: resultCasted[0],
        });
      } else {
        res.status(404).send("Tiendas not found. Error 404");
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
//get tienda
/**
 * @swagger
 * /api/Tienda/{id}:
 *   get:
 *     summary: devuelve una tienda
 *     tags: [Tienda]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: the tienda id
 *     responses:
 *      200:
 *        description: tienda
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Tienda'
 *      404:
 *          description: user not found
 */
export const getTienda = (req, res) => {
  const { id } = req.params;
  tiendaServices
    .getTienda(id)
    .then((result: any) => {
      const resultCasted = result as [Tienda[], any[]];
      if (resultCasted[0].length > 0) {
        res.status(200).json({
          message: "Tienda retrievd successully",
          data: resultCasted[0],
        });
      } else {
        res.status(404).send("Tienda not found. Error 404");
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
//create tienda
/**
 * @swagger
 * /api/Tienda:
 *  post:
 *   summary: crear nueva tienda
 *   tags: [Tienda]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/Tienda'
 *   responses:
 *      200:
 *          description: nueva tienda fue creada
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Tienda'
 */
export const createTienda = async (req, res) => {
  const tienda = req.body;
  try {
    const resultPost = (await tiendaServices.createTienda(tienda)) as [
      ResultSetHeader,
      undefined
    ];
    const idInsertado = resultPost[0].insertId;
    const tiendaRecientCreadaEntityResult = (await tiendaServices.getTienda(
      idInsertado + ""
    )) as [Tienda[], any[]];
    res.status(200).json({
      message: "Tienda created successfully",
      data: tiendaRecientCreadaEntityResult[0],
    });
  } catch (err) {
    res.status(500).send(err);
  }
};
//actualizar tienda
/**
 * @swagger
 * /api/Tienda/{id}:
 *   put:
 *    summary: actualiza una tienda
 *    tags: [Tienda]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the tienda id
 *    requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/Tienda'
 *    responses:
 *     200:
 *       description: actualiza
 *       content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Tienda'
 *     404:
 *       description: tienda not found
 
 */
export const updateTienda = (req, res) => {
  const tienda = req.body;
  const { id } = req.params;
  tiendaServices
    .updateTienda(id, tienda)
    .then((result: any) => {
      const resultCasted = result as [ResultSetHeader, undefined];
      const numeroDeRegistrosActualizados = resultCasted[0].affectedRows;
      if (numeroDeRegistrosActualizados > 0) {
        res.status(200).json({
          message: "Tienda updated successfully",
          data: resultCasted[0],
        });
      } else {
        res.status(404).send("Tienda not found. Error 404");
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
//delete tienda
/**
 * @swagger
 * /api/Tienda/{id}:
 *   delete:
 *    summary: elimina una tienda
 *    tags: [Tienda]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the tienda id
 *    responses:
 *     200:
 *       description: tienda deleted
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Tienda'
 *     404:
 *         description: tienda not found
 */
export const deleteTienda = (req, res) => {
  const { id } = req.params;
  tiendaServices
    .deleteTienda(id)
    .then((result: any) => {
      const resultCasted = result as [ResultSetHeader, undefined];
      const numeroDeRegistrosEliminados = resultCasted[0].affectedRows;
      if (numeroDeRegistrosEliminados > 0) {
        res.status(200).json({
          message: "Tienda deleted successfully",
        });
      } else {
        res.status(404).send("Tienda not found. Error 404");
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
