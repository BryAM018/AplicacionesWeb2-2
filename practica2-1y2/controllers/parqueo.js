const { response } = require('express')
const { Parqueo } = require('../models')


const getParqueos= async (req, res = response )=>{

    //GET http://localhost:3000/parqueos   ?limit=100?since=1
    const { limit = 10 , since=0 } =  req.query;
    const query = { status:true };

    const [ sum, parqueos ] = await Promise.all([
        Parqueo.countDocuments(query),
        Parqueo.find(query)
        .populate('vehiculo','descripcion status')
        .populate('espacio','entrada status')
        .skip(Number(since))
        .limit(Number(limit))
    ])
  
    res.json({
      sum, 
      parqueos
    })
    
}
const getParqueo= async (req, res =  response)=>{
    const {id} = req.params
    const parqueo=  await Parqueo.findById(id).populate('vehiculo','espacio');
    res.json(parqueo);
}
const createParqueo= async (req, res = response)=>{
    const { status, user, ...body } =  req.body;
    
    const existParqueo =  await Parqueo.findOne({entrada: body.entrada})

    if (existParqueo)
    {
        return res.status(400).json({
            msg:`El parqueoo ${ body.entrada } ya existe`
        })
    }

    const data = {
        ...body,
        entrada: body.entrada
    }

    const parqueo = new Parqueo(data);

    const newParqueo =  await Parqueo.save();
    res.status(201).json(newParqueo);
}
const updateParqueo= async (req, res=response)=>{
    const {id} = req.params;
    const { status, ...data } =  req.body;
    // console.log(id,data)
    const updatedParqueo =  await Parqueo.findByIdAndUpdate(id,data, {new: true} )
    res.json(updatedParqueo);
}
const deleteParqueo= async (req, res = response)=>{
    const {id} = req.params;
    const deletedParqueo =  await Parqueo.findByIdAndUpdate(id, {status:false}, {new:true} );
    res.json(deletedParqueo);
}

module.exports = {
    getParqueo,
    getParqueos,
    createParqueo,
    updateParqueo,
    deleteParqueo
};