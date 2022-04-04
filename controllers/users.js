const { response, request } = require("express");

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

const usuariosPost = (req, res) => {
  const { nombre, edad } = req.body;
  res.status(201).json({
    msg: "post API - controller",
    nombre,
    edad,
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
