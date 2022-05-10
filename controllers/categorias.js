const { response } = require("express");
// const categoria = require("../models/categoria");
const { Categoria } = require("../models");

const crearCategoria = async (req, res = response) => {
  //Guarda el nombre de la categoría en mayúsculas
  const nombre = req.body.nombre.toUpperCase();

  const categoriaDB = await Categoria.findOne({ nombre });

  if (categoriaDB) {
    return res.status(400).json({
      msg: `La categoría ${categoriaDB.nombre} ya existe`,
    });
  }

  const data = {
    nombre,
    usuario: req.usuario._id,
  };

  const categoria = new Categoria(data);

  //Guardar DB

  await categoria.save();

  res.status(201).json(categoria);
};

module.exports = {
  crearCategoria,
};
