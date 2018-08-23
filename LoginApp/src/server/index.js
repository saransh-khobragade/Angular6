const express = require('express')
const bodyparser = require('body-parser')
const app = express()
const mongoose = require('mongoose')
const session = require('express-session')

app.use(session({
    secret: 'ksjldklahshjsljksjkxshjchosjckspcgusjvghhdafhjsbjknsldjl',
    saveUninitialized:true,
    resave:false
}))

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

        req.session.user = email
        req.session.save()
    }
})

app.get('/api/profile',async (req,res)=>{
    
    const user = await User.findOne({email:req.session.user})

    if(!user){
        res.json({
            success:false,
            message:'user was deleted'
        })
        return
    }
    res.json({
        success:true,
        email:req.session.user
    })
    //res.send('user is '+ req.session.user)
    //console.log(req.session)
})

app.get('/api/isUserLoggedIn',(req,res)=>{
    res.json({
        status:!!req.session.user
        //status: req.session.user?true:false
    })
})

app.listen(1234,()=>console.log('server listening at 1234'))