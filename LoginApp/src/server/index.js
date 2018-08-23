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

app.post('/api/login',async (req,res)=>{		//login API
    const{email,password}=req.body
    const result = await User.findOne({email,password})
    if(!result){
        return res.status(404).json({message:'Email/Password incorrect'})
    }
	res.json({message:'Login Success'})
    req.session.user = email
    req.session.save()
})

app.get('/api/isUserLoggedIn',(req,res)=>{
    res.json({
        status:!!req.session.user
        //status: req.session.user?true:false
    })
})

app.get('/api/profile',async (req,res)=>{
    const user = await User.findOne({email:req.session.user})
    if(!user){
        return res.status(400).json({
            success:false,
            message:'user was deleted'
        })
    }
    res.json({
        success:true,
        email:req.session.user
    })
})

app.post('/api/user', async (req, res) =>{		//register API(create user)
	const{name, email, password, phone, gender, dob} = req.body
	const result = await User.findOne({email})
    if(result){
        return res.status(400).json({message: 'User already exists'})
    }

	const user = new User({name, email, password, phone, gender, dob})
	user.save(function (err) {  
        if (err) {  
            return res.status(500).json({message:'Something went wrong'})  
        }  
        return res.json({message:'Registration successful'})  
    })
})

app.get('/api/getAllUsers', async (req, res)=>{			// get all users
	User.find(function (err, users) {
		if(err) {
			return res.status(500).json({message: 'Something went wrong'})
		}
		return res.json(users)		//this returns password as well? do we need to return password?
	})
})

app.get('/api/user/:email', async (req, res)=>{			// get user with id
	User.findOne({email:req.params.email}, function (err, user) {
		if(err) {
			return res.status(500).json({message: 'Something went wrong'})
		}
		else if(!user){
			return res.status(404).json({message: 'User not found'})
		}
		return res.json(user)		//this returns password as well? do we need to return password?
	})
})

app.put('/api/user/:email', async (req, res)=>{			// update user details
	User.findOne({email:req.params.email}, function(err, user) {
		if(err){
			return res.status(500).json({message:'Something went wrong'})
		}
		else if(!user){
			return res.status(404).json({message: 'User not found'})
		}
		user.name = req.body.name
		user.password = req.body.password
		user.phone = req.body.phone
		user.gender = req.body.gender
		user.dob = req.body.dob
		user.save(function(err){
			if(err){
				return res.status(500).json({message:'Something went wrong'})
			}
			return res.json({message:'User details updated successfully'})
		})
	})
})

app.delete('/api/user/:email',async (req,res)=>{		//delete user
    User.remove({ email:req.params.email }, function (err) {  
        if (err) {  
            return res.status(500).json({message:'Something went wrong'})  
        }  
        return res.json({ message: 'Successfully deleted' });  
    })  
})

app.listen(1234,()=>console.log('server listening at 1234'))