const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken')
const AdminModel = require("../Models/Admin");

const signup = async(req,res)=>{
   try{
    const {name,email,password}=req.body;
    const admin = await AdminModel.findOne({email})
    if(admin){
        return res.status(409).json({message:"Admin is already exist, you can login",success:false})
    }
    const adminModel = new AdminModel({name,email,password})
    adminModel.password = await bcrypt.hash(password,10)
    await adminModel.save()
    res.status(201).json({message:"Signup successflly",success:true})
   }catch(err){
    res.status(500).json({message:"Internal server error",success:false})
   }
}

const login = async(req,res)=>{
    try{
     const {email,password}=req.body;
     const admin = await AdminModel.findOne({email})
     const errorMsg="Auth failed email or password is wrong"
     if(!admin){
         return res.status(403).json({message:errorMsg,success:false})
     }
    const isPassEqual = await bcrypt.compare(password,admin.password)
    if(!isPassEqual){
        return res.status(403).json({message:errorMsg,success:false})
    }
    const jwtToken = jwt.sign(
        {email:admin.email,_id:admin._id},
        process.env.JWT_SECRET,
        {expiresIn:'24h'}
    )
     res.status(200).json({message:"Login successflly",
        success:true,
        jwtToken,
        email,
        name:admin.name
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