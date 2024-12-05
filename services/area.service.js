const Area = require('../models/Area');
const Departamento = require('../models/Departamento');

class AreaService {
  async create(data) {
    const newArea = new Area(data);
    return await newArea.save();
  }

  async getAll() {
    return await Area.find();
  }

  async getById(id) {
    return await Area.findById(id);
  }

  async update(id, changes) {
    return await Area.findByIdAndUpdate(id, changes, { new: true });
  }

  async replace(id, data) {
    return await Area.findOneAndReplace({ _id: id }, data, { new: true });
  }

  async delete(id) {
    const departamento = await Departamento.findOne({ area: id });
  
    if (departamento) {
      throw new Error('Área en uso en algún departamento');
    }
  
    try {
      return await Area.findByIdAndDelete(id);
    } catch (e) {
      throw new Error('Error al eliminar el área: ' + e);
    }
  }
  
}

module.exports = AreaService;
