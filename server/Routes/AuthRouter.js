const { signup, login , verifyOtp, resendOtp, sendOtp , updatePassword} = require('../Controllers/AuthController');
const { signupValidation, loginValidation} = require('../Middlewares/AuthValidation');

const router=require('express').Router()

router.post('/login',loginValidation,login)

router.post('/signup',signupValidation,signup)

router.post('/verify-otp', verifyOtp);

router.post('/resend-otp', resendOtp);

// Route to send OTP for login or signup
router.post('/send-otp', (req, res) => {
    const { email, name } = req.body;
    const isLogin=true;
    console.log(email);
    sendOtp(email, name,isLogin);

    res.status(200).json({ success: true, message: 'OTP sent successfully.' });
});

router.post('/update-password',updatePassword);

module.exports=router