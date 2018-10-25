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
	const noti=await db.FindWithKeys(Notification,[{ type: 'invite'},{ "creater.email":friendEmail },{ "receiver.email":myEmail  }])
	const friendName=await db.FindWithKeys(User,[{email:friendEmail}],"fname")

	if(noti.length!==0 ){
		if(friendName.length!==0){
			Notification.findByIdAndDelete(noti[0]._id,function(err,re){
				if(!err){
					User.update({ email:myEmail }, { $push: { friends: {name:friendName[0].fname,email:friendEmail} } },function(err,re){
						if(!err){
							return res.json({ success: true, message: "Friend request accepted" })
						}		
						else return res.json({ success: false, message: "Accept : Issue with update" })
					})
				}
				else return res.json({ success: false, message: "Accept : Issue with deletion of notification" })
			})
		}
		else return res.json({ success: false, message: "Accept : friend name  not found" })
	}
	else return res.json({ success: false, message: "Accept : notification  not found" })
	
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
	if(email!==""){
		User.find({email:email},function(err,re){
			if(re){
				return res.json(re[0].friends)
			}
			else return res.json({ success: false, message: 'get all friends:  email not found' })
		})
	}
	else return res.json({ success: false, message: 'get all friends: wrong email' })
};

//http://localhost:1234/api/friend/recommend?email=saransh98@gmail.com
exports.getRecommendedFriends = async (req, res) => {
	const email = req.query.email
	recommendedList=[]

	if(email!==""){
		User.find(function(err,allUser){
			if(allUser){
				User.find({email:email},function(err,currUser){
					if(currUser){
						Notification.find({"creater.email":email},function(err,noti){
							if(noti){
								for(usr of allUser){
									let flag=true
									for(usr2 of currUser[0].friends){
										if(usr.email===usr2.email) flag=false
									}
									for(usr3 of noti){
										if(usr.email===usr3.receiver.email) flag=false
									}
									if(flag && usr.email!==email) {
										recommendedList.push({name:usr.fname,email:usr.email})
									}
								}
								return res.json(recommendedList)
							}
							else return res.json({ success: false, message: 'recommended : notification list not found' })
						}).select("receiver.email")
					}
					else return res.json({ success: false, message: 'recommended : current user not found' })
				})
			}
			else return res.json({ success: false, message: 'recommended : issue with geting all user' })
		}).select("fname email")
	}
	else return res.json({ success: false, message: 'recommended : invalid email' })

	/* 

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
	}); */

	
}
