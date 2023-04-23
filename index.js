const express = require('express')
const bodyParser = require('body-parser')
const { request } = require('http')
const app = express()
const db = require('./queries')
const port = 3331

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended:true,
    })
)
app.get('/',(request,response)=> {
    response.json({info:'node.js,express'})
})

app.get('/users', db.getUsers)
app.get('/usersid', db.getUserById)
app.post('/usersin', db.createUser)
app.put('/usersup', db.updateUser)
app.delete('/usersdl', db.deleteUser)

app.listen(port,()=>{
    console.log(`App running on port ${port}.`)
})