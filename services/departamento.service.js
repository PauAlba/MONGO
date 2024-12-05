const Departamento = require('../models/Departamento');
const Area = require('../models/Area');
const Encargado = require('../models/Encargado');
const Empleado = require('../models/Empleado');

class DepartamentoService {
    async findAll() {
        return await Departamento.find();
    }

    async findById(id) {
        return await Departamento.findById(id);
    }

    async create(data) {
        const area = await Area.findOne({ nombre: data.area });
        const encargado = await Encargado.findOne({ nombre: data.encargado });
        console.log("Área encontrada:", area);
        console.log("Encargado encontrado:", encargado);

        if (!area || !encargado) {
            throw new Error('Área o Encargado no válido');
        }

        const departamento = new Departamento({
            nombre: data.nombre,
            encargado: encargado._id,
            area: area._id,
        });

        return await departamento.save();
    }

    // async update(id, data) {
    //     const area = await Area.findById(data.area);
    //     const encargado = await Encargado.findById(data.encargado);

    //     if (!area || !encargado) {
    //         throw new Error('Área o Encargado no válido');
    //     }

    //     return await Departamento.updateOne(
    //         { _id: id },
    //         {
    //             $set: {
    //                 nombre: data.nombre,
    //                 encargado: encargado._id,
    //                 area: area._id,
    //             },
    //         }
    //     );
    // }
    async update(id, data) {
        try {
          const updateData = {};
      
          // Validar y agregar los campos que están presentes en el body
          if (data.nombre) {
            updateData.nombre = data.nombre;
          }
      
          if (data.area) {
            const area = await Area.findById(data.area);
            if (!area) {
              throw new Error('Área no válida');
            }
            updateData.area = area._id;
          }
      
          if (data.encargado) {
            const encargado = await Encargado.findById(data.encargado);
            if (!encargado) {
              throw new Error('Encargado no válido');
            }
            updateData.encargado = encargado._id;
          }
      
          // Realizar la actualización
          const result = await Departamento.updateOne({ _id: id }, { $set: updateData });
      
          return result;
        } catch (error) {
          throw new Error('Error al actualizar el departamento: ' + error.message);
        }
      }
      

    async delete(id) {
        const departamentoEnUso =
            (await Empleado.findOne({ departamento1: id })) ||
            (await Empleado.findOne({ departamento2: id })) ||
            (await Empleado.findOne({ departamento3: id }));

        if (departamentoEnUso) {
            throw new Error('Departamento en uso');
        }

        return await Departamento.deleteOne({ _id: id });
    }
}

module.exports = new DepartamentoService();
