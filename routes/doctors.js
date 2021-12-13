// Route: './routes/hospitals'

const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidation } = require('../middlewares/field-validation');
const { getDoctors, createDoctor, updateDoctors, deleteDoctor } = require('../controllers/doctors')
const { JWTValidation } = require('../middlewares/jwt-validation');

const router = Router();

router.get('/', getDoctors);

router.post('/', [
    JWTValidation,
    check('name', 'Name is a mandatory field').not().isEmpty(),
    check('hospital', 'Hospital Id must be valid').isMongoId(),
    fieldValidation
], createDoctor)

router.put('/:id', [], updateDoctors);

router.delete('/:id', deleteDoctor);

module.exports = router;