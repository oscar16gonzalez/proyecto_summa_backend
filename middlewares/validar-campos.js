const { validationResult } = require('express-validator');

const validarCampos = ( req, res, next ) => {
//caputara todos los campos antes de enviarlos a la db para ralizar las validaciones necesarias 
    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json(errors);
    }

    next();
}

module.exports = {
    validarCampos
}
