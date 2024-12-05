//swagger.js
const { version } = require('eslint-plugin-prettier');
// const { title } = require('faker/lib/locales/az');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

//Configuración de Swagger
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Documentacion de la API', //titulo de la documentacion
    version: '1.0.0', //version de la API
    description: 'Documentacion de la API con Swagger'
  },
  servers: [
    {
      url: 'http://localhost:4000/api/v1', //URL base de la API
      description: 'Servidor de Desarrollo'
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'] //Ajusta esto a la ruta de los archivos de rutas
};

const swaggerSpec = swaggerJSDoc(options);

function setupSwagger(app){
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = setupSwagger;
