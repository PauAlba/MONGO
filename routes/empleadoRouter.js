const express = require('express');
const router = express.Router();
const empleadoService = require('../services/empleado.service');

/**
 * @swagger
 * /empleados:
 *   get:
 *     tags:
 *       - Empleados
 *     summary: Obtiene una lista de empleados
 *     responses:
 *       200:
 *         description: Lista de empleados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   nombre:
 *                     type: string
 *                   apellido:
 *                     type: string
 *                   edad:
 *                     type: number
 *                   genero:
 *                     type: string
 *                   departamento1:
 *                     type: string
 *                   departamento2:
 *                     type: string
 *                   departamento3:
 *                     type: string
 */
router.get('/', async (req, res) => {
  try {
    const data = await empleadoService.getAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /empleados/{id}:
 *   get:
 *     tags:
 *       - Empleados
 *     summary: Obtiene un empleado por Id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del Empleado
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Empleado encontrado
 */
router.get('/:id', async (req, res) => {
  try {
    const data = await empleadoService.getById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /empleados:
 *   post:
 *     tags:
 *       - Empleados
 *     summary: Crea un nuevo empleado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               apellido:
 *                 type: string
 *               edad:
 *                 type: number
 *               genero:
 *                 type: string
 *               departamento1:
 *                 type: string
 *               departamento2:
 *                 type: string
 *               departamento3:
 *                 type: string
 *     responses:
 *       201:
 *         description: Empleado creado
 */
router.post('/', async (req, res) => {
  try {
    const data = await empleadoService.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /empleados/{id}:
 *   patch:
 *     tags:
 *       - Empleados
 *     summary: Actualiza un empleado por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Id del empleado
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               apellido:
 *                 type: string
 *               edad:
 *                 type: number
 *               genero:
 *                 type: string
 *               departamento1:
 *                 type: string
 *               departamento2:
 *                 type: string
 *               departamento3:
 *                 type: string
 *     responses:
 *       200:
 *         description: Empleado actualizado
 */
router.patch('/:id', async (req, res) => {
  try {
    const data = await empleadoService.update(req.params.id, req.body);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /empleados/{id}:
 *   delete:
 *     tags:
 *       - Empleados
 *     summary: Elimina un empleado por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del empleado
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Empleado eliminado
 */
router.delete('/:id', async (req, res) => {
  try {
    const data = await empleadoService.delete(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
