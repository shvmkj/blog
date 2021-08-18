const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const CategorySchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  }
})
module.exports =mongoose.model("Category",CategorySchema)