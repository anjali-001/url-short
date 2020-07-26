const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');  
const jwt = require('jsonwebtoken');

router.post('/signup', (req,res)=>{
    User.findOne({email:req.body.email},async(error,doc)=>{
        if(doc)
        return res.send({error:'Email already exists! Signin instead.',user:null,token:null});

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
            const token = jwt.sign({_id: resp._id}, process.env.TOKEN_SECRET)
            console.log(resp);
            res.send({user:resp,token:token,error:null})
        }).catch((err)=>res.status(400).send(err))
        
    })
    
})
router.post('/signin',(req,res)=>{
    User.findOne({email:req.body.email},async (err,doc)=>{
        console.log('doc', doc)
        if(!doc){
            return res.send({error:'Email not registered! Signup first',user:null,token:null});//{user,error}
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