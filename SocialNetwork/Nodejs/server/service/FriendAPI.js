const User = require('../model/Users')
const db = require('../module/MongoDBMethods')
const Notification = require('../model/Notification')

function filterUser(data, data2) {
	var filter = [];
	for (var i = 0; i < data.length; i++) {
		if (data2.indexOf(data[i].email) < 0)
			filter.push(data[i]);
	}
	return filter;
}


exports.invite = async (req, res) => {
	const { myEmail, friendEmail } = req.body
	const noti=await db.FindWithKeys(Notification,[{ type: 'invite'},{ "creater.email": myEmail},{ "receiver.email": friendEmail }])
	
	if(noti.length!==0) return res.json({ success: false, message: 'Request Already sent' })

	const myName=await db.FindWithKeys(User,[{email:myEmail}],"fname")
	const FriendName=await db.FindWithKeys(User,[{email:friendEmail}],"fname")
	const entry = new Notification({ 
		type: 'invite',
		creater: { name:myName[0].fname, email:myEmail},
		receiver:{ name:FriendName[0].fname , email:friendEmail}
	})

	entry.save(function (err) {
		if(!err) return res.json({ success: true, message: 'invitation sent' })
	})
};

exports.accept = async (req, res) => {
	const { myEmail, friendEmail } = req.body
	const noti=await db.FindWithKeys(Notification,[{ type: 'invite'},{ "creater.email":myEmail },{ "receiver.email":friendEmail  }])

	Notification.findByIdAndDelete(noti[0]._id,function(err,re){})

	let a=await User.update({ email:myEmail }, { $push: { friends: friendEmail } })
	return res.json({ success: true, message: 'Friend request Accepted' })
};

exports.reject = async (req, res) => {
	const { myEmail, friendEmail } = req.body
	const noti=await db.FindWithKeys(Notification,[{ type: 'invite'},{ "creater.email":myEmail },{ "receiver.email":friendEmail  }])

	Notification.findByIdAndDelete(noti[0]._id,function(err,re){})

	return res.json({ success: true, message: 'Friend request Rejected' })
};



exports.unFriend = async (req, res) => {
	const email = req.query.email
	const friend = req.query.friend
	if (email != friend && email != null && email != "" && friend != null && friend != "") {
		User.findOne({ email }, function (err, user) {
			if (err) {
				return res.json({ success: false, message: 'Something went wrong' })
			} else if (!user) {
				return res.json({ success: false, message: 'Requester doesn\'t exist' })
			} else if (user.friends.indexOf(friend) < 0) {
				return res.json({ success: false, message: 'Friend doesn\'t exist' })
			}
			User.findOne({ email: friend }, function (err, fnd) {
				if (err) {
					return res.json({ success: false, message: 'Something went wrong' })
				} else if (!fnd) {
					return res.json({ success: false, message: 'Receiver doesn\'t exist' })
				} else if (fnd.friends.indexOf(email) < 0) {
					return res.json({ success: false, message: 'Friend doesn\'t exist' })
				}
				User.updateOne({ email }, { $pull: { friends: friend } }, function (err) {
					if (err) {
						return res.json({ success: false, message: 'Something went wrong' })
					}
					User.updateOne({ email: friend }, { $pull: { friends: email } }, function (err) {
						if (err) {
							return res.json({ success: false, message: 'Something went wrong' })
						}
					})
					return res.json({ success: true, message: 'Unfriend successfully' })
				})
			})
		})
	} else
		return res.json({ success: false, message: 'Invalid scenario' })
};

exports.getAllFriends = async (req, res) => {
	const email = req.query.email
	var friends = []
	var users;
	if (email == null || email == "")
		return res.json({ success: false, message: 'Please send email as query param' })
	else {
		User.findOne({ email }, function (err, user) {
			if (err) {
				return res.json({ success: false, message: 'Something went wrong' })
			} else if (!user)
				return res.json({ success: false, message: 'User doesn\'t exist' })
			friends = user.friends
			User.find({ email: { $in: friends } }, function (err, list) {
				if (err) {
					return res.json({ success: false, message: 'Something went wrong' })
				}
				return res.json(list)
			}).select('fname email _id');
		})
	}
};

//http://localhost:1234/api/friend/recommend?email=saransh98@gmail.com
exports.getRecommendedFriends = async (req, res) => {
	const email = req.query.email
	
	let allUser=await db.GetAll(User,"fname","email")
	let CurrUser=await db.FindWithKeys(User,[{email:email}]);
	let friendsOfCurrUser=CurrUser[0].friends
	let noti=await db.FindWithKeys(Notification,[{"creater.email":email}],"receiver.email");
	let alreadyInvitedEmails=[]
	for(usr of noti){
		alreadyInvitedEmails.push(usr.receiver.email)
	}
	
	let resultWithoutOwnEmail=[]	//eleminating own self
	allUser.forEach(ele => {
		if(ele.email!==email){
			resultWithoutOwnEmail.push(ele)
		}
	});
	
	let resultWithoutOwnFriends=[] 		//eleminating friends
	resultWithoutOwnEmail.forEach(ele => {
		if(friendsOfCurrUser.indexOf(ele.email)===-1){
			resultWithoutOwnFriends.push(ele)
		}
	});

	let resultWithoutOwnAlreadySend=[] 		//eleminating friends already send invites
	resultWithoutOwnFriends.forEach(ele => {
		if(alreadyInvitedEmails.indexOf(ele.email)===-1){
			resultWithoutOwnAlreadySend.push(ele)
		}
	});

	return res.json(resultWithoutOwnAlreadySend)
}
