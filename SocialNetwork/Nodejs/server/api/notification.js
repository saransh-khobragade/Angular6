const express = require('express')
const router = express.Router();

const User = require('../model/Users')
const Notification = require('../model/Notification')

router.get('/getInvites',async (req,res)=>{
    const email = req.query.email

    if(!email){
        return res.json({success: false, message:'Got blank email for invites'})
    }
    else{
        Notification.find({$and:[{type:"invite"},{ "receiver.email": email}]},(err,re)=>{
            if(re.length!==0){
                
                let result=[]
                for(let a of re){
                    result.push(a.creater)
                };
                return res.json(result)
            }
            else return res.json({success: false, message:'notification : empty notification'})
        }).select("creater")
    }    
});

module.exports = router;