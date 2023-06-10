
const ParqueoSchema = Schema(
    {
        entrada:{
            type: new date,
            required: [true,   "La fecha de entrada es obligatorio"],
            unique: true
        },
        salida:{
            type: date,
            required: [true],
            unique: true
        },
        espacio:{
            type: Schema.Types.ObjectId,
            ref:"Espacio",
            required: false
        },
        vehiculo:{
            type: Schema.Types.ObjectId,
            ref:"Vehiculo",
            required: false
        }
    }
)
ParqueoSchema.methods.toJSON = function(){
    const { __v,  status,  ...data   } =  this.toObject();
    return data;
}

module.exports = model("Parqueo", ParqueSchema );