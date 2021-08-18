const jwt = require("jsonwebtoken")
const mongoose = require('mongoose')
const User = mongoose.model("User")
const dotenv = require('dotenv')
dotenv.config()
module.exports = (req,res,next)=>{
  const {authorization}=req.headers
  if(!authorization){
    return res.status(422).json({error:"You must be logged in to perform this action"})
  }
  const token = authorization.replace("Bearer ","")
  jwt.verify(token,process.env.JWT_SECRET,(err,payload)=>{
    if(err){      
      return res.status(422).json({error:"You must be logged in to perform this action"})
    }
    const {_id} = payload
    User.findById(_id).then(userdata=>{
      req.user = userdata,
      next()
    })
  })
}