const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const URL = require('./models/Url');
//AuthRoutes
const authRoute = require('./routes/auth');
const dummy = require('./routes/dummy');


//URL Routes
const shorten = require('./routes/shorten');

const app = express();

app.use(cors());

//connect to DB
dotenv.config();
mongoose.connect(process.env.DB_CONNECT)
.then(()=>console.log('Mongodb connected'))
.catch(err=>console.log('Error:', err))
//Middleware
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
app.use('/api/user',authRoute);
app.use('/api/dummy',dummy);

//URL work
app.use('/api/shorten', shorten);

//redirect
app.get('/:hash',(req,res)=>{
    const hashed = req.params.hash;
    URL.findOne({hash:hashed},(err,doc)=>{
        if(doc){
            console.log(doc.url);
            res.redirect('https://'+ doc.url)
        }else{
            res.redirect('/')
        }
    })
})



app.listen(5000, ()=>console.log('Server up and running'));

