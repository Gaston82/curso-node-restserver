const { Categoria, Usuario } = require("../models");
const Role = require("../models/role");

const esRoleValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no está registrado en la BD`);
  }
};

//Verificar si el correo existe

const emaiExiste = async (correo = "") => {
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    throw new Error(`El correo ${correo} ya existe`);
  }
};

const existeUsuarioPorId = async (id) => {
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`El usuario con id:  ${id} no existe`);
  }
};

/**
 * Categorias
 *
 */
const existeCategoriaPorId = async (id) => {
  const existeCategoria = await Categoria.findById(id);
  if (!existeCategoria) {
    throw new Error(`La categoría con id : ${id} no existe`);
  }
};

module.exports = {
  esRoleValido,
  emaiExiste,
  existeUsuarioPorId,
  existeCategoriaPorId,
};
