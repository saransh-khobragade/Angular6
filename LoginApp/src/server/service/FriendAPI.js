const User = require('../model/Users')
const Notification = require('../model/Notification')
//const lodash = require('lodash')

exports.invite = async (req, res) => {
	const{email,friend}=req.body
	console.log(req.session[email])
	if(!req.session[email])
		 return res.json({success: false, message:'User not logged in'})
//	User.findOne({email}, function(err, user){
//		if (err) {  
//				return res.json({success: false, message:'Something went wrong'})  
//			} 
//		console.log(user.friends)
//		if(user.friends){
//			console.log(user.friends)
//			console.log(lodash.filter(user.friends, friend))
//			if(user.friends.find(friend))
//				return res.json({success: false, message:'Already friends'})
//		}
//	})
	
	const entry = new Notification({type: 'invite', creater: email, receiver: friend})
	entry.save(function (err) {  
        if (err) {  
            return res.json({success: false, message:'Something went wrong'})  
        }  
        return res.json({success: true, message:'Friend request sent'})  
    })
	//event trigger
};

exports.reject = async (req, res) => {
	const{email,friend}=req.body
	Notification.deleteOne({type: 'invite', creater: email, receiver: friend}, function(err){
		if (err) {  
            return res.json({success: false, message:'Something went wrong'})  
        }  
        return res.json({success: true, message:'Friend request deleted'}) 
	})
};

exports.accept = async (req, res) => {
	const{email,friend}=req.body
	
	Notification.deleteOne({type: 'invite', creater: email, receiver: friend}, function(err){
		if (err) {  
            return res.json({success: false, message:'Something went wrong'})  
        }  
        User.updateOne({ email }, { $push: { friends: friend } }, function(err){
			if(err){
				return res.json({success: false, message:'Friend couldn\'t be added'})  
			}
			User.updateOne({ email: friend }, { $push: { friends: email } }, function(err){
				if(err){
					return res.json({success: false, message:'Friend couldn\'t be added'})  
				}
			});
		});
		return res.json({success: true, message:'Friend request Accepted'}) 
	})
};

exports.unFriend = async (req, res) => {
	const email = req.query.email
	const friend = req.query.friend
	 User.updateOne({ email }, { $pull: { friends: friend } }, function(err){
		if (err) {  
            return res.json({success: false, message:'Something went wrong1'})  
        }  
		User.updateOne({ email: friend }, { $pull: { friends: email } }, function(err){
			if (err) {  
				return res.json({success: false, message:'Something went wrong2'})  
			}  
		})
		return res.json({success: true, message:'Unfriend successfully'})
	})
};

exports.getAllFriends = async (req, res) => {
	User.findOne({email: req.query.email}, function(err, user){
		if (err) {  
				return res.json({success: false, message:'Something went wrong'})  
			} 
		return res.json(user.friends)
	})
};

exports.getRecommendedFriends = async (req, res) => {
	const email = req.query.email
	if(email == null || email == "")
		return res.json({success: false, message:'Please send email as query param'})  
	var users = [];
	var friends = [];
	User.find().stream()
		.on('data', function(user){
			users.push(user.email) 
		})
		.on('error', function(err){
			res.json({success: false, message:'Something went wrong'})  
		})
		.on('end', function(){
			User.findOne({email}, function(err, user){
				if (err) {  
					return res.json({success: false, message:'Something went wrong'})  
				} else if(!user) {
					return res.json({success: false, message:'User doesnt exist'})  
				}
				friends = user.friends
				friends.push(email)
			})
			Notification.find({creater:email}).stream()
				.on('data', function(notf){
					console.log(notf.receiver)
					friends.push(notf.receiver) 
				})
				.on('error', function(err){
					res.json({success: false, message:'Something went wrong'})  
				})
				.on('end', function(){
					res.json(users.filter(x => !friends.includes(x)));
				})
		});
};
