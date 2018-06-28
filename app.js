const express = require('express')
const path = require('path')
const http = require('http')
const PORT = process.env.PORT || 5000
const app = express()

var bcrypt = require('bcrypt')
//let models = require('./models')
let db = require('./models')
const exphbs = require('express-handlebars')
let session = require('express-session')
let bodyParser = require('body-parser')


const setVars = require("./setEnvironmentVars.js")
setVars.setEnvironmentVariables()

const { Pool } = require('pg')
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
})

//app.use(express.favicon());
//app.use(express.logger('dev'));
//app.use(express.bodyParser());
//app.use(express.methodOverride());
//app.use(app.router);

app.engine('handlebars',exphbs())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(session({
  secret: 'doge',
  resave: false,
  saveUninitialized: false
}))

app.use(express.static(path.join(process.env.ROOT_DIR, 'public')))
app.set('views', path.join(process.env.ROOT_DIR, 'views'))
app.set('view engine', 'handlebars')

app.get('/test', (req, res) => res.render('test'))

app.post('/login', (req, res) => {
//verify matching username and password
db.UserProfile.findOne({where: {email : req.body.email}}).then(function(userfound){
  console.log(userfound)
  bcrypt.compare(req.body.password, userfound.password, function(err, result) {
    console.log(result)
    if(result){
    //set that session BOI
    req.session.email = userfound.email
    // setting the expiration date of the cookies so we can
    // come back later even if we close the browser
    var hour = 3600000
    req.session.cookie.expires = new Date(Date.now() + hour)
    req.session.cookie.maxAge = hour
    res.redirect('/profile')}

    else {res.redirect('/')}
  })
}).catch(res.redirect('/'))
})

//stephen.js
app.get('/', (req, res)=>{
    res.render('landing')
})

//app.use(express.static('public'))

// app.post('/', (req, res)=>{
//     let email = req.body.register_email
//     let password = req.body.register_password
//     let gender = req.body.optradio
//     let sexpref = req.body.optradio2
//     console.log("works!")
//     console.log(email)
//     console.log(password)
//     console.log(gender)
//     console.log(sexpref)
//
//     // const list = models.list.build({
//     //     name: name
//     // })
//     // list.save().then((newList)=>{
//     //     console.log(newList)
//     // })
// })

app.get('/profile', (req, res) => {
  db.UserProfile.findOne({where: {email : req.session.email}}).then(function(user){
   console.log(user)
   res.render('profile', {userslist: user})
  })
})


app.get('/users', (req, res) => {
  db.UserProfile.findAll().then(function(users){
    console.log(users)
    res.render('users', {userslist: users})
  })
})



//app.get('/register', (req, res) => res.render('register'))

app.post('/register', (req, res) => {

bcrypt.hash(req.body.register_password, 10, function(err, hash) {
  let newUser = db.UserProfile.build({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    dob: req.body.dob,
    email: req.body.register_email,
    sexpref: req.body.sexpref,
    gender: req.body.gender,
    password: hash,
    bio: '',
    youngest: req.body.min_age,
    oldest: req.body.max_age,
  })
  // save the student in the database
  newUser.save().then(function(savedUser){
    console.log(savedUser)
    res.redirect('/users')
    return
  }).catch(res.redirect('/'))
  })
  //check if email already exists in users table !!!
})

app.post('/deleteUser', (req, res) => {
  db.UserProfile.destroy({
    where: {
      id : req.body.userid
    }
    }).then(function(){
      res.redirect('/users')
  })
})

//edit profile stuff

app.post('/edit-firstname', (req, res) => {
  db.UserProfile.update(
    { firstname: req.body.firstname },
    { where: {id : req.body.id} }
    ).then(function(){
      res.redirect('/users')
  }).catch(res.redirect('/users'))
})

app.post('/edit-lastname', (req, res) => {
  db.UserProfile.update(
    { lastname: req.body.lastname },
    { where: {id : req.body.id} }
    ).then(function(){
      res.redirect('/profile')
  }).catch(res.redirect('/profile'))
})

/* app.get('/db', async (req, res) => {
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT * FROM test_table');
    res.render('pages/db', result);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}) */
db.sequelize.sync().then(function() {
  http.createServer(app).listen(PORT, function(){
    console.log('Express server listening on port ' + app.get('port'));
  });
})
