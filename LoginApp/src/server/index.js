const app = require('./module/ExpressApp')
const userAPI = require('./service/UserAPI')
const upload = require('./module/uploads')

//--------------------------------------------Api------------------------------------------------------//

app.post('/api/login',userAPI.login)
app.get('/api/isUserLoggedIn', userAPI.isUserLoggedIn)
app.get('/api/profile', userAPI.profile)
app.get('/api/isUserExist', userAPI.isUserExist) //check for existing user
app.post('/api/user', userAPI.createUser)	//register API
app.get('/api/getAllUsers', userAPI.getAllUsers)	// get all users
app.get('/api/user', userAPI.getOneUser)
app.put('/api/user', userAPI.editUser)
app.delete('/api/user', userAPI.deleteOneUser)
app.post('/api/profile/image', upload.single('profilePicture'), userAPI.uploadProfilePic)
app.delete('/api/logout', userAPI.logout)

app.listen(1234,()=>console.log('server listening at 1234'))