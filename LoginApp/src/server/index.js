const express = require('express')
const bodyparser = require('body-parser')
const app = express()
const mongoose = require('mongoose')

mongoose.Promise = Promise
mongoose.connect('mongodb://localhost:27017/Angular6')
.then(()=>console.log('Mongoose up'))

const User = require('./model/users')

app.use(bodyparser.json())

app.post('/api/register',async (req,res)=>{
    const{email,password}=req.body

    /* const user = new User({email,password})
    const result = await user.save()
    console.log(result) */
    console.log(email,password)

    const resp = await User.findOne({email,password})
    if(!resp){
        res.json({
            success:false,
            message:"Incorrect details"
        })
    }
    else
    {
        res.json({
            success:true,
            message:"Correct details"
        })
    }
})

app.listen(1234,()=>console.log('server listening at 1234'))