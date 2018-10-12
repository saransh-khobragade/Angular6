const User = require('../model/Users')
const Notification = require('../model/Notification')

function filterUser(data,data2){
    var filter = [];
	for(var i=0; i<data.length; i++){
		if(data2.indexOf(data[i].email)<0)
			filter.push(data[i]);
		}
   return filter;
}

exports.invite = async (req, res) => {
	const{email,friend}=req.body
	if(email != friend && email != null && email != "" && friend != null && friend != "") {
		User.findOne({email:friend}, function(err, user){
			if (err) {  
					return res.json({success: false, message:'Something went wrong'})  
			} if(!user){
				return res.json({success: false, message:'Friend id is wrong'})
			}
			User.findOne({email}, function(err, user){
				if (err) {  
						return res.json({success: false, message:'Something went wrong'})  
				} if(user){
					if(user.friends.indexOf(friend)>=0){
						return res.json({success: false, message:'Already friends'})
					} else {
						Notification.findOne({type: 'invite', creater: email, receiver: friend}, function(err, notf){
							if (err) {  
								return res.json({success: false, message:'Something went wrong'})  
							} else if (notf){
								return res.json({success: false, message:'Request Already sent'}) 
							} else {
								Notification.findOne({type: 'invite', creater: friend, receiver: email}, function(err, notf){
									if (err) {  
										return res.json({success: false, message:'Something went wrong'})  
									} else if (notf){
										return res.json({success: false, message:'Aleady invited'})
									} else {
										const entry = new Notification({type: 'invite', creater: email, receiver: friend})
										entry.save(function (err) {  
											if (err) {  
												return res.json({success: false, message:'Something went wrong'})  
											}  
											return res.json({success: true, message:'Friend request sent'})  
										})
									}
								})
							}
						})
					}
				} else
					return res.json({success: false, message:'User doesn\'t exist'})
			})
		})
	} else
		return res.json({success: false, message:'Invalid scenario'})
};

exports.reject = async (req, res) => {
	const{email,friend}=req.body
	if(email != friend && email != null && email != "" && friend != null && friend != "") {
		Notification.findOne({type: 'invite', creater: email, receiver: friend}, function(err, notf){
			if (err) {  
				return res.json({success: false, message:'Something went wrong'})  
			} else if (!notf){
				return res.json({success: false, message:'Invite doesn\'t exist'}) 
			} else {		
				Notification.deleteOne({type: 'invite', creater: email, receiver: friend}, function(err){
					if (err) {  
						return res.json({success: false, message:'Something went wrong'})  
					}  
					return res.json({success: true, message:'Friend request deleted'}) 
				})
			}
		})
	} else 
		return res.json({success: false, message:'Invalid scenario'})
};

exports.accept = async (req, res) => {
	const{email,friend}=req.body
	if(email != friend && email != null && email != "" && friend != null && friend != "") {
		Notification.findOne({type: 'invite', creater: email, receiver: friend}, function(err, notf){
			if (err) {  
				return res.json({success: false, message:'Something went wrong'})  
			} else if (!notf){
				return res.json({success: false, message:'Invite doesn\'t exist'}) 
			} else {
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
			}
		})
	} else 
		return res.json({success: false, message:'Invalid scenario'})
};

exports.unFriend = async (req, res) => {
	const email = req.query.email
	const friend = req.query.friend
	if(email != friend && email != null && email != "" && friend != null && friend != "") {
		User.findOne({email}, function(err, user){
			if (err) {  
					return res.json({success: false, message:'Something went wrong'})  
			} else if (!user) {
				return res.json({success: false, message:'Requester doesn\'t exist'})
			} else if (user.friends.indexOf(friend)<0){
				return res.json({success: false, message:'Friend doesn\'t exist'})
			}
			User.findOne({email: friend}, function(err, fnd){
				if (err) {  
						return res.json({success: false, message:'Something went wrong'})  
				} else if (!fnd) {
					return res.json({success: false, message:'Receiver doesn\'t exist'})
				} else if (fnd.friends.indexOf(email)<0){
					return res.json({success: false, message:'Friend doesn\'t exist'})
				}
				User.updateOne({ email }, { $pull: { friends: friend } }, function(err){
					if (err) {  
						return res.json({success: false, message:'Something went wrong'})  
					}  
					User.updateOne({ email: friend }, { $pull: { friends: email } }, function(err){
						if (err) {  
							return res.json({success: false, message:'Something went wrong'})  
						}  
					})
					return res.json({success: true, message:'Unfriend successfully'})
				})
			})
		})
	} else 
		return res.json({success: false, message:'Invalid scenario'})
};

exports.getAllFriends = async (req, res) => {
	const email = req.query.email
	var friends = []
	var users;
	if(email == null || email == "")
		return res.json({success: false, message:'Please send email as query param'})  
	else {
		User.findOne({email}, function(err, user){
			if (err) {  
				return res.json({success: false, message:'Something went wrong'})  
			} else if (!user)
				return res.json({success: false, message:'User doesn\'t exist'})  
			friends = user.friends
			User.find({email: { $in: friends}}, function(err, list){
				if (err) {  
					return res.json({success: false, message:'Something went wrong'})  
				}
				return res.json(list)  
			}).select('fname email _id');
		})
	}
};

exports.getRecommendedFriends = async (req, res) => {
	const email = req.query.email
	var friends = [];
	if(email == null || email == "")
		return res.json({success: false, message:'Please send email as query param'})  
	else {
		User.findOne({email}, function(err, user){
			if (err) {  
				return res.json({success: false, message:'Something went wrong'})  
			} else if(!user) {
					return res.json({success: false, message:'User doesnt exist'})  
			}
			console.log(user.friends)
			friends = user.friends
			friends.push(email)
			Notification.find({creater:email}).stream()
				.on('data', function(notf){
					friends.push(notf.receiver)
				})
				.on('error', function(){
					return res.json({success: false, message:'Something went wrong'})  
				})
				.on('end', function(){
					User.find({}, function(error, users){
						if (error) {  
							return res.json({success: false, message:'Something went wrong'})  
						} 
						return res.json(filterUser(users, friends))
					}).select('fname email _id')
				})
		})
	}
};