const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");
// const router = require("../routes/user");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = "/api/usuarios";

    //conectar a base de datos

    this.conectarDB();

    //Middlewares
    this.middlewares();
    //Rutas de mi aplicación
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    //Lectuta y parseo del body
    this.app.use(express.json());

    //Directorio Público
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.usuariosPath, require("../routes/users"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`servidor corriendo en el puerto `, this.port);
    });
  }
}

module.exports = Server;
