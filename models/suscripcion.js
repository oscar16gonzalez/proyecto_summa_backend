const { Schema, model } = require('mongoose');

const SuscripcionSchema = Schema({
    ruta: {
        type: Object,
    },
    usuario_id: {
        type: Object,
    },
    estado: {
        type: Boolean,
        default: true
    },
});


// Metodo para no regresar  ( __v  )
SuscripcionSchema.methods.toJSON = function() {
    const { __v, ...suscripcion } = this.toObject();
    return suscripcion;
}

module.exports = model('Suscripcion', SuscripcionSchema);