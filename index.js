require('./models/db')

const express = require("express")
const jwt = require("jsonwebtoken")

const studentController = require('./controllers/studentController')

const { verifyToken, tokenGenKey } = require("./apikey")
//let serverToken = tokenGenKey["tokenKey"]

const path = require("path")
const handlebars = require("handlebars")
const exphbs = require("express-handlebars")
const { allowInsecurePrototypeAccess} = require("@handlebars/allow-prototype-access")


//const bodyparser = require("body-parser")
//var json = require('json')
//var logger = require('logger')
//var methodOverride = require('method-override')

const app = express()
const PORT = process.env.PORT || 3000

//parse JSON using express
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) =>{
    res.send(`
        <h2>Welcome to the API<h2>
        <h3>
            <a href='/login'>Login</a> | 
            <a href='/api/users'>Users</a> | 
            <a href='/api/movies'>Movies</a> |          
            <a href='/student/'> Database</a> | 
            <a href='/logout'>Logout</a>
        </h3> 
    `)
    res.end()
})

//app.use(methodOverride())

app.engine('hbs', exphbs({
    handlebars: allowInsecurePrototypeAccess(handlebars),
    extname: 'hbs',
    defaultLayout: 'MainLayout',
    layoutsDir: __dirname + '/views/layouts/'
}))

app.set('view engine', 'hbs');

//Static files
app.set('views', path.join(__dirname, '/views/layouts/'))


/* ==== [## Routes defined here ] ==== */
//http://localhost:3000/api/users/1

//## Base request, welcome screen
//Login api
app.post('/login', (req, res) => {
    const user = {
        id:1, 
        username: 'sanjay',
        password: 'sanjay'
    }

    jwt.sign({ user: user }, tokenGenKey['secretword'], (err, token) => {
        res.json({
            token
        })
    })
})

app.get('/logout', function(req, res) {
    res.status(200).send({ auth: false, token: null });
});

// Users
app.use('/api/users', require('./routes/api/users'))

// Movies
app.use('/api/movies', require('./routes/api/movies'))



var server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} `)
})


app.use('/student', studentController)