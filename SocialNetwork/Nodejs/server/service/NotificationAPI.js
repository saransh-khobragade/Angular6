const Notification = require('../model/Notification')
const db = require('../module/MongoDBMethods')
const User = require('../model/Users')

exports.inviteNotification =  async (req,res)=>{
    const email = req.query.email
    let invites= await db.FindWithKeys(Notification,[{type:"invite"},{ receiver: email}],"creater")   
    let result=[]
    for(let element of invites){

        let fisrtname= await db.FindWithKeys(User,[{email:element.creater}],"fname")
        result.push({name:fisrtname[0].fname,email:element.creater})

    };
    res.json(result)
};

