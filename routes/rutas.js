const { Router } = require('express');
const { check } = require('express-validator');

//VALIDACIONES
const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido, emailExiste, existeUsuarioPorId, esRoleValidoDelete } = require('../helpers/db-validators');


const {
        rutasGet,
        rutaPost,
        rutasPut,
        rutasDelete,
        rutasGetUser,
        rutasGetUserCreate,
        retornarUsuariosPorRuta,
        
    } = require('../controllers/RutasController');

const {
       suscripcionPost
    } = require('../controllers/SuscripcionesController');
    
const router = Router();

router.get('/', rutasGet);

router.post('/', [
    check('fecha', 'La fecha es obligatori').not().isEmpty(),
    check('tipo_vehiculo', 'El tipo de vehiculo es obligatorio').not().isEmpty(),
    check('hora_salida', 'La hora de salida es requerida').not().isEmpty(),
    check('origen', 'El origen es requerida').not().isEmpty(),
    check('destino', 'El destino es requerida').not().isEmpty(),
    validarCampos
], rutaPost);

router.post('/suscripcion', suscripcionPost);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    // check('id').custom(existeUsuarioPorId),
    // check('rol').custom(esRoleValido),
    validarCampos
], rutasPut);


router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], rutasDelete);


router.get('/:id', rutasGetUser);

router.get('/mis_rutas/:id', rutasGetUserCreate);

router.get('/mis_rutas/prueba/:id', retornarUsuariosPorRuta);




module.exports = router;