const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const Posts = mongoose.model("Posts")
const requireLogin = require('../middleware/RequireLogin')
//CREATE POST 
router.post("/createpost",requireLogin,(req,res)=>{
  if(!req.user){
    return res.status(401).json({message : "Login Required to perform this task"})
  }else{
    {
      let newPost = new Posts(req.body)
    newPost.username = req.user.username
    try{
        newPost.save().then((savedPost)=>{
          res.status(201).json({post:savedPost})
        })
    }catch(err){
      res.status(500).json({error : err})
    }}
  }
})
// GET ALL POST
router.get('/',(req,res)=>{
  
  let catName = req.query.cat
  console.log(catName)
  let username = req.query.username
  console.log(username)
  if(catName){
    Posts.find({categories : {$in: [catName]}})
    .then(result=>{
      return res.status(300).json({posts:result})
    })
    .catch(err=>{
      return res.status(404).json({posts:err})
    })
  }else if(username){
      Posts.find({username})
    .then(result=>{
      return res.status(300).json({posts:result})
    })
    .catch(err=>{
      return res.status(404).json({posts:err})
    })
  }else{
    Posts.find({}).then(result=>{
      return res.status(300).json({posts:result})
    })
    .catch(err=>{
      return res.status(404).json({posts:err})
    })
  }
})
//GET ALL POST BY USER
router.get('/:username',(req,res)=>{
  Posts.find({username:req.params.username}).then(result=>{
    console.log(result)
    return res.status(300).json({posts:result})
  })
  .catch(err=>{
    return res.status(404).json({posts:result})
  })
})
//DELETE POST WITH GIVEN ID
router.delete('/:postid/delete',requireLogin,(req,res)=>{
    if(!req.user){
          return res.status(401).json({message : "Login Required to perform this task"})
        }      
        Posts.findById({_id:req.params.postid})
        .then(result=>{
          if(!result){
            return res.status(401).json({message : "No Such post exist"})
          }
          if(result.username===req.user.username){
            result.delete().then(response=>{
              return res.status(200).json({message : "Post Deleted"})
          })
        }
      })
.catch(err=>{
  return res.status(404).json({error:"can't delete post that doesn't exist"})
})
})
      //GET POST WITH GIVEN ID
      router.get('/post/:id',(req,res)=>{
        Posts.findOne({"_id":req.params.id}).then(result=>{   
          return res.status(302).json({"post":result})
        }).catch(err=>{
          res.status(404).json({"error":"post not found"})
        })
      })
//UPDATE DATA
        router.put('/:id',requireLogin,(req,res)=>{
          if(!req.user){
                return res.status(401).json({message : "Login Required to perform this task"})
              }
              Posts.findById({_id:req.params.id}).then(response=>{
                if(response.username===req.user.username){
                  Posts.findByIdAndUpdate({_id:req.params.id},{$set:req.body},{new:true},(err,result)=>{
                    if(err){
                      return res.status(401).json({Error : "Error from our side"})
                    }else{
                      return res.status(202).json({"post":result})
                    }
                  })
                }else{
                  return res.status(401).json({Error : "You are not authenticated to modify this"})
                }
              }).catch(err=>{
                return res.status(401).json({Error : "Post doesn't exist"})
          })
        
      })
      module.exports = router