const { signup, login } = require('../Controllers/AdminController');
const { signupValidation, loginValidation } = require('../Middlewares/AdminValidation');

const router=require('express').Router()

router.post('/login',loginValidation,login)

router.post('/signup',signupValidation,signup)

module.exports=router