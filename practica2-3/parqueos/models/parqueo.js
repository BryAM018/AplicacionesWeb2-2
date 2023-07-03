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
        }
    }
);

ParqueoSchema.methods.toJSON = function(){
    const { __v,  status,  ...data   } =  this.toObject();
    return data;
}

module.exports = model("Parqueo", ParqueoSchema);