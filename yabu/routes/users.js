const express=require('express')
const bcrypt= require('bcryptjs')
const jwt=require('jsonwebtoken')
const keys= require('../config/keys')
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const User= require('../model/user')


router.post('/',[
  check('name','please add name').not().isEmpty(),
  check('email','please add email').isEmail(),
  check('password','minimum length is 6').isLength({min:6})
],
async (req,res)=>{
  const errors= validationResult(req)
  if(!errors.isEmpty()){
     return res.status(400).json({error:errors.array()})
  }
  const {name,email,password}=req.body
  try{
    let user= await User.findOne({email})   // the same with email:emil
    if(user){
      return res.status(400).json({message:'user already existed'})
    }

    user= new User({
      name,
      email,
      password
    })
    const salt = await bcrypt.genSalt(10)
    user.password= await bcrypt.hash(password,salt)
    await user.save()
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
    res.status(500).send('not saved')
    console.log(err.message)
  }
})

module.exports= router