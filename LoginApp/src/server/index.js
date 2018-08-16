const express = require('express')
const bodyparser = require('body-parser')
const app = express()

app.use(bodyparser.json())

app.post('/api/register',(req,res)=>{
    console.log(req.body);
})

app.listen(1234,()=>console.log('server listening at 1234'))