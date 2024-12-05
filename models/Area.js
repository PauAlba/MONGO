const mongoose = require('mongoose')

const AreaSchema = mongoose.Schema({
  nombre:{
    type: String,
    require: true
  },
  edificio:{
    type: String,
    require: true
  }
})

module.exports = mongoose.model('area', AreaSchema)
