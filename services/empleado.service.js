const Empleado = require('../models/Empleado');
const Departamento = require('../models/Departamento');

class EmpleadoService {
  async getAll() {
    try {
      return await Empleado.find();
    } catch (error) {
      throw new Error("Error al obtener los empleados: " + error);
    }
  }

  async getById(id) {
    try {
      return await Empleado.findById(id);
    } catch (error) {
      throw new Error("Error al obtener el empleado: " + error);
    }
  }

  async create(data) {
    try {
      const departamento1 = await Departamento.findOne({ nombre: data.departamento1 });
      const departamento2 = await Departamento.findOne({ nombre: data.departamento2 });
      const departamento3 = await Departamento.findOne({ nombre: data.departamento3 });

      if (!departamento1 || !departamento2 || !departamento3) {
        throw new Error('Departamento no válido');
      }

      const empleado = new Empleado({
        nombre: data.nombre,
        apellido: data.apellido,
        edad: data.edad,
        genero: data.genero,
        departamento1: departamento1._id,
        departamento2: departamento2._id,
        departamento3: departamento3._id
      });

      return await empleado.save();
    } catch (error) {
      throw new Error("Error al crear el empleado: " + error);
    }
  }

  async update(id, data) {
    try {
      const departamento1 = await Departamento.findOne({ _id: data.departamento1 });
      const departamento2 = await Departamento.findOne({ _id: data.departamento2 });
      const departamento3 = await Departamento.findOne({ _id: data.departamento3 });

      if (!departamento1 || !departamento2 || !departamento3) {
        throw new Error('Departamento no válido');
      }

      return await Empleado.updateOne(
        { _id: id },
        {
          $set: {
            nombre: data.nombre,
            apellido: data.apellido,
            edad: data.edad,
            genero: data.genero,
            departamento1: departamento1._id,
            departamento2: departamento2._id,
            departamento3: departamento3._id
          }
        }
      );
    } catch (error) {
      throw new Error("Error al actualizar el empleado: " + error);
    }
  }

  async delete(id) {
    try {
      return await Empleado.deleteOne({ _id: id });
    } catch (error) {
      throw new Error("Error al eliminar el empleado: " + error);
    }
  }
}

module.exports = new EmpleadoService();
