const userAPI = require('../service/UserAPI')
const adminAPI = require('../service/AdminAPI')
const notificationAPI = require('../service/NotificationAPI')
const friendAPI = require('../service/FriendAPI')
const upload = require('../module/Uploads')
const express = require('express')
var router = express.Router();

router.post('/api/login',userAPI.login)	//log in user
router.get('/api/isUserLoggedIn', userAPI.isUserLoggedIn) //checking logged in user
router.delete('/api/logout', userAPI.logout)	//log out user

router.get('/api/profile', userAPI.profile)	// ?? dont know

router.post('/api/user', userAPI.createUser)	// register API (create new user)
router.get('/api/user', userAPI.getOneUser)	// get user with email
router.put('/api/user', userAPI.editUser)		// edit user details
router.delete('/api/user', userAPI.deleteOneUser)	//  delete user
router.get('/api/isUserExist', userAPI.isUserExist) // check for existing user

router.get('/api/allUsers', adminAPI.getAllUsers) // get all users
router.delete('/api/allUsers', adminAPI.deleteAllUser) //delete all users
router.get('/api/database', adminAPI.getDatabase)		//get db

router.post('/api/profile/image', upload.single('profilePicture'), userAPI.uploadProfilePic) //upload user profile picture

router.post('/api/invite/send', friendAPI.invite)	//send friend request --> create an entry in user.invite
router.post('/api/invite/reject', friendAPI.reject)	//reject friend request --> delete the entry from notification
router.post('/api/invite/accept', friendAPI.accept) 	// accept friend request --> delete entry from notification and add email to user.friends
router.delete('/api/friend', friendAPI.unFriend)	// unfriend -->  delete email from user.friends
router.get('/api/friend/getAll', friendAPI.getAllFriends)	// get all friends --> return user.friends
router.get('/api/friend/recommend', friendAPI.getRecommendedFriends) //return users-friends

router.get('/api/notification/getinvites', notificationAPI.inviteNotification)	//(remove) open notification --> push user.invite to notification, return user.invite

module.exports = router;