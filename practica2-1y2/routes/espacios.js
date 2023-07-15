const { Router } = require('express');
const { check } =  require('express-validator')


const {
    createEspacio,
    getEspacio,
    getEspacios,
    updateEspacio,
    deleteEspacio
} = require('../controllers').Espacio;

const { validateFields } = require('../middlewares')

const router= Router();

router.get('/', getEspacios );

router.get('/:id'
,check('id', 'Este no es un ID de Mongo correcto').isMongoId()
 , getEspacio );

router.post('/',[
    check('descripcion', 'EL nombre es requerido').not().isEmpty(),
    validateFields
], createEspacio);


 router.put('/:id', updateEspacio);

 router.delete('/:id',[
   check('id','Debe ser un id de mongo VALIDO').isMongoId()
], deleteEspacio);



module.exports = router;