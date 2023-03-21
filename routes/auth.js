const express = require("express");
const router = express.Router();
const { validatorLogin, validatorRegister } = require("../validators/auth");
const { loginCtrl, registerCtrl } = require("../controllers/auth");

//TODO http://localhost:3001/api/auth/login
//TODO http://localhost:3001/api/auth/register

/**
 *  http://localhost:3001/api
 * 
 * Route register new user
 * @openapi
 * /auth/register:
 *      post:
 *          tags:
 *               - auth
 *          summary: "Registrar nuevo usuario"
 *          description: "Esta ruta es para registrar nuevo usuario"
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/authRegister"
 *          responses:
 *              '201':
 *                  description: Usuario registrado de manera correcta 
 *              '403':
 *                  description: Error por validation de usuario
*/


router.post("/register", validatorRegister, registerCtrl);

router.post("/login", validatorLogin, loginCtrl);



module.exports = router;