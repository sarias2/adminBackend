// Route: '/api/users'
const { Router } = require('express');
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/users');
const { check } = require('express-validator');
const { fieldValidation } = require('../middlewares/field-validation');
const { JWTValidation } = require('../middlewares/jwt-validation');


const router = Router();

router.get('/', JWTValidation, getUsers);

router.post('/', [
    JWTValidation,
    check('name', 'Name field is mandatory').not().isEmpty(),
    check('password', 'Password field is mandatory').not().isEmpty(),
    check('email', 'Email field is mandatory').isEmail(),
    fieldValidation
], createUser)

router.put('/:id', [
    JWTValidation,
    check('name', 'Name field is mandatory').not().isEmpty(),
    check('email', 'Email field is mandatory').isEmail(),
    check('role', 'Role field is mandatory').not().isEmpty(),
    fieldValidation
], updateUser);

router.delete('/:id', JWTValidation, deleteUser);

module.exports = router;