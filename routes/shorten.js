const router = require('express').Router();
const URL = require('../models/Url');
const uniqid = require('uniqid');
const verify = require('./verifyToken');
const User = require('../models/User');


// router.get('/',(req,res)=>{
//     res.json({msg:'API is working'});
// })

router.post('/', verify ,(req,res)=>{
    var hashed = req.body.hash || uniqid();
    URL.findOne({hash:req.body.hash},(err,doc)=>{
        if(doc){
            hashed = uniqid()
        }
        URL.findOne({url:req.body.url,userid:req.user._id},(err,doc)=>{
            if(doc){
                return res.send({message:'Url is already present', url:doc})
            }
            else{
        const url = new URL({
            hash:hashed,
            url:req.body.url,
            userid:req.user._id
        })
        url.save()
        .then((resp)=>{
            res.status(200).send(resp)
        })
        .catch(err=>res.status(400).send(err))
            }
        })
    })

    
    

    
});

router.get('/list', verify, (req,res)=>{
    URL.find({userid:req.user._id},(err,doc)=>{
    const arr=[];
        if(doc){
            doc.forEach(item=>arr.push(item._id))
            res.send(arr)
        }
    })
})

router.delete('/delete',verify,(req,res)=>{
    URL.findByIdAndRemove({_id:req.body._id})
    .then((resp)=>{
       if(resp){
           res.status(200).send(resp.url+' deleted')
       } 
       else {
            res.send('URL not found');
       }
    }).catch(err=>console.log(err))
})


module.exports = router;