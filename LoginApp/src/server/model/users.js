const mongoose = require('../module/Connection')
//const Notification = require('./Notification')

const UserSchema = new mongoose.Schema({
    fname:{type: String, required: true},
	lname:{type: String, required: true},
	email:{type: String, required: true},
   	password:{type: String, required: true},
	phone:{type: String, required: true},
	gender:{type: String, required: true},
	dob:{type: String, required: true},
	friends:{type: [String], required: false}
	//notification:{type: [Notification], required: false}
})

const User = mongoose.model('User',UserSchema)
module.exports = User
