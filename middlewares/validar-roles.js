const { response } = require('express');

const adminRole = (req, res = response, next) => {
    if (!req.usuario) {
        return res.status(500).json({ message: 'Se quiere validar el rol sin validar primeor el token' })
    }


    const { rol, nombre } = req.usuario;

    if (rol !== 'ADMIN_ROLE') {
        return res.status(500).json({ message: 'No tiene permisos para realizar eliminar un usuario' })
    }

    next();

}

module.exports = {
    adminRole
}