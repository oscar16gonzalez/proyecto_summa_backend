const { Schema, model } = require('mongoose');

const RutaSchema = Schema({
    fecha: {
        type: String,
        required: [true, 'La fecha es obligatoria']
    },
    tipo_vehiculo: {
        type: String,
        required: [true, 'El tipo de vehiculo es obligatorio'],
    },
    hora_salida: {
        type: String,
        required: [true, 'La hora de salida es obligatoria'],
    },
    cupos_disponibles: {
        type: Number,
        required: [true, 'Los cupos disponibles son obligatorios'],
    },
    origen: {
        type: String,
        required: [true, 'El origen es obligatorio'],
    },
    destino: {
        type: String,
        required: [true, 'El destino es obligatorio'],
    },
    estado: {
        type: Boolean,
        default: true
    },
    usuario_id: { type: Schema.Types.ObjectId, ref: 'User' },

    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    estado_ruta: {
        type: String,
    },

});


// Metodo para no regresar  ( __v  )
RutaSchema.methods.toJSON = function() {
    const { __v, ...ruta } = this.toObject();
    return ruta;
}

module.exports = model('Ruta', RutaSchema);