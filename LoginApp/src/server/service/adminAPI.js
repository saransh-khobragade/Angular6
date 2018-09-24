const User = require('../model/Users')

exports.deleteAllUser = async (req,res)=>{		//delete user
    User.delete({}, function (err) {  
        if (err) {  
            return res.json({success: false, message:'Something went wrong'})  
        }  
        return res.json({success: true, message: 'Successfully deleted' });  
    })  
};

exports.getAllUsers = async (req, res)=>{		
	User.find({}, function (err, users) {
		if(err) {
			return res.json({success: false, message: 'Something went wrong'})
		}
		return res.json(users)		
	}).select('fname lname email phone gender dob')
};