const { model, Schema } = require('mongoose');
const ParqueoSchema = Schema(
    {
        entrada:{
            type: Date,
            required: [true,   "La fecha de entrada es obligatorio"],
            unique: true
        },
        salida:{
            type: Date,
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
);

ParqueoSchema.methods.toJSON = function(){
    const { __v,  status,  ...data   } =  this.toObject();
    return data;
}

module.exports = model("Parqueo", ParqueoSchema);