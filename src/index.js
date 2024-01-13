const express = require('express');
const user = require('../schema/user')
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

mongoose.connect("mongodb://0.0.0.0:27017/usersDetails")
  .then(() => console.log("connected to db"))
  .catch((err) => console.log(err));

  app.use(bodyParser.json());

  app.post("/register", async(req,res)=>{
    const { email,password } = req.body;

    const newUser = new user({ email,password });
    await newUser.save();
    
    res.send(201)
    res.status(201)
})
app.post("/login",async(req,res)=>{
    const { email,password } = req.body;
   if(!email || !password )return res.send(400);
   
    const userDB = await user.findOne({email});
    
    if(userDB && password===userDB.password){
        res.status(200).json({message:'good request yess'});
        console.log('found')
    }else{
        res.send(400)
        console.log("not found")
    }
})

app.listen(4000, ()=>{console.log('server started on port 4000')})