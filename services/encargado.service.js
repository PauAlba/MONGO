const Encargado = require('../models/Encargado');
const Departamento = require('../models/Departamento');

class EncargadoService {
  async getAll() {
    try {
      return await Encargado.find();
    } catch (e) {
      throw new Error('Error al obtener los encargados: ' + e);
    }
  }

  async getById(id) {
    try {
      return await Encargado.findById(id);
    } catch (e) {
      throw new Error('Error al obtener el encargado: ' + e);
    }
  }

  async create(data) {
    const encargado = new Encargado({
      nombre: data.nombre,
      estudio: data.estudio,
      turno: data.turno,
    });

    try {
      return await encargado.save();
    } catch (e) {
      throw new Error('Error al crear el encargado: ' + e);
    }
  }

  async update(id, data) {
    try {
      return await Encargado.updateOne(
        { _id: id },
        {
          $set: {
            nombre: data.nombre,
            estudio: data.estudio,
            turno: data.turno,
          },
        }
      );
    } catch (e) {
      throw new Error('Error al actualizar el encargado: ' + e);
    }
  }

  async delete(id) {
    const departamento = await Departamento.findOne({ encargado: id });

    if (departamento) {
      throw new Error('Encargado en uso');
    }

    try {
      return await Encargado.deleteOne({ _id: id });
    } catch (e) {
      throw new Error('Error al eliminar el encargado: ' + e);
    }
  }
}

module.exports = new EncargadoService();
