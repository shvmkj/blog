const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const PostSchema = new mongoose.Schema({
  "username" : {
    type:String,
    required:true,
    ref:"User"
  },
  "title":{
    type : "String",
    required:true
  },
  "body":{
    type : "String",
    required:true
  },
  "photo":{
    type:"String",
    default:""
  }
  ,
  "likes":[{type:ObjectId,ref:"User"}],
  "categories":{
    type:Array,
  }
},{"timestamps":true})
module.exports =mongoose.model("Posts",PostSchema)