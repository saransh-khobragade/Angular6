const mongoose = require('../module/connection')

const ProfilePictureSchema = new mongoose.Schema({
	email:{type: String, required: true},
    path:{type: String, required: true}
})

const ProfilePicture = mongoose.model('ProfilePicture', ProfilePictureSchema)
module.exports = ProfilePicture
