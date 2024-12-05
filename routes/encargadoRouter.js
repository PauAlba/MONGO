const express = require('express');
const router = express.Router();
const encargadoService = require('../services/encargado.service');

/**
 * @swagger
 * /encargados:
 *   get:
 *     tags:
 *       - Encargados
 *     summary: Obtiene una lista de encargados
 *     responses:
 *       200:
 *         description: Lista de los Encargados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   nombre:
 *                     type: string
 *                   estudio:
 *                     type: string
 *                   turno:
 *                     type: string
 */
router.get('/', async (req, res) => {
  try {
    const data = await encargadoService.getAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /encargados/{id}:
 *  get:
 *    tags:
 *      - Encargados
 *    summary: Obtiene un encargado por Id
 *    parameters:
 *      - in : path
 *        name: id
 *        required: true
 *        description: ID del Encargado
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Encargado encontrado
 */
router.get('/:id', async (req, res) => {
  try {
    const data = await encargadoService.getById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /encargados:
 *  post:
 *    tags:
 *      - Encargados
 *    summary: Crea un nuevo encargado
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              nombre:
 *                type: string
 *              estudio:
 *                type: string
 *              turno:
 *                type: string
 *    responses:
 *      201:
 *        description: Encargado creado
 */
router.post('/', async (req, res) => {
  try {
    const data = await encargadoService.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /encargados/{id}:
 *  patch:
 *    tags:
 *      - Encargados
 *    summary: Actualiza un encargado por su ID
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Id del encargado
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *         schema:
 *           type: object
 *           properties:
 *             nombre:
 *               type: string
 *             estudio:
 *               type: string
 *             turno:
 *               type: string
 *    responses:
 *      200:
 *        description: Encargado actualizado
 */
router.patch('/:id', async (req, res) => {
  try {
    const data = await encargadoService.update(req.params.id, req.body);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /encargados/{id}:
 *  delete:
 *    tags:
 *      - Encargados
 *    summary: Elimina un encargado por ID
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID del encargado
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Encargado eliminado
 */
router.delete('/:id', async (req, res) => {
  try {
    const data = await encargadoService.delete(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
