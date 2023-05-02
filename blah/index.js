const express = require('express')
const bodyParser = require('body-parser')
const { request } = require('http')
const nunjucks = require('nunjucks')
const app = express()
const db = require('./queries')
const port = 5500

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended:true,
    })
)
app.get('/',(request,response)=> {
    response.json({info:'node.js,express'})
})

// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files, have it use nunjucks to do so
app.engine('html', nunjucks.render);
nunjucks.configure('../blah/views/index.html', { noCache: true });
app.use(express.static(__dirname))
const router = express.Router();
app.use('/', router)
router.get('/TAS', function (req,res,next) {
    res.render('index', {title:'TAS'});
})
app.get('/users', db.getUsers)
app.get('/usersid', db.getUserById)
app.post('/usersin', db.createUser)
app.put('/usersup', db.updateUser)
app.delete('/usersdl', db.deleteUser)

app.listen(port,()=>{
    console.log(`App running on port ${port}.`)
})