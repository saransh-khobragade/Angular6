const connection = require('mongoose')

connection.Promise = Promise
connection.connect('mongodb://localhost:27017/Angular6', { useNewUrlParser: true })
.then(()=>console.log('Mongoose up'))

module.exports = connection