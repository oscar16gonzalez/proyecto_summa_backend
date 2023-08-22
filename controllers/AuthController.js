const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generarJWT');

const loginAuth = async(req, res = response) => {

    const { correo, password } = req.body;

    try {

        // verificar si  el email existe 
        const usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            return res.status(400).json({
                access: false,
                msg: 'Usuario o Contraseña incorrecta',
            });
        }

        // verificar si el usuario esta activo o no 
        if (!usuario.estado) {
            return res.status(400).json({
                access: false,
                msg: 'Usuario o Contraseña incorrecta',
            });
        }

        // verificar que la contraseña exista
        const validarContraseña = bcryptjs.compareSync(password, usuario.password);

        if (!validarContraseña) {
            return res.status(400).json({
                access: false,
                msg: 'Contraseña incorrecta',
            });
        }
        // generar JWT

        const token = await generarJWT(usuario.id);


        return res.status(200).json({
            access: true,
            usuario,
            token
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            msg: 'Communicate con el Aministrador',
        });
    }

}

module.exports = {
    loginAuth
}