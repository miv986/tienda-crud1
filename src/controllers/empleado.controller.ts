import { Empleado } from "../models/empleado.model";
import { ResultSetHeader } from "../models/resultsetheader.model";
import * as empleadoServices from "../services/empleado.services";

// empleados
/**
 * @swagger
 * components:
 *  schemas:
 *    Empleado:
 *      type: object
 *      properties:
 *          nombre:
 *              type: string
 *              description: the user name
 *          apellidos:
 *              type: string
 *              description: the user apellidos
 *          edad:
 *              type: integer
 *              description: the user age
 *          sexo:
 *              type: char
 *              description: the user sex
 *          etnia:
 *              type: string
 *              description: the user etnia
 *      required:
 *          - nombre
 *          - apellidos
 *          - edad
 *          - sexo
 *          - etnia
 *      example:
 *          nombre: Alan Kay
 *          apellidos: Kay Kay
 *          edad: 70
 *          sexo: M
 *          etnia: aria
 */

//get empleados
/**
 * @swagger
 * /api/Empleado:
 *  get:
 *    summary: devuelve todos los empleados
 *    tags: [Empleado]
 *    responses:
 *      200:
 *        description: todos los empleados
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                 $ref: '#/components/schemas/Empleado'
 */
export const getEmpleados = (req, res) => {
  empleadoServices
    .getEmpleados()
    .then((result: any) => {
      const resultCasted = result as [Empleado[], any[]];
      if (resultCasted.length > 0) {
        res.status(200).json({
          message: "Empleados retrieved successfully",
          data: resultCasted[0],
        });
      } else {
        res.status(404).send("Empleados not found. Error 404");
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
//get empleado
/**
 * @swagger
 * /api/Empleado/{id}:
 *   get:
 *     summary: devuelve un empleado
 *     tags: [Empleado]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: the empleado id
 *     responses:
 *      200:
 *        description: empleado
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Empleado'
 *      404:
 *          description: user not found
 */
export const getEmpleado = (request, response) => {
  const { id } = request.params;
  empleadoServices
    .getEmpleado(id)
    .then((result: any) => {
      const resultCasted = result as [Empleado[], any[]];

      if (resultCasted[0].length > 0) {
        response.status(200).json({
          message: "Empleado retrievd successully",
          data: resultCasted[0],
        });
      } else {
        response.status(404).send("Empleado no encontrado. Error 404.");
      }
    })
    .catch((err) => {
      response.status(500).send(err);
    });
};

//create empleado
/**
 * @swagger
 * /api/Empleado:
 *  post:
 *   summary: crear nuevo empleado
 *   tags: [Empleado]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/Empleado'
 *   responses:
 *      200:
 *          description: nuevo usuario fue creado
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Empleado'
 */
export const createEmpleado = async (req, res) => {
  const empleado = req.body;
  try {
    const resultPost = (await empleadoServices.createEmpleado(empleado)) as [
      ResultSetHeader,
      undefined
    ];
    const idInsertado = resultPost[0].insertId;
    const empleadoRecientCreadoEntityResult =
      (await empleadoServices.getEmpleado(idInsertado + "")) as [
        Empleado[],
        any[]
      ];
    res.status(200).json({
      message: "Empleado creado exitosamente",
      data: empleadoRecientCreadoEntityResult[0],
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
//actualizar empleado
/**
 * @swagger
 * /api/Empleado/{id}:
 *   put:
 *    summary: actualiza un empleado
 *    tags: [Empleado]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the empleado id
 *    requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/Empleado'
 *    responses:
 *     200:
 *       description: actualiza
 *       content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Empleado'
 *     404:
 *       description: user not found
 */
export const updateEmpleado = (req, res) => {
  const empleado = req.body;
  const { id } = req.params;
  empleadoServices
    .updateEmpleado(id, empleado)
    .then((result: any) => {
      const resultCasted = result as [ResultSetHeader, undefined];
      const numeroDeRegistrosActualizados = resultCasted[0].affectedRows;
      if (numeroDeRegistrosActualizados > 0) {
        res.status(200).json({
          message: "Empleado updated successfully",
          data: resultCasted[0],
        });
      } else {
        res.status(404).send("Empleado no encontrado. Error 404.");
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
//delete empleado
/**
 * @swagger
 * /api/Empleado/{id}:
 *   delete:
 *    summary: elimina un empleado
 *    tags: [Empleado]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the empleado id
 *    responses:
 *     200:
 *       description: empleado deleted
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Empleado'
 *     404:
 *         description: user not found
 */
export const deleteEmpleado = (req, res) => {
  const { id } = req.params;
  empleadoServices
    .deleteEmpleado(id)
    .then((result: any) => {
      const resultCasted = result as [ResultSetHeader, undefined];
      const numeroDeRegistrosEliminados = resultCasted[0].affectedRows;
      if (numeroDeRegistrosEliminados > 0) {
        res.status(200).json({
          message: "Empleado deleted successfully",
        });
      } else {
        res.status(404).send("Empleado no encontrado. Error 404.");
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
