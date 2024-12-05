const empleadoRouter = require('./empleadoRouter')
const departamentoRouter = require('./departamentoRouter')
const encargadoRouter = require('./encargadoRouter')
const areaRouter = require('./areaRouter')
const express = require("express")

function routerApi(app){
  const router = express.Router();
  app.use('/api/v1', router);
  app.use('/api/v1/empleados', empleadoRouter);
  app.use('/api/v1/departamentos', departamentoRouter);
  app.use('/api/v1/encargados', encargadoRouter);
  app.use('/api/v1/areas', areaRouter);
}

module.exports = routerApi;
