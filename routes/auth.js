// Route '/api/login'

const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { fieldValidation } = require('../middlewares/field-validation');

const router = Router();

router.post('/', [
    check('email', 'Email field is mandatory').isEmail(),
    check('password', 'Password field is mandatory').not().isEmpty(),
    fieldValidation
], login);


module.exports = router;