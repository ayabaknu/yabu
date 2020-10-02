const express=require('express')
const connectDb=require('./config/db')
const cors=require('cors')
const path= require('path')
const compression = require('compression');
const app=express();
connectDb();
app.use(compression());
app.use(cors());
app.use(express.json({extended:false}));
// this helps us to use bodyparser of express

app.use('/api/users',require('./routes/users'));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/contacts',require('./routes/contacts'));

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'));
  app.get('*',(req,res) => res.sendFile(path.resolve(__dirname,'client','build','index.html')))
}

const PORT = process.env.PORT || 4000
app.listen(PORT)
// app.listen(PORT, ()=>console.log(`listening to port ${PORT}`));


