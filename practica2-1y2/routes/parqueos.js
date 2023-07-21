const { Router } = require('express')
const { check } =  require('express-validator')

const { 
    createParqueo,
     getParqueo, 
     getParqueos,
     updateParqueo,
     deleteParqueo 
    } = require('../controllers').Parqueo;

const { validateFields } = require('../middlewares')

const router = Router();

///     https://localhost:2500/api/v1/parqueos/

router.get('/', getParqueos);

router.get('/:id'
,check('id', 'Este no es un ID de Mongo correcto').isMongoId() 
   , getParqueo);

router.post('/',[
    check('entrada','El nombre es requerido').not().isEmpty(),

    validateFields
] , createParqueo)

 router.put('/:id', updateParqueo)

router.delete('/:id',[
    check('id','Debe ser un id de mongo VALIDO').isMongoId()
], deleteParqueo)

module.exports = router;