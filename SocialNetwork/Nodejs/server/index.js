const express = require('express')
const bodyparser = require('body-parser')
const session = require('express-session')
const router = require('./api/apiRouter')

const app = express()
const morgan = require('morgan')
app.use(bodyparser.json())
app.use(morgan('dev'))
app.use(session({
    secret: 'ksjldklahshjsljksjkxshjchosjckspcgusjvghhdafhjsbjknsldjl',
    saveUninitialized:true,
    resave:false
}))
app.use(router);

/* var preInterceptor = interceptor(function(req, res){
	return {
		isInterceptable: function(){
			if(false)
				return res.json({success: false, message:'Mongodb is down'})
		}
	}
})
app.use(preInterceptor); */



app.listen(1234,()=>console.log('Server started :)'))