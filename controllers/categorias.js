const { response } = require("express");
// const categoria = require("../models/categoria");
const { Categoria } = require("../models");

//obtenerCategorías - paginado - populate

const obtenerCategorias = async (req, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };
  const [categorias, total] = await Promise.all([
    Categoria.countDocuments(query),
    Categoria.find(query)
      .populate("usuario", "nombre")
      .limit(Number(limite))
      .skip(Number(desde)),
  ]);

  res.json({
    total,
    categorias,
  });
};
//obtenerCategoría - populate {}
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

// actualizarCategiría

// borrarCategoría - estado: false

module.exports = {
  crearCategoria,
  obtenerCategorias,
};
