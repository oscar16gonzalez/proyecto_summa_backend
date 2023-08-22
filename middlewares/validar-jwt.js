const { response } = require('express');
const jwt = require('jsonwebtoken')

const Usuario = require('../models/usuario');

const validarJWT = async(req, res = response, next) => {

    const token = req.header('access-token');

    if (!token) {
        return res.status(401).json({
            message: 'No hay TOKEN para la peticion'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        //Leer el usuario que corresponda al uid
        const usuario = await Usuario.findById(uid);

        if (!usuario) {
            return res.status(401).json({
                msg: 'Usuario no existente'
            });
        }

        //verificar si el uid no esta en estado true
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Token no valido - usuario no existente'
            });
        }

        req.usuario = usuario;
        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: 'TOKEN no valido'
        });
    }
}

module.exports = {
    validarJWT
}