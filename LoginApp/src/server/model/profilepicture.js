const mongoose = require('mongoose')

const ProfilePictureSchema = new mongoose.Schema({
	email:String,
    path:String
})

const ProfilePicture = mongoose.model('ProfilePicture', ProfilePictureSchema)
module.exports = ProfilePicture
