const mongoose = require('mongoose')

const DepartamentoSchema = mongoose.Schema({
  nombre:{
    type: String,
    require: true
  },
  encargado:{
    type: mongoose.Schema.Types.ObjectId,
    require: true
  },
  area:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Area',
    require: true
  }
})

module.exports = mongoose.model('departamento', DepartamentoSchema)
