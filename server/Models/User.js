const { required } = require('joi');
const mongoose=require('mongoose');
const Schema = mongoose.Schema;
 
const userSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    }
})

const userModel=mongoose.model('users',userSchema);
module.exports=userModel;

// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const userSchema = new Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     phoneNo: {
//         type: String,
//         default: ''
//     },
//     gender: {
//         type: String,
//         default: ''
//     },
//     address: {
//         type: String,
//         default: ''
//     },
//     dob: {
//         type: Date,
//         default: null
//     },
//     age: {
//         type: Number,
//         default: null
//     }
// });

// const UserModel = mongoose.model('users', userSchema);
// module.exports = UserModel;
