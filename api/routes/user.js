const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = mongoose.model("User")
const Posts = mongoose.model("Posts")
const jwt = require('jsonwebtoken')
const requireLogin = require('../middleware/RequireLogin')
const JWT_SECRET = "jdhfuidhfudhddsf"
//UPDATE USER
router.put("/update",requireLogin,(req,res)=>{
  if(!req.user){
    return res.status(401).json({message : "Login Required to perform this task"})
  }else{
       if(req.body.password){
         bcrypt.hash(req.body.newpassword,15).then(hashedPassword=>{
           req.body.password=hashedPassword
         })}
         User.findByIdAndUpdate(req.user._id,{$set:req.body},{new:true},(err,result)=>{
           if(err){
            return res.status(403).json({error:"account with this username or email already exist"})
           }else{
             return res.status(200).json({message:"updataed","user":result})
           }
         })}
        })
        //DELETE USER
router.delete('/delete',requireLogin,(req,res)=>{
    if(!req.user){
          return res.status(401).json({message : "Login Required to perform this task"})
      }else{
          Posts.deleteMany({username:req.user.username}).then(result=>{
          User.deleteOne({username:req.user.username}).then(result=>{
            console.log("user deleted", req.user.username)
            return res.status(400).json({message:"User Deleted"})
          })
      }).catch(err=>{
        return res.status(404).json({error:"can't delete user that doesn't exist"})
      })
    }
  })
router.get('/:id',(req,res)=>{
  User.findOne({"username":req.params.id}).select("-password").then(result=>{
    console.log(req.params.id)
    if(result){
      return res.status(302).json({"user":result})
    }else{
      res.status(404).json({"error":"user not found"})
    }
  })
})
module.exports = router