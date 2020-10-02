const express=require('express')
const router = express.Router();
const bcrypt= require('bcryptjs')
const jwt=require('jsonwebtoken')
const keys= require('../config/keys')
const { check, validationResult } = require('express-validator/check');
const User= require('../model/user')
const auth=require('../middleware/auth')

// private
router.get('/',auth,async (req,res)=>{
  try{
    const user= await User.findById(req.user.id).select('-password')
    res.json(user)
  }catch(err){
     console.error(err.message)
     res.status(500).send('server errorr')
  }
})

// public
router.post('/',[
  check('email','please add email').isEmail(),
  check('password','password is required').exists()
],

async (req,res)=>{
  const errors= validationResult(req)
  if(!errors.isEmpty()){
     return res.status(400).json({error:errors.array()})
  }
  const {email,password}=req.body
  try{
    let user= await User.findOne({email})   // the same with email:email
    if(!user){
      return res.status(400).json({message:'invalid credentials'})
    }
     const isMatch= await bcrypt.compare(password,user.password)
    //  console.log(isMatch)
   if(!isMatch){
     return res.status(400).json({message:'invalid credentials. doesnt match'})
   }

   const payload = {
    user:{
      id:user.id
    }
  }
  jwt.sign(payload,keys.jwtSecret,{expiresIn:36000},(err,token)=>{
    if(err) throw err
    res.json({token})
  })

  } catch(err){
    res.status(500).send('server error')
    console.log(err.message)
  }})





module.exports= router;