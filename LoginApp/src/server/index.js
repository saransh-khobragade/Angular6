const app = require('./module/ExpressApp')
const userAPI = require('./service/UserAPI')
const adminAPI = require('./service/AdminAPI')
const notificationAPI = require('./service/NotificationAPI')
const friendAPI = require('./service/FriendAPI')
const upload = require('./module/Uploads')
//--------------------------------------------Api------------------------------------------------------//
app.post('/api/login',userAPI.login)	//log in user
app.get('/api/isUserLoggedIn', userAPI.isUserLoggedIn) //checking logged in user
app.delete('/api/logout', userAPI.logout)	//log out user

app.get('/api/profile', userAPI.profile)	// ?? dont know

app.post('/api/user', userAPI.createUser)	// register API (create new user)
app.get('/api/user', userAPI.getOneUser)	// get user with email
app.put('/api/user', userAPI.editUser)		// edit user details
app.delete('/api/user', userAPI.deleteOneUser)	//  delete user
app.get('/api/isUserExist', userAPI.isUserExist) // check for existing user

app.get('/api/allUsers', adminAPI.getAllUsers) // get all users
app.delete('/api/allUsers', adminAPI.deleteAllUser) //delete all users

app.post('/api/profile/image', upload.single('profilePicture'), userAPI.uploadProfilePic) //upload user profile picture

app.post('/api/friend', friendAPI.invite)	//send friend request --> create an entry in user.invite
app.post('/api/friend/reject', friendAPI.reject)	//reject friend request --> delete the entry from notification
app.post('/api/friend/accept', friendAPI.accept) 	// accept friend request --> delete entry from notification and add email to user.friends
app.delete('/api/friend', friendAPI.unFriend)	// unfriend -->  delete email from user.friends
app.get('/api/friend/all', friendAPI.getAllFriends)	// get all friends --> return user.friends
app.get('/api/friend/recommend', friendAPI.getRecommendedFriends) //return users-friends

app.post('/api/notification', notificationAPI.openNotification)	//(remove) open notification --> push user.invite to notification, return user.invite

app.listen(1234,()=>console.log('server listening at 1234'))