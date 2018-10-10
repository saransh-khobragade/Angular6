const express = require('express')
const bodyparser = require('body-parser')
const session = require('express-session')
const interceptor = require('express-interceptor')
const connection = require('./Connection')
const router = require('./Router')
const app = express()

var preInterceptor = interceptor(function(req, res){
	return {
		isInterceptable: function(){
			if(false)
				return res.json({success: false, message:'Mongodb is down'})
		}
	}
})
app.use(preInterceptor);

app.use(session({
    secret: 'ksjldklahshjsljksjkxshjchosjckspcgusjvghhdafhjsbjknsldjl',
    saveUninitialized:true,
    resave:false
}))

app.use(bodyparser.json())
app.use(router);
module.exports = app