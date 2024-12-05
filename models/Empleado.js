const mongoose = require('mongoose')

const EmpleadoSchema = mongoose.Schema({
  nombre:{
    type: String,
    require: true
  },
  apellido:{
    type: String,
    require: true
  },
  edad:{
    type: Number,
    require: true
  },
  genero:{
    type: String,
    require: true
  },
  departamento1:{
    type: String,
    require: true
  },
  departamento2:{
    type: String,
    require: true
  },
  departamento3:{
    type: String,
    require: true
  }
})

module.exports = mongoose.model('empleado', EmpleadoSchema)
