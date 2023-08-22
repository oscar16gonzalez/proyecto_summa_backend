const { Router } = require('express');
const { check } = require('express-validator');

const {
    loginAuth
} = require('../controllers/AuthController');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
],loginAuth);

module.exports = router;
