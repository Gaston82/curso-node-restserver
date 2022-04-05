const { response, request } = require("express");
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
  //const { nombre, correo, password, img } = req.body;
  const body = req.body;
  const usuario = new Usuario(body);
  await usuario.save();
  res.status(201).json({
    msg: "post API - controller",
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
