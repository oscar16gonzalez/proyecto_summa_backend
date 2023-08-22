const { response, request } = require('express');
const twilio = require('twilio');
const accountSid = "AC25d6a398ba3417ca31f9c7a4768c2f28";
const authToken = "1d32b290da5c074754e0df961d7543b0";
const cliente = new twilio(accountSid, authToken);

//Modelo de rutas
const Rutas = require('../models/ruta');

const rutasGet = async(req = request, res = response) => {
    //Se realiza paginacion para los usuarios mostrando de 5 en 5 
    const { limite = 100, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, rutas] = await Promise.all([
        Rutas.countDocuments(query),
        Rutas.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        rutas
    });
}

//Retorna las rutas asociadas a un usuario
const rutasGetUser = async(req = request, res = response) => {
    const usuarioId = req.params.id;
    const rutas = await Rutas.find({ usuario_id: usuarioId });
    res.json({
        rutas
    });
}

//Retorna las rutas creadas por un usuario
const rutasGetUserCreate = async(req = request, res = response) => {
    const usuario = req.params.id;
    const rutas = await Rutas.find({ usuario: usuario });
    res.json({
        rutas
    });
}

//Creacion de rutas
const rutaPost = async(req, res = response) => {
    const { fecha, tipo_vehiculo, hora_salida, cupos_disponibles, origen, destino, usuario_id, usuario } = req.body;
    const ruta = new Rutas({ fecha, tipo_vehiculo, hora_salida, cupos_disponibles, origen, destino, usuario_id, usuario });

    await ruta.save();
    res.json({
        ruta
    });
}

const rutasPut = async(req, res = response) => {
    const { id } = req.params;
    const { _id, ...resto } = req.body;
    const ruta = await Rutas.findByIdAndUpdate(id, resto);

    res.json(ruta);
}

const rutasDelete = async(req, res = response) => {
    const { id } = req.params;

    const _ruta = await Rutas.findById(id);

    // se borra fisicamente el elemento de la base de datos
    // const usuario = await Usuario.findByIdAndDelete( id );
    const ruta = await Rutas.findByIdAndUpdate(id, { estado: false });

    res.json(ruta);

    //Integracion con Twilio para envio de mensajeria a usuario
    cliente.messages
        .create({
            body: `Se ha cancelado la ruta: \n Origen : ${_ruta.origen} - Destino : ${_ruta.destino}  \n para la fecha  ${_ruta.fecha}`,
            to: '+573128502119',
            from: process.env.NUMBER_PHONE
        })
        .then(message => console.log(message.sid));
}

module.exports = {
    rutasGet,
    rutaPost,
    rutasPut,
    rutasDelete,
    rutasGetUser,
    rutasGetUserCreate
}