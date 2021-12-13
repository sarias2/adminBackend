// Route: './api/hospitals'

const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidation } = require('../middlewares/field-validation');
const { getHospitals, createHospital, updateHospitals, deleteHospital } = require('../controllers/hospitals')
const { JWTValidation } = require('../middlewares/jwt-validation');


const router = Router();

router.get('/', getHospitals);

router.post('/', [
    JWTValidation,
    check('name', 'The hospital name is mandatory').not().isEmpty()
], createHospital)

router.put('/:id', [], updateHospitals);

router.delete('/:id', deleteHospital);

module.exports = router;