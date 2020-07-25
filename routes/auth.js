const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');  
const jwt = require('jsonwebtoken');

router.post('/signup', (req,res)=>{
    User.findOne({email:req.body.email},async(error,doc)=>{
        if(doc)
        return res.send('Email already exists');

        //Hash Passwords
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password,salt);
        const user = new User({
            name:req.body.name,
            email:req.body.email,
            password:hashedPassword
        })
        user.save()
        .then((resp)=>{
            console.log(resp);
        }).catch((err)=>res.status(400).send(err))
        res.send(user);
    })
    
})
router.post('/signin',(req,res)=>{
    User.findOne({email:req.body.email},async (err,doc)=>{
        console.log('doc', doc)
        if(!doc){
            return res.send({error:'Email not registered!',user:null,token:null});//{user,error}
        }
        const checkPassword = await bcrypt.compare(req.body.password,doc.password)
        if(!checkPassword){
            return res.send({error:'Password is incorrect!',user:null,token:null});
        }
        //token
        const token = jwt.sign({_id: doc._id}, process.env.TOKEN_SECRET)
        res.header('auth-token',token).send({error:null,user:doc,token:token})//user data error null
    })
})

module.exports = router;