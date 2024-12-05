const express = require('express');
const router = express.Router();
const departamentoService = require('../services/departamento.service');

/**
 * @swagger
 * /departamentos:
 *   get:
 *     tags:
 *       - Departamentos
 *     summary: Obtiene una lista de departamentos
 *     responses:
 *       200:
 *         description: Lista de departamentos
 */
router.get('/', async (req, res) => {
  try {
    const departamentos = await departamentoService.findAll();
    res.json(departamentos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /departamentos/{id}:
 *   get:
 *     tags:
 *       - Departamentos
 *     summary: Obtiene un departamento por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Departamento encontrado
 */
router.get('/:id', async (req, res) => {
  try {
    const departamento = await departamentoService.findById(req.params.id);
    if (!departamento) {
      return res.status(404).json({ message: 'Departamento no encontrado' });
    }
    res.json(departamento);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /departamentos:
 *   post:
 *     tags:
 *       - Departamentos
 *     summary: Crea un nuevo departamento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               encargado:
 *                 type: string
 *               area:
 *                  type: string
 *     responses:
 *       201:
 *         description: Departamento creado
 */
router.post('/', async (req, res) => {
  try {
    const nuevoDepartamento = await departamentoService.create(req.body);
    res.status(201).json(nuevoDepartamento);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /departamentos/{id}:
 *   patch:
 *     tags:
 *       - Departamentos
 *     summary: Actualiza un departamento por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
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
 *               encargado:
 *                 type: string
 *               area:
 *                 type: string
 *     responses:
 *       200:
 *         description: Departamento actualizado
 */
router.patch('/:id', async (req, res) => {
  try {
    const result = await departamentoService.update(req.params.id, req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /departamentos/{id}:
 *   delete:
 *     tags:
 *       - Departamentos
 *     summary: Elimina un departamento por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Departamento eliminado
 */
router.delete('/:id', async (req, res) => {
  try {
    await departamentoService.delete(req.params.id);
    res.json({ message: 'Departamento eliminado' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
