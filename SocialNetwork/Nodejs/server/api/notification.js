const User = require('../model/Users')
const express = require('express')
const router = express.Router();


/* const Notification = require('../model/Notification')
const db = require('../module/MongoDBMethods')
const User = require('../model/Users')

exports.inviteNotification =  async (req,res)=>{
    const email = req.query.email
    if(email==="") res.json({success: false, message:'Got blank email for invites'})

    let invites= await db.FindWithKeys(Notification,[{type:"invite"},{ "receiver.email": email}])   
    console.log(invites)
    
    let result=[]
    for(let a of invites){
        result.push(a.creater)
    };
    res.json(result)
}; */

module.exports = router;