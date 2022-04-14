const { Router } = require("express");
const { check } = require("express-validator");
const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
} = require("../controllers/users");
const {
  esRoleValido,
  emaiExiste,
  existeUsuarioPorId,
} = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");
const router = Router();

router.get("/", usuariosGet);

router.put(
  "/:id",
  //comprobamos que sea un id válido(de mongodb)
  [check("id", "No es un id válido").isMongoId(), validarCampos],
  check("id").custom(existeUsuarioPorId),
  check("rol").custom(esRoleValido),
  validarCampos,
  usuariosPut
);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe tener al menos 6 caracteres").isLength({
      min: 6,
    }),
    check("correo").custom(emaiExiste),
    //check("correo", "El correo no es válido").isEmail(),
    //check("rol", "No es un rol válido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("rol").custom(esRoleValido),
    validarCampos,
  ],
  usuariosPost
);

router.delete("/", usuariosDelete);

module.exports = router;
