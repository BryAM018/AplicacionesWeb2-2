const { response } = require('express');
const { Vehiculo } = require('../models');


const getVehiculos = async (req,res = response )=>{
    const { limite = 10 , desde=0 } =  req.query;
    const query = { status:true };

    const [ sum, vehiculos ] = await Promise.all([
        Vehiculo.countDocuments(query),
        Vehiculo.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);
  
    res.json({
      sum, 
      vehiculos
    })
}

const getVehiculo = async (req, res= response)=>{
    const {id} = req.params
    const vehiculo=  await Vehiculo.findById(id);
    res.json(Vehiculo);
}
const createVehiculo = async(req,res=response)=>{
    const { status, ...body } =  req.body;
    
    const existVehiculo =  await Vehiculo.findOne({descripcion: body.descripcion})

    if (existVehiculo)
    {
        return res.status(400).json({
            msg:`El vehiculo ${ existVehiculo.descripcion } ya existe`
        })
    }

    const data = {
        ...body,
        descripcion: body.descripcion
    }

    const vehiculo = new Vehiculo(data);

    const newVehiculo =  await Vehiculo.save();
    res.status(201).json(newVehiculo);
}
const updateVehiculo = async(req,res =  response)=>{
    const {id} = req.params;
    const { status, ...data } =  req.body;
    const vehiculoUpdated =  await Vehiculo.findByIdAndUpdate(id,data, {new: true} )
    res.json(vehiculoUpdated);
}
const deleteVehiculo =  async (req, res= response)=>{
    const {id} = req.params;
    const deletedVehiculo =  await Vehiculo.findByIdAndUpdate(id, {status:false}, {new:true} );
    res.json(deletedVehiculo);
}

 module.exports ={
    createVehiculo,
    getVehiculo,
    getVehiculos,
    updateVehiculo,
    deleteVehiculo
 }