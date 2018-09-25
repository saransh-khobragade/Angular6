const mongoose = require('../module/Connection')

const NotificationSchema = new mongoose.Schema({
    type:{type: String, required: true},
	creater:{type: String, required: true},
	receiver:{type: String, required: true},
   	time:{type : Date, default: Date.now}
})

const Notification = mongoose.model('Notification', NotificationSchema)
module.exports =  Notification
