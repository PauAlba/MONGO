const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const setupSwagger = require('./Swagger');
const routerApi = require('./routes/router');

const app = express();

app.use(cors());
app.use(bodyParser.json());

setupSwagger(app)
routerApi(app)

mongoose.connect(
'mongodb+srv://juanpismata11:Juanpis11@api312.9fj67.mongodb.net/?retryWrites=true&w=majority&appName=api312'
)
.then(()=> console.log("Conexión a MongoDB exitosa"))
  .catch(err => console.log("No se pudo conectar a MongoDB", err))

  app.listen(4000 , () => {
    console.log(`Puerto funcionando en http://localhost:${4000}`)
});

/*
COMANDOS

npm init -y
npm install eslint-plugin-prettier --save
npm install swagger-jsdoc swagger-ui-express
npm i --save mongoose
npm i cors body-parser --install
npm i nodemon --save
npm i express
npm i faker@5.5.3

Como correrlo: npm start
*/
