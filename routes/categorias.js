const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();

//Obtener todas las categorías - ruta pública
router.get("/", (req, res) => {
  res.json("get");
});

//Obtener una categoría por id - ruta pública
router.get("/:id", (req, res) => {
  res.json("get");
});

//Crear categoría  - ruta privada - Cualquier persona con un token válido
router.post("/", (req, res) => {
  res.json("post");
});

//Actualizar categoría  - ruta privada - Cualquier persona con un token válido
router.put("/:id", (req, res) => {
  res.json("put");
});

//Borrar unacategoría  - ruta privada - Admin
router.delete("/:id", (req, res) => {
  res.json("delete");
});

module.exports = router;
