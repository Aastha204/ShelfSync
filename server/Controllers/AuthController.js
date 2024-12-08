const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken')
const UserModel = require("../Models/User");
const nodemailer = require('nodemailer');
const crypto = require('crypto');


const signup = async(req,res)=>{
   try{
    const {name,email,password}=req.body;
    const user = await UserModel.findOne({email})
    if(user){
        return res.status(409).json({message:"User is already exist, you can login",success:false})
    }
    const userModel = new UserModel({name,email,password})
    const isLogin=false;
    userModel.password = await bcrypt.hash(password,10)
    await userModel.save()
    await sendOtp(email, name,isLogin);
    res.status(201).json({message:"Signup successflly",success:true})
   }catch(err){
    res.status(500).json({message:"Internal server error",success:false})
   }
}

// const signup = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // Check if the user already exists
//     const user = await UserModel.findOne({ email });
//     if (user) {
//       return res.status(409).json({ message: "User already exists, you can login.", success: false });
//     }

//     // Create a new user
//     const newUser = new UserModel({ name, email });
//     newUser.password = await bcrypt.hash(password, 10);
//     await newUser.save();

//     await sendOtp(email, name);

//     // Configure nodemailer
//     const transporter = nodemailer.createTransport({
//       service: 'Gmail', // Use your email service
//       auth: {
//         user: process.env.EMAIL_USER, // Environment variable for sender email
//         pass: process.env.EMAIL_PASS, // Environment variable for sender email password
//       },
//     });

//     // Compose the confirmation email
//     // const mailOptions = {
//     //   from: '"ShelfSync" <' + process.env.EMAIL_USER + '>',
//     //   to: email, // Receiver email
//     //   subject: 'Signup Successful!',
//     //   html: `
//     //     <h1>Welcome to ShelfSync, ${name}!</h1>
//     //     <p>Your account has been successfully created. Please <a href="http://localhost:3000/login">login</a> to continue.</p>
//     //   `,
//     // };

//     // Send the email
//     // transporter.sendMail(mailOptions, (error, info) => {
//     //   if (error) {
//     //     console.error('Error sending confirmation email:', error);
//     //     return res.status(500).json({ message: 'Signup successful, but failed to send confirmation email.', success: false });
//     //   } else {
//     //     console.log('Confirmation email sent:', info.response);
//     //   }
//     // });

//     res.status(201).json({ message: "Signup successful.", success: true });
//   } catch (err) {
//     console.error('Error during signup:', err);
//     res.status(500).json({ message: "Internal server error.", success: false });
//   }
// };


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
 let otps = {}; // Ensure otps object exists globally

 const sendOtp = async (email, name, isLogin) => {
  try {
    if (isLogin) {
      // Check if the provided email and name exist in the database
      const user = await UserModel.findOne({ email});

      if (!user) {
        console.log("User not found in database for login.");
        return { success: false, message: "User not found. Please check your credentials." }; // Stop execution here
      }

      console.log("User exists for login:", user);
    }

    // Handle OTP sending logic (for registration verification, etc.)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP with expiry logic
    otps[email] = { otp, expires: Date.now() + 600000 };

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"ShelfSync" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Verify Your Email - OTP',
      html: `
        <h1>Welcome to ShelfSync, ${name}!</h1>
        <p>Your OTP is: <strong>${otp}</strong></p>
        <p>This OTP is valid for 10 minutes.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("OTP sent successfully to:", email);

    return { success: true, message: "OTP sent successfully." };
  } catch (error) {
    console.error("Error in sendOtp function:", error);
    return { success: false, message: "Error sending OTP." };
  }
};


const verifyOtp = (req, res) => {
  const { otp, email, name, isLogin } = req.body;  // Added isLogin flag

  const storedOtp = otps[email];

  // Check if OTP exists and is valid
  if (!storedOtp || storedOtp.expires < Date.now()) {
    return res.status(400).json({ success: false, message: 'OTP has expired. Please request a new one.' });
  }

  if (storedOtp.otp !== otp) {
    return res.status(400).json({ success: false, message: 'Invalid OTP. Please try again.' });
  }

  // OTP verified successfully; delete it
  delete otps[email];

  // If the user is logging in via OTP, skip the confirmation email
  if (isLogin) {
    return res.status(200).json({ success: true, message: 'OTP verified successfully for login.' });
  }

  // Otherwise, send the confirmation email for signup
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"ShelfSync" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Signup Successful!',
    html: `
      <h1>Welcome to ShelfSync, ${name}!</h1>
      <p>Your account has been successfully created.</p>
    `,
  };

  // Send the confirmation email after OTP verification
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending confirmation email:', error);
      return res.status(500).json({ message: 'OTP verified, but failed to send confirmation email.', success: false });
    } else {
      console.log('Confirmation email sent:', info.response);
      return res.status(200).json({ success: true, message: 'OTP verified and confirmation email sent successfully.' });
    }
  });
};




const resendOtp = async (req, res) => {
  const { email, name } = req.body;

  try {
    await sendOtp(email, name);
    res.status(200).json({ success: true, message: 'OTP sent successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to send OTP. Please try again later.' });
  }
};

const updatePassword = async(req,res) => {
  const { email, currentPassword, newPassword } = req.body;

  try {
    // Find the user by email
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if current password matches the one in the database
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports={
    signup,
    login,verifyOtp, resendOtp, sendOtp, updatePassword
}