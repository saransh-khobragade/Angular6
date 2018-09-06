const express = require('express')
const bodyparser = require('body-parser')
const app = express()
const mongoose = require('mongoose')
const session = require('express-session')
const multer = require('multer')

const storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, './uploads/');
	},
	filename: function(req, file, callback){
		callback(null, file.originalname)
	}
})

const filter = (req, file, callback) => {
	if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
		callback(null, true)
	}else{
		callback('File type not supported', false)
	}
}

const upload = multer({
	storage: storage,
	limits: {
		fileSize: 1024 * 1024 * 5
	},
	fileFilter: filter
})

app.use(session({
    secret: 'ksjldklahshjsljksjkxshjchosjckspcgusjvghhdafhjsbjknsldjl',
    saveUninitialized:true,
    resave:false
}))

mongoose.Promise = Promise
mongoose.connect('mongodb://localhost:27017/Angular6', { useNewUrlParser: true })
.then(()=>console.log('Mongoose up'))

const User = require('./model/users')
const ProfilePicture = require('./model/profilepicture')

app.use(bodyparser.json())


//--------------------------------------------Api------------------------------------------------------------//


app.post('/api/login',async (req,res)=>{		//login API
    const{email,password}=req.body
    const result = await User.findOne({email,password})
    if(!result){
        return res.status(500).json({message:'Email/Password incorrect'})
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
        return res.status(500).json({message:'user was deleted'})
    }
    res.json({email:req.session.user})
})

app.get('/api/isUserExist', async (req, res) =>{		//register API(create user)
	User.findOne({email:req.query.email},(function (err, result) {
		if (err) {
			return res.status(500).json({success:false,message: 'Something went wrong'})
		} 
		else if(result){
			return res.json({success:true,message: 'User already exists'})
		}
		return res.json({success:false,message: 'User doesn\'t exists'})
	}))
    
})

app.post('/api/user', async (req, res) =>{		//register API(create user)
	const{fname, lname, email, password, phone, gender, dob} = req.body
	const result = await User.findOne({email})
    if(result){
        return res.status(400).json({message: 'User already exists'})
    }

	const user = new User({fname, lname, email, password, phone, gender, dob})
	user.save(function (err) {  
        if (err) {  
            return res.status(500).json({message:'Something went wrong'})  
        }  
        return res.json({message:'Registration successful'})  
    })
})

app.get('/api/getAllUsers', async (req, res)=>{			// get all users
	User.find({}, function (err, users) {
		if(err) {
			return res.status(500).json({message: 'Something went wrong'})
		}
		return res.json(users)		
	}).select('fname lname email phone gender dob')
})

app.get('/api/user', async (req, res)=>{			// get user with id
	User.findOne({email:req.query.email}, function (err, user) {
		if(err) {
			return res.status(500).json({message: 'Something went wrong'})
		}
		else if(!user){
			return res.status(404).json({message: 'User not found'})
		}
		return res.json(user)		
	}).select('fname lname email phone gender dob')
})

app.put('/api/user', async (req, res)=>{			// update user details
	User.findOne({email:req.query.email}, function(err, user) {
		if(err){
			return res.status(500).json({message:'Something went wrong'})
		}
		else if(!user){
			return res.status(404).json({message: 'User not found'})
		}
		user.fname = req.body.fname
		user.lname = req.body.lname
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

app.delete('/api/user',async (req,res)=>{		//delete user
    User.deleteOne({ email:req.query.email }, function (err) {  
        if (err) {  
            return res.status(500).json({message:'Something went wrong'})  
        }  
        return res.json({message: 'Successfully deleted' });  
    })  
})

app.post('/api/profile/image', upload.single('profilePicture'), async (req, res)=> {
	const email = req.session.email
	User.findOne({email}, function(err, user) {		
		if(err){
			return res.status(500).json({message:'Something went wrong'})
		}
		else if(!user){
			return res.status(404).json({message: 'User not found'})
		}
		const dp = new ProfilePicture({email, path: req.file.destination+req.file.filename})
		dp.save(function(err){
		if(err)
			return res.status(500).json({message:'Something went wrong'})
		return res.json({message: 'Profile picture saved successfully'})
		})
	})
})

app.post('/api/logout',(req,res)=>{
	console.log(req.session)
	//req.session.destroy()
	res.json({
		success:true
	})
})

app.listen(1234,()=>console.log('server listening at 1234'))