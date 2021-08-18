const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const UserSchema = new mongoose.Schema({
  username : {
    type:String,
    required:true,
    unique :true
  },
  email : {
    type:String,
    required:true,
    unique:true
  },
  password :{
    type:String,
    required:true
  },
  profilePic : {
    type:String,
    default:""
  },
  likes:[{type:ObjectId,ref:"User"}],
  following:[{type:ObjectId,ref:"User"}],
  followers:[{type:ObjectId,ref:"User"}],
})
mongoose.model("User",UserSchema)