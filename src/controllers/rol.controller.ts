import { ResultSetHeader } from "../models/resultsetheader.model";
import { Rol } from "../models/rol.model";
import * as rolServices from "../services/rol.services";

// roles
/**
 * @swagger
 * components:
 *  schemas:
 *    Rol:
 *      type: object
 *      properties:
 *          descripcion:
 *              type: string
 *              description: the rol description
 *      required:
 *          - descripcion
 *      example:
 *          descripcion: Encargado
 */

//get roles
/**
 * @swagger
 * /api/Rol:
 *  get:
 *    summary: devuelve todos los roles
 *    tags: [Rol]
 *    responses:
 *      200:
 *        description: todos los roles
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                 $ref: '#/components/schemas/Rol'
 */
export const getRoles = (req, res) => {
  rolServices
    .getRoles()
    .then((result: any) => {
      console.log(result);
      const resultCasted = result as [Rol[], any[]];
      if (resultCasted.length > 0) {
        res.status(200).json({
          message: "Roles retrieved successfully",
          data: resultCasted[0],
        });
      } else {
        res.status(404).send("Roles not found. Error 404");
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
//get rol
/**
 * @swagger
 * /api/Rol/{id}:
 *   get:
 *     summary: devuelve un rol
 *     tags: [Rol]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: the rol id
 *     responses:
 *      200:
 *        description: rol
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Rol'
 *      404:
 *          description: rol not found
 */
export const getRol = (req, res) => {
  const { id } = req.params;
  rolServices
    .getRol(id)
    .then((result: any) => {
      console.log(result.length);
      const resultCasted = result as [Rol[], any[]];
      if (resultCasted[0].length > 0) {
        res.status(200).json({
          message: "Rol retrievd successully",
          data: resultCasted[0],
        });
      } else {
        res.status(404).send("Rol not found. Error 404");
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

//create rol
/**
 * @swagger
 * /api/Rol:
 *  post:
 *   summary: crear nuevo rol
 *   tags: [Rol]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/Rol'
 *   responses:
 *      200:
 *          description: nuevo rol fue creado
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Rol'
 */
export const createRol = async (req, res) => {
  const rol = req.body;
  try {
    const resultPost = (await rolServices.createRol(rol)) as [
      ResultSetHeader,
      undefined
    ];
    const insertId = resultPost[0].insertId;
    const rolRecientCreadoEntityResult = (await rolServices.getRol(
      insertId + ""
    )) as [Rol[], any[]];
    res.status(200).json({
      message: "Rol created successfully",
      data: rolRecientCreadoEntityResult[0],
    });
  } catch (err) {
    res.status(500).send(err);
  }
};
//actualizar rol
/**
 * @swagger
 * /api/Rol/{id}:
 *   put:
 *    summary: actualiza un rol
 *    tags: [Rol]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the rol id
 *    requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/Rol'
 *    responses:
 *     200:
 *       description: actualiza rol por id
 *       content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Rol'
 *     404:
 *       description: rol not found
 
 */
export const updateRol = (req, res) => {
  const rol = req.body;
  const { id } = req.params;
  rolServices
    .updateRol(id, rol)
    .then((result: any) => {
      const resultCasted = result as [ResultSetHeader, undefined];
      const numeroDeRegistrosActualizados = resultCasted[0].affectedRows;
      if (numeroDeRegistrosActualizados > 0) {
        res.status(200).json({
          message: "Rol updated successfully",
          data: resultCasted[0],
        });
      } else {
        res.status(404).send("Rol not found. Error 404");
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
//delete rol
/**
 * @swagger
 * /api/Rol/{id}:
 *   delete:
 *    summary: elimina un rol
 *    tags: [Rol]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the rol id
 *    responses:
 *     200:
 *       description: rol deleted
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Rol'
 *     404:
 *         description: rol not found
 */
export const deleteRol = (req, res) => {
  const { id } = req.params;
  rolServices
    .deleteRol(id)
    .then((result) => {
      const resultCasted = result as [ResultSetHeader, undefined];
      const numeroDeRegistrosEliminados = resultCasted[0].affectedRows;
      if (numeroDeRegistrosEliminados > 0) {
        res.status(200).json({
          message: "Rol deleted successfully",
        });
      } else {
        res.status(404).send("Rol not found. Error 404");
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
