const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const compression = require('compression');
const path = require('path');
const URL = require('./models/Url');
//AuthRoutes
const authRoute = require('./routes/auth');
const dummy = require('./routes/dummy');


//URL Routes
const shorten = require('./routes/shorten');

const app = express();

app.use(compression());
app.use(cors());

//connect to DB
dotenv.config();

if (process.env.NODE_ENV === "production") {
    app.use(express.static("build"));
    app.use((req, res, next) => {
      if (req.header("x-forwarded-proto") !== "https") {
        res.redirect(`https://${req.header("host")}${req.url}`);
      } else {
        next();
      }
    });
    app.use(express.static("client/build"));
}

mongoose.connect(process.env.MONGO_URI || process.env.DB_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>console.log('Mongodb connected'))
.catch(err=>console.log('Error:', err))
//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

app.use('/api/user',authRoute);
app.use('/api/dummy',dummy);

//URL work
app.use('/api/shorten', shorten);

//redirect
app.get('/:hash',(req,res)=>{
    console.log(req.params)
    const hashed = req.params.hash;
    URL.findOne({hash:hashed},(err,doc)=>{
        if(doc){
            console.log(doc.url);
            res.redirect('https://'+doc.url)
        }else{
            res.redirect('/')
        }
    })
})

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    app.get('*', ()=> () =>{
        res.sendFile(
            path.join(__dir,'client','build','index.html')
        );
    });
}


const Port = process.env.PORT || 5000
module.exports = app.listen(Port, ()=>console.log('Server up and running'));

