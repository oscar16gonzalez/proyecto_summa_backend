const { response, request } = require('express');

//Modelo de rutas
const Suscripcion = require('../models/suscripcion');

const suscripcionGet = async(req = request, res = response) => {
    //Se realiza paginacion para los usuarios mostrando de 5 en 5 
    const { limite = 100, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, suscripciones] = await Promise.all([
        Suscripcion.countDocuments(query),
        Suscripcion.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        suscripciones
    });
}

//Creacion de usuarios
const suscripcionPost = async(req, res = response) => {
    const { ruta, usuario_id } = req.body;
    const suscripcion = new Suscripcion({ ruta, usuario_id});

    // Guardar en BD
    await suscripcion.save();

    res.json({
        suscripcion
    });
}

const suscripcionPut = async(req, res = response) => {
    const { id } = req.params;
    const { _id, ...resto } = req.body;

    const suscripcion = await Suscripcion.findByIdAndUpdate(id, resto);

    res.json(suscripcion);
}


const deleteSuscripcion = async(req, res = response) => {
    const { id } = req.params;

    // Fisicamente lo borramos
    // const suscripcion = await Suscripcion.findByIdAndDelete( id );
    const suscripcion = await Suscripcion.findByIdAndUpdate(id, { estado: false });


    res.json(suscripcion);
}

module.exports = {
    suscripcionGet,
    suscripcionPost,
    suscripcionPut,
    deleteSuscripcion
    // rutasDelete
}