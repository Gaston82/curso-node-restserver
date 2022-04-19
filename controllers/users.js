const bcryptjs = require("bcryptjs");
const { response, request } = require("express");
const { validationResult } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");

const Usuario = require("../models/usuario");

const usuariosGet = async (req = request, res = response) => {
  // const { q, name, apikey, page = 1, limit } = req.query;
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };
  // const usuarios = await Usuario.find(query)
  //   .limit(Number(limite))
  //   .skip(Number(desde));

  // const total = await Usuario.countDocuments();
  const [usuarios, total] = await Promise.all([
    Usuario.find(query).limit(Number(limite)).skip(Number(desde)),
    Usuario.countDocuments(query),
  ]);
  res.json({
    total,
    usuarios,
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

  res.json(usuario);
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

const usuariosDelete = async (req, res) => {
  const { id } = req.params;

  //Físicamente lo borramos

  //const usuario = await Usuario.findByIdAndDelete(id);
  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
  res.json(usuario);
};

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
};
