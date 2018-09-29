const express = require('express')
const bodyparser = require('body-parser')
const session = require('express-session')
var interceptor = require('express-interceptor')
const connection = require('./Connection')
const app = express()

var preInterceptor = interceptor(function(req, res){
	//if(!connection.mongoose)
	//	return res.json({success: false, message:'Mongodb is down'})
})
//app.use(preInterceptor);
app.use(session({
    secret: 'ksjldklahshjsljksjkxshjchosjckspcgusjvghhdafhjsbjknsldjl',
    saveUninitialized:true,
    resave:false
}))
app.use(bodyparser.json())

module.exports = app