const bcryptjs = require("bcryptjs");
const { response, request } = require("express");
const { validationResult } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");

const Usuario = require("../models/usuario");

const usuariosGet = (req = request, res = response) => {
  const { q, name, apikey, page = 1, limit } = req.query;
  res.json({
    msg: "get API - controlador",
    q,
    name,
    apikey,
    page,
    limit,
  });
};

const usuariosPut = async (req, res) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...resto } = req.body;

  //Validar contra BD

  if (password) {
    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }
  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json({
    msg: "put API - controller",
    usuario,
  });
};

const usuariosPost = async (req, res) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  //Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  //Guardar usuario en BD
  await usuario.save();
  res.status(201).json({
    usuario,
  });
};

const usuariosDelete = (req, res) => {
  res.json({
    msg: "delete API - controller",
  });
};

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
};
