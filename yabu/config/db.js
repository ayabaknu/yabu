const mongoose=require('mongoose')
const keys= require('./keys')
const connectDb= async ()=>{
   try {
    await mongoose.connect(keys.ttkMongoURI,{
      useNewUrlParser:true,
      useCreateIndex:true,
      useFindAndModify:false
      
        })
    console.log('mongodb connected')
  } catch(err) {console.log(err.message)
    process.exit(1)
  }

}
module.exports= connectDb