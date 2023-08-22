const { Router } = require('express');
const { check } = require('express-validator');

//VALIDACIONES
const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido, emailExiste, existeUsuarioPorId, esRoleValidoDelete } = require('../helpers/db-validators');


const {
    suscripcionGet,
    suscripcionPost,
    suscripcionPut,
    deleteSuscripcion
} = require('../controllers/SuscripcionesController');

const router = Router();

router.get('/', suscripcionGet);

router.post('/', suscripcionPost);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    // check('id').custom(existeUsuarioPorId),
    // check('rol').custom(esRoleValido),
    validarCampos
], suscripcionPut);


router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], deleteSuscripcion);


module.exports = router;