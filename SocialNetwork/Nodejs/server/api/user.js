const User = require('../model/Users')
const express = require('express')
const router = express.Router();


router.post('/api/user',async (req, res) =>{		
	const{fname, lname, email, password, phone, gender, dob} = req.body
	const result = await User.findOne({email})
    if(result){
        return res.json({success: false, message: 'User already exists'})
    }

	const user = new User({fname, lname, email, password, phone, gender, dob})
	user.save(function (err) {  
        if (err) {  
            return res.json({success: false, message:'Something went wrong'})  
        }  
        return res.json({success: true, message:'Registration successful'})  
    })
});

/* router.profile = async (req,res)=>{
    const user = await User.findOne({email:req.session[email]})
    if(!user){
        return res.json({success: false, message:'user was deleted'})
    }
    return res.json({success: true, email:req.session[email]})
}; */

/* router.isUserExist = async (req, res) =>{		
	User.findOne({email:req.query.email},(function (err, result) {
		if (err) {
			return res.json({success: false, message: 'Something went wrong'})
		} 
		else if(result){
			return res.json({success:true,message: 'User exists'})
		}
		return res.json({success:false,message: 'User doesn\'t exists'})
	}))
}; */


/* router.getOneUser = async (req, res)=>{			// get user with id
	User.findOne({email:req.query.email}, function (err, user) {
		if(err) {
			return res.json({success: false, message: 'Something went wrong'})
		}
		else if(!user){
			return res.json({success: false, message: 'User not found'})
		}
		return res.json(user)		
	}).select('fname lname email phone gender dob')
};
 */
/* router.editUser = async (req, res)=>{			// update user details	
	const email = req.query.email
	User.findOne({email}, function(err, user) {		
		if(err){
			return res.json({success: false, message:'Something went wrong'})
		} else if(!user)
			return res.json({success: false, message:'User doesn\'t exist'})
		User.updateOne({ email }, {$set: req.body}, function(err){
			if(err){
				return res.json({success: false, message:'Something went wrong'})
			}
			return res.json({success: true, message:'User details updated successfully'})
		})
	})
}; */

/* router.deleteOneUser = async (req,res)=>{		//delete user
    User.deleteOne({ email:req.query.email }, function (err) {  
        if (err) {  
            return res.json({success: false, message:'Something went wrong'})  
        }  
        return res.json({success: true, message: 'Successfully deleted' });  
    })  
}; */

/* router.uploadProfilePic = async (req, res)=> {
	const email = req.session[email]
	User.findOne({email}, function(err, user) {		
		if(err){
			return res.json({success: false, message:'Something went wrong'})
		}
		else if(!user){
			return res.json({success: false, message: 'User not found'})
		}
		const dp = new ProfilePicture({email, path: req.file.destination+req.file.filename})
		dp.save(function(err){
		if(err)
			return res.json({success: false, message:'Something went wrong'})
		return res.json({success: true, message: 'Profile picture saved successfully'})
		})
	})
}; */



module.exports = router;