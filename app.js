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
const Sequelize = require('sequelize')
const Op = Sequelize.Op


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
  bcrypt.compare(req.body.password, userfound.password, function(err, result) {
    if(result){
      if(req.session){//set that session BOI
      console.log(userfound.id)
      req.session.userid = userfound.id
      // setting the expiration date of the cookies so we can
      // come back later even if we close the browser
      var hour = 3600000
      req.session.cookie.expires = new Date(Date.now() + hour)
      req.session.cookie.maxAge = hour}
      res.redirect('/profile')
    }
  })
}).catch(function(err) {res.redirect('/')})
})

app.post('/logout', (req, res) => {
//destroy session then clear cookie
req.session.destroy()
res.redirect('/')
})

//stephen.js
app.get('/', (req, res)=>{
    res.render('landing')
})

app.use(express.static('public'))

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
  console.log(req.session.id)
  db.UserProfile.findOne({where: {id : req.session.userid}}).then(function(user){
   console.log(user)
   res.render('profile', {userslist: user})
  })
})

app.post('/visitprofile', (req, res) => {
  db.UserProfile.findOne({where: {id : req.body.id}}).then(function(user){
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
  }).catch(()=>{res.redirect('/')})
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

app.get('/findmatches', (req, res) => {

  db.UserProfile.findOne({where: {id : req.session.userid}}).then(function(user){
  db.UserProfile.findAll({where:{
    id : {[Op.not]:user.id},
  gender: {[Op.or]: {user.sexpref, 'both'}}
}}).then(function(users){
    res.render('users', {userslist: users})
  })
})
})


//edit profile stuff

app.post('/edit-firstname', (req, res) => {
  db.UserProfile.update(
    { firstname: req.body.firstname, },
    { where: {id : req.body.id} }
    ).then(function(){
      res.redirect('/profile')
  }).catch(res.redirect('/profile'))
})

app.post('/edit-lastname', (req, res) => {
  db.UserProfile.update(
    { lastname: req.body.lastname },
    { where: {id : req.body.id} }
    ).then(function(){
      res.redirect('/profile')
  }).catch(res.redirect('/profile'))
})

app.post('/edit-dob', (req, res) => {
  db.UserProfile.update(
    { dob: req.body.dob },
    { where: {id : req.body.id} }
    ).then(function(){
      res.redirect('/profile')
  }).catch(res.redirect('/profile'))
})

app.post('/edit-email', (req, res) => {
  db.UserProfile.update(
    { email: req.body.email },
    { where: {id : req.body.id} }
    ).then(function(){
      res.redirect('/profile')
  }).catch(res.redirect('/profile'))
})

app.post('/edit-bio', (req, res) => {
  db.UserProfile.update(
    { bio: req.body.bio },
    { where: {id : req.body.id} }
    ).then(function(){
      res.redirect('/profile')
  }).catch(res.redirect('/profile'))
})

app.post('/edit-gender', (req, res) => {
  db.UserProfile.update(
    { gender: req.body.gender },
    { where: {id : req.body.id} }
    ).then(function(){
      res.redirect('/profile')
  }).catch(res.redirect('/profile'))
})

app.post('/edit-sexpref', (req, res) => {
  db.UserProfile.update(
    { sexpref: req.body.sexpref },
    { where: {id : req.body.id} }
    ).then(function(){
      res.redirect('/profile')
  }).catch(res.redirect('/profile'))
})

app.post('/edit-youngest', (req, res) => {
  db.UserProfile.update(
    { youngest: req.body.youngest },
    { where: {id : req.body.id} }
    ).then(function(){
      res.redirect('/profile')
  }).catch(res.redirect('/profile'))
})

app.post('/edit-oldest', (req, res) => {
  db.UserProfile.update(
    { oldest: req.body.oldest },
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

// app.listen(3000, ()=>console.log('cherub app is listening on port 3000!'))

db.sequelize.sync().then(function() {
  http.createServer(app).listen(PORT, function(){
    console.log('Express server listening on port ' + app.get('port'));
  });
})
