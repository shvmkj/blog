const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const requireLogin = require('../middleware/RequireLogin')
const Posts = mongoose.model("Posts")
const Category = mongoose.model("Category")
router.post("/",requireLogin,(req,res)=>{
      const newCat = new Category(req.body)
      newCat.save().then(()=>{
        return res.status(200).json({category : newCat})
      }).catch(error=>{
        return res.status(500).json({error})
      })
    })
    router.get("/",(req,res)=>{
      Category.find({})
      .then((result)=>{
        return res.status(200).json({category : result})
      }).catch(error=>{
        return res.status(500).json({error})
      })
    })
    module.exports = router 