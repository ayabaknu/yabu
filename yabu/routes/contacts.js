const express=require('express')
const router = express.Router();
const auth= require('../middleware/auth')
const { check, validationResult } = require('express-validator/check');
const User= require('../model/user')
const Contact= require('../model/contact')




// private
router.get('/',auth, async (req,res)=>{
  try{
    const contact = await Contact.find({user:req.user.id}).sort({data:-1}) // -1 means the recent one
     res.json(contact)
  }catch(err){
     res.status(500).send('server error')
  }
  
})

// private
router.post('/',[auth,[
  check('name','name is required').not().isEmpty()
]], async (req,res)=>{
  const errors= validationResult(req)
  if(!errors.isEmpty()){
     return res.status(400).json({error:errors.array()})
  }
  const {name,email,phone,type}=req.body;
  try{
   const newContact= new Contact({
     name,
     email,
     phone,
     type,
     user:req.user.id
   })
   const contact= await newContact.save()
   res.json(contact)
  }catch(err){
    console.log(err.message)
    res.status(500).send('server error')
  }
})

// private
router.put('/:id',auth,async (req,res)=>{
const {name,email,phone,type}= req.body
const contactFields={}
if(name) contactFields.name= name;
if(email) contactFields.email= email;
if(phone) contactFields.phone= phone;
if(type) contactFields.type= type;
try{
  let contact = await Contact.findById(req.params.id)
  if(!contact) return res.status(404).send('contact not found')
  if(contact.user.toString() !== req.user.id){
    return res.status(401).json({message:'not authorized'})
  }
  contact = await Contact.findByIdAndUpdate(req.params.id, 
    {$set:contactFields},{new:true})
    res.json(contact)
} catch(err){
  console.log(err.message)
  res.status(500).send('server error')
}
})

router.delete('/:id',auth, async(req,res)=>{
  try{
    let contact = await Contact.findById(req.params.id)
    if(!contact) return res.status(404).send('contact not found')
    if(contact.user.toString() !== req.user.id){
      return res.status(401).json({message:'not authorized'})
    }
    await Contact.findByIdAndRemove(req.params.id) 
      res.json('contact removed')
      
  } catch(err){
    console.log(err.message)
    res.status(500).send('server error')
  }

})



module.exports= router
//  crud  create read update and delete