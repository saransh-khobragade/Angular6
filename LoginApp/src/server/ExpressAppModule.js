const express = require('express')
const bodyparser = require('body-parser')
const session = require('express-session')
const app = express()

app.use(session({
    secret: 'ksjldklahshjsljksjkxshjchosjckspcgusjvghhdafhjsbjknsldjl',
    saveUninitialized:true,
    resave:false
}))
app.use(bodyparser.json())

module.exports = app