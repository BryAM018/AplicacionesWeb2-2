const { Router } = require('express');
const { check } =  require('express-validator')


const {
    createVehiculo,
    getVehiculo,
    getVehiculos,
    updateVehiculo,
    deleteVehiculo
} = require('../controllers').Vehiculo;

const { validateFields } = require('../middlewares')

const router= Router();

router.get('/', getVehiculos );

router.get('/:id'
,check('id', 'Este no es un ID de Mongo correcto').isMongoId()
 , getVehiculo );

 router.post('/',[
   check('descripcion', 'EL nombre es requerido').not().isEmpty(),
   check('placa', 'EL placa es requerido').not().isEmpty(),
    validateFields
], createVehiculo);


 router.put('/:id', updateVehiculo);

 router.delete('/:id',[
    check('id','Debe ser un id de mongo VALIDO').isMongoId()
], deleteVehiculo);



module.exports = router;