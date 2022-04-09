const bcryptjs = require("bcryptjs");
const { response, request } = require("express");
const { validationResult } = require("express-validator");
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

const usuariosPut = (req, res) => {
  const { id } = req.params;
  res.json({
    msg: "put API - controller",
    id,
  });
};

const usuariosPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });
  //Verificar si el correo existe
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    return res.status(400).json({
      msg: "El correo ya está registrado",
    });
  }

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
