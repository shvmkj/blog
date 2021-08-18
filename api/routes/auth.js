const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = mongoose.model("User")
const jwt = require('jsonwebtoken')
const requireLogin = require('../middleware/RequireLogin')
const JWT_SECRET = "jdhfuidhfudhddsf"

router.post("/register",(req,res)=>{
  const {username,email,password} = req.body
  if(!username || !email || !password){
    return res.status(400).send({error:"Please enter all the fields"})
  }
  User.findOne({username})
  .then(savedUser=>{
    if(savedUser){
      return res.status(406).send({error:"Username already exist try different username"})
    }
    else{
      User.findOne({email}).then(savedUser=>{
        if(savedUser){
        return res.status(406).send({error:"Account associated with this email id alredy exist"})}
        bcrypt.hash(password,15).then(hashedpassword=>{
          const user = new User({
            email,
            username,
            password:hashedpassword
          })
          user.save().then(()=>{
            return res.status(201).json({message:"Account Creation Successfully"})
          })
        })
      }).catch(err=>{
        res.status(202).json({error:err})
      })
    }
  }).catch(err=>{
    res.status(202).json({error:err})
  })
})

router.post('/login',(req,res)=>{
  const {username,password}=req.body
  if(!username || !password){
    return res.status(400).json({error:"username or password doesn't match"})
  }
  User.findOne({username}).then((savedUser)=>{
    if(savedUser){
    bcrypt.compare(password,savedUser.password).then(result=>{
      if(!result){
        return res.status(400).json({error:"username or password doesn't match"})
      }else{
        const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
        const {_id,username,email} = savedUser
        return res.status(202).json({token,user:{_id,username,email}})
      }
    }).catch(err=>{
      return res.status(404).json({error:"Error from Our Side"})
    })}
    else{
      return res.status(400).json({error:"username or password doesn't match"})
    }
  })
})
module.exports = router