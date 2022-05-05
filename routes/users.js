const { Router } = require("express");
const { check } = require("express-validator");
const {
  validarCampos,
  validarJWT,
  esAdminRol,
  tieneRole,
} = require("../middlewares");

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

router.delete(
  "/:id",
  [
    validarJWT,
    //Valida cualquiera de los roles que pase por parámetro
    tieneRole("ADMIN_ROLE", "VENTAS_ROLE"),
    //Valida que el rol del usuario sea el de administrador
    // esAdminRol,
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarCampos,
  ],
  usuariosDelete
);

module.exports = router;
