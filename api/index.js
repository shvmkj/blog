const express = require('express')
const app = express()
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const multer = require("multer")
dotenv.config()
app.use(express.urlencoded({extended:true}))
app.use(express.json())

require('./models/user')
require('./models/posts')
require('./models/category')
mongoose.connect(process.env.MONGO_URL,{
  useNewUrlParser:true,
  useUnifiedTopology:true,
  useCreateIndex:true,
}).then(()=>console.log("connected"))
.catch((err)=>{
  console.log(err)
})
const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
  cb(null,"images")
},filename:(req,file,cb)=>{
  cb(null,"hello.jpeg")
},
})
const upload = multer({storage:storage})
app.post("/api/upload",upload.single("file"),(req,res)=>{
  res.status(200).json({message:"File has been uploaded"})
})
app.use("/api/auth",require('./routes/auth'))
app.use("/api/users",require('./routes/user'))
app.use("/api/posts",require('./routes/posts'))
app.use("/api/category",require('./routes/categories'))
app.listen(5002,()=>{
  console.log("server is running on http://localhost:5002 ")
})