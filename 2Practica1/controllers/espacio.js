const { response } = require('express');
const { Espacio } = require('../models');


const getEspacios = async (req,res = response )=>{
    const { limite = 10 , desde=0 } =  req.query;
    const query = { status:true };

    const [ sum, espacios ] = await Promise.all([
        Espacio.countDocuments(query),
        Espacio.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);
  
    res.json({
      sum, 
      espacios
    })
}

const getEspacio = async (req, res= response)=>{
    const {id} = req.params
    const espacio=  await Espacio.findById(id);
    res.json(espacio);
}
const createEspacio = async(req,res=response)=>{
    const { status, ...body } =  req.body;
    
    const existEspacio =  await Espacio.findOne({descripcion: body.descripcion})

    if (existEspacio)
    {
        return res.status(400).json({
            msg:`El espacio ${ existeEspacio.descripcion } ya existe`
        })
    }

    const data = {
        ...body,
        descripcion: body.descripcion
    }

    const espacio = new Espacio(data);

    const newEspacio =  await espacio.save();
    res.status(201).json(newEspacio);
}
const updateEspacio = async(req,res =  response)=>{
    const {id} = req.params;
    const { status, ...data } =  req.body;
    const espacioUpdated =  await Espacio.findByIdAndUpdate(id,data, {new: true} )
    res.json(espacioUpdated);
}
const deleteEspacio =  async (req, res= response)=>{
    const {id} = req.params;
    const deletedEspacio =  await Espacio.findByIdAndUpdate(id, {status:false}, {new:true} );
    res.json(deletedEspacio);
}

 module.exports ={
    createEspacio,
    getEspacio,
    getEspacios,
    updateEspacio,
    deleteEspacio
 }