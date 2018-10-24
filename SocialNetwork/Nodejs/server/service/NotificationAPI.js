const Notification = require('../model/Notification')
const db = require('../module/MongoDBMethods')
const User = require('../model/Users')

exports.inviteNotification =  async (req,res)=>{
    const email = req.query.email
    let invites= await db.FindWithKeys(Notification,[{type:"invite"},{ "receiver.email": email}],"creater")   
    
    let result=[]
    for(let a of invites){
        result.push(a.creater)
    };
    res.json(result)
};

