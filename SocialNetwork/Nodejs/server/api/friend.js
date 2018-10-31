const User = require('../model/Users')
const express = require('express')
const router = express.Router();
const Notification = require('../model/Notification')

router.get('/recommend',async (req, res) => {
	const email = req.query.email
	recommendedList=[]
	console.log(email)
	if(email){
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
});

router.post('/invite/send',async (req, res) => {
	const { myEmail, friendEmail } = req.body
	
	Notification.find({ type: 'invite'},{ "creater.email": myEmail},{ "receiver.email": friendEmail },(err,re)=>{
		if(re.length!==0)	return res.json({ success: false, message: 'invite send :  Request Already sent' })
		else{
			User.find({email:myEmail},(err,re)=>{
				if(re[0].fname){
					userName=re[0].fname;

					User.find({email:friendEmail},(err,re)=>{
						if(re[0].fname){
							friendName=re[0].fname;

							const entry = new Notification({ 
								type: 'invite',
								creater: { name:userName, email:myEmail},
								receiver:{ name:friendName , email:friendEmail}
							})

							entry.save(function (err,re) {
								if(re){
									//console.log(re)
									return res.json({ success: true, message: 'invitation sent' })
								}
								else return res.json({ success: false, message: 'invite send : invite notification failed' })
							})
						}
						else return res.json({ success: false, message: 'invite send : friend email not found' }) 
					}).select("fname")
				}
				else return res.json({ success: false, message: 'invite send : user email not found' })
			}).select("fname")
		}
	})
});

router.post('/invite/accept', async (req, res) => {
	const { myEmail, friendEmail } = req.body

	if(myEmail && friendEmail){
		Notification.find({$and:[{ type: 'invite'},{ "creater.email":friendEmail },{ "receiver.email":myEmail  }]},(err,re)=>{
			if(re.length!=0){
				notificationId=re[0]._id
	
				User.find({email:friendEmail},(err,re)=>{
					if(re[0].fname){
						friendName=re[0].fname

						Notification.findByIdAndDelete(notificationId,function(err,re){
							if(re){
								User.update({ email:myEmail }, { $push: { friends: {name:friendName,email:friendEmail} } },function(err,re){
									if(re){
										return res.json({ success: true, message: "Friend request accepted" })
									}		
									else return res.json({ success: false, message: "Accept : Issue with update" })
								})
							}
							else return res.json({ success: false, message: "Accept : Issue with deletion of notification" })
						})
					}
					else return res.json({ success: false, message: "Accept : no creater found of notification" })
				}).select("fname")
			}
			else return res.json({ success: false, message: "Accept : no notification found" })
		})
	}
	else return res.json({ success: false, message: "Accept : emails  not recieved" })
	
});

router.post('/invite/reject',async (req, res) => {
	const { myEmail, friendEmail } = req.body

	if(myEmail && friendEmail){
		Notification.find({$and:[{ type: 'invite'},{ "creater.email":friendEmail },{ "receiver.email":myEmail  }]},(err,re)=>{
			if(re.length!=0){
				notificationId=re[0]._id

				Notification.findByIdAndDelete(notificationId,function(err,re){
					if(re){
						return res.json({ success: true, message: "Request rejected" })
					}
					else return res.json({ success: false, message: "Reject : Issue with deletion of notification" })
				})


			}
			else return res.json({ success: false, message: 'Reject : no notification found' })
		})
	}
	else return res.json({ success: false, message: 'Reject : emails  not recieved' })	
});


router.get('/getAllFriends', async (req, res) => {
	const email = req.query.email
	if(email){
		User.find({email:email},function(err,re){
			if(re){
				return res.json(re[0].friends)
			}
			else return res.json({ success: false, message: 'get all friends:  email not found' })
		})
	}
	else return res.json({ success: false, message: 'get all friends: email did not recieved' })
});


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


module.exports = router;