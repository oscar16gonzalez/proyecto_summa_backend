const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async(rol = '') => {
    // Verificar si el rol existe
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${ rol } no está registrado en la BD`);
    }
}

const esRoleValidoDelete = async(rol = '') => {
    // Verificar si el rol existe
    const existeRol = await Role.findOne({ rol });
    if (existeRol.rol != 'ADMIN_ROLE') {
        throw new Error(`El rol ${ rol } no está autorizado para modificar un elemento`);
    }
}
const emailExiste = async(correo = '') => {
    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo: ${ correo }, ya está registrado`);
    }
}

const existeUsuarioPorId = async(id) => {
    // Verificar si el id del usuario existe
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id no existe ${ id }`);
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    esRoleValidoDelete
}