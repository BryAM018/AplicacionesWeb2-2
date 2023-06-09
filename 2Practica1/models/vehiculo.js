
const VehiculoSchema = Schema(
    {
        descripcion:{
            type: String,
            required: [true,   "El nombre del Vehiculo es obligatorio"],
            unique: true
        },
        placa:{
            type: String,
            required: [true],
            unique: true
        },
        color:{
            type: String,
            required: [true],
        },    
        status:{
            type: Boolean,
            default: true,
            required:true
        }
    }
)

module.exports = model('Vehiculo', VehiculoSchema );