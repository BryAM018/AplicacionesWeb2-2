const { model, Schema } = require('mongoose');
const ParqueoSchema = Schema(
    {
        entrada:{
            type: String,
            required: [true,   "La fecha de entrada es obligatorio"],
            unique: true
        },
        salida:{
            type: String,
            required: [true],
        },
        espacio:{
            type: String,
            required: [true],
        },
        vehiculo:{
            type: String,    
          
            required: [true],
        },
        status:{
            type: Boolean,
            default: true,
            required:true
        }
    }
);

ParqueoSchema.methods.toJSON = function(){
    const { __v,  status,  ...data   } =  this.toObject();
    return data;
}

module.exports = model("Parqueo", ParqueoSchema);