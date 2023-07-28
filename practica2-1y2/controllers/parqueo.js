const { response } = require('express')
const { Parqueo } = require('../models')


const getParqueos= async (req, res = response )=>{
    //GET http://localhost:2500/parqueos   ?limit=10?since=1
    
    const { limit = 100 , since=0 } =  req.query;
    const query = { status:true};

    const [ sum, parqueos ] = await Promise.all([
        Parqueo.countDocuments(query),
        Parqueo.find(query)
        .populate('vehiculo','descripcion status')
        .populate('espacio','entrada status')
        .skip(Number(since))
        .limit(Number(limit))
    ]);
     
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
    const { status, ...body } =  req.body;

    const existParqueo =  await Parqueo.findOne({entrada: body.entrada})

    if (existParqueo)
    {
        return res.status(400).json({
            msg:`El parqueo ${ body.entrada } ya existe`
        })
    }

    const data = {
        ...body,
        entrada: body.entrada
    }

    const parqueo = new Parqueo(data);

    const newParqueo =  await parqueo.save();
    res.status(201).json(newParqueo);
}
const updateParqueo= async (req, res=response)=>{
    const {id} = req.params;
    const { status, ...data } =  req.body;
    // console.log(id,data)
    const parqueoUpdated  =  await Parqueo.findByIdAndUpdate(id,data, {new: true} )
    res.json(parqueoUpdated );
}
const deleteParqueo= async (req, res = response)=>{  
    const {id} = req.params;
    const deletedParqueo =  await (Parqueo.findByIdAndUpdate(id, {status:false}, {new:true}))  ;
    res.json({deletedParqueo});       
}  
const deleteParqueos= async (req, res = response)=>{  
    const {id} = req.params;
    const idArray = id.split(',');
      // Validamos el mínimo de 2 y máximo de 10 transacciones
  if (idArray.length < 2) {
    return res.status(400).json({ error: 'Se requieren al menos dos IDs para eliminar' });
  } else if (idArray.length > 10) {
    return res.status(400).json({ error: 'No se pueden eliminar más de 10 IDs a la vez' });
  }
    const deletedParqueos = await Promise.all(idArray.map(async (singleId) => {
      const deletedParqueos = await Parqueo.findByIdAndUpdate(singleId, { status: false }, { new: true });
      return deletedParqueos;
    }));      res.json({deletedParqueos});       
}  
  
module.exports = {
    getParqueo,
    getParqueos,
    createParqueo,
    updateParqueo,
    deleteParqueo,
    deleteParqueos,
};