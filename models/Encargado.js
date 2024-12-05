const mongoose = require('mongoose')

const EncargadoSchema = mongoose.Schema({
  nombre:{
    type: String,
    require: true
  },
  estudio:{
    type: String,
    require: true
  },
  turno:{
    type: String,
    require: true
  }
})

module.exports = mongoose.model('encargado', EncargadoSchema)
