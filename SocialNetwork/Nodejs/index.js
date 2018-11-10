const express = require('express')
const bodyparser = require('body-parser')
const session = require('express-session')
const router = require('./api/apiRouter')
const methodOverride = require('method-override');

const app = express()
const morgan = require('morgan')
app.use(bodyparser.json())
app.use(methodOverride('_method'));
app.use(morgan('dev'))

app.use(session({
    secret: 'ksjldklahshjsljksjkxshjchosjckspcgusjvghhdafhjsbjknsldjl',
    saveUninitialized:true,
    resave:false
}))
app.use(router);

app.listen(1234,()=>console.log('Server started :)'))