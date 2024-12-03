const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken')
const UserModel = require("../Models/User");
const nodemailer = require('nodemailer');


// const signup = async(req,res)=>{
//    try{
//     const {name,email,password}=req.body;
//     const user = await UserModel.findOne({email})
//     if(user){
//         return res.status(409).json({message:"User is already exist, you can login",success:false})
//     }
//     const userModel = new UserModel({name,email,password})
//     userModel.password = await bcrypt.hash(password,10)
//     await userModel.save()
//     res.status(201).json({message:"Signup successflly",success:true})
//    }catch(err){
//     res.status(500).json({message:"Internal server error",success:false})
//    }
// }

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(409).json({ message: "User already exists, you can login.", success: false });
    }

    // Create a new user
    const newUser = new UserModel({ name, email });
    newUser.password = await bcrypt.hash(password, 10);
    await newUser.save();

    // Configure nodemailer
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // Use your email service
      auth: {
        user: process.env.EMAIL_USER, // Environment variable for sender email
        pass: process.env.EMAIL_PASS, // Environment variable for sender email password
      },
    });

    // Compose the confirmation email
    const mailOptions = {
      from: '"ShelfSync" <' + process.env.EMAIL_USER + '>',
      to: email, // Receiver email
      subject: 'Signup Successful!',
      html: `
        <h1>Welcome to ShelfSync, ${name}!</h1>
        <p>Your account has been successfully created. Please <a href="http://localhost:3000/login">login</a> to continue.</p>
      `,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending confirmation email:', error);
        return res.status(500).json({ message: 'Signup successful, but failed to send confirmation email.', success: false });
      } else {
        console.log('Confirmation email sent:', info.response);
      }
    });

    res.status(201).json({ message: "Signup successful.", success: true });
  } catch (err) {
    console.error('Error during signup:', err);
    res.status(500).json({ message: "Internal server error.", success: false });
  }
};


const login = async(req,res)=>{
    try{
     const {email,password}=req.body;
     const user = await UserModel.findOne({email})
     const errorMsg="Auth failed email or password is wrong"
     if(!user){
         return res.status(403).json({message:errorMsg,success:false})
     }
    const isPassEqual = await bcrypt.compare(password,user.password)
    if(!isPassEqual){
        return res.status(403).json({message:errorMsg,success:false})
    }
    const jwtToken = jwt.sign(
        {email:user.email,_id:user._id},
        process.env.JWT_SECRET,
        {expiresIn:'24h'}
    )
     res.status(200).json({message:"Login successflly",
        success:true,
        jwtToken,
        email,
        name:user.name,
        userId: user._id,
    })
    }catch(err){
        console.log(err)
     res.status(500).json({message:"Internal server error",success:false})
    }
 }

module.exports={
    signup,
    login
}