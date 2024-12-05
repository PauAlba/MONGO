const express = require('express');
const AreaService = require('../services/area.service');

const router = express.Router();
const service = new AreaService();

/**
 * @swagger
 * /areas:
 *   get:
 *     tags:
 *       - Areas
 *     summary: Obtiene una lista de áreas
 *     responses:
 *       200:
 *         description: Lista de áreas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   nombre:
 *                     type: string
 *                   edificio:
 *                     type: string
 */
router.get('/', async (req, res) => {
  try {
    const areas = await service.getAll();
    res.status(200).json(areas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /areas/{id}:
 *   get:
 *     tags:
 *       - Areas
 *     summary: Obtiene un área por Id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del área
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Área encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 nombre:
 *                   type: string
 *                 edificio:
 *                   type: string
 */
router.get('/:id', async (req, res) => {
  try {
    const area = await service.getById(req.params.id);
    if (!area) {
      return res.status(404).json({ message: 'Área no encontrada' });
    }
    res.status(200).json(area);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /areas:
 *   post:
 *     tags:
 *       - Areas
 *     summary: Crea un nueva área
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               edificio:
 *                 type: string
 *     responses:
 *       201:
 *         description: Área creada
 */
router.post('/', async (req, res) => {
  try {
    const newArea = await service.create(req.body);
    res.status(201).json(newArea);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /areas/{id}:
 *   patch:
 *     tags:
 *       - Areas
 *     summary: Actualiza una área por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Id del área
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
 *               edificio:
 *                 type: string
 *     responses:
 *       200:
 *         description: Área actualizada
 */
router.patch('/:id', async (req, res) => {
  try {
    const updatedArea = await service.update(req.params.id, req.body);
    if (!updatedArea) {
      return res.status(404).json({ message: 'Área no encontrada' });
    }
    res.status(200).json(updatedArea);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /areas/{id}:
 *   delete:
 *     tags:
 *       - Areas
 *     summary: Elimina una área por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del área
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Área eliminada
 */
router.delete('/:id', async (req, res) => {
  try {
    const deletedArea = await service.delete(req.params.id);
    if (!deletedArea) {
      return res.status(404).json({ message: 'Área no encontrada' });
    }
    res.status(200).json({ message: 'Área eliminada' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
