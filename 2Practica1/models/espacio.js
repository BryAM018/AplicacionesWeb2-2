//const { model, Schema } = require('mongoose');
const EspacioSchema = Schema(
    {
        descripcion:{
            type: String,
            required: [ true, 'El nombre del Espacio es necesario'],
            unique:true
        },
        status:{
            type: Boolean,
            default: true,
            required:true
        }
    }
);

module.exports = model('Espacio', EspacioSchema );
