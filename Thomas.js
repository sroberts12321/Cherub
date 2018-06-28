/*
var dob = document.getElementById("myForm").elements.length;
//var dob = '19800810';

document.getElementById("myBtn").addEventListener("click", {
  var year = Number(dob.substr(0, 4));
  var month = Number(dob.substr(4, 2)) - 1;
  var day = Number(dob.substr(6, 2));
  var today = new Date();
  var age = today.getFullYear() - year;
  if (today.getMonth() < month || (today.getMonth() == month && today.getDate() < day)) {
    age--;
}
alert(age);

});

*/
const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const session = require('express-session')
const bodyParser = require('body-parser')
const sequelize = new Sequelize
const models =require('./models')

app.use(bodyParser.urlencoded({extended:false}))

app.use('/public', express.static('public'))
app.engine('mustache', mustacheExpress())
app.set('view engine', 'mustache')
app.set('views', './views')
app.use(session({
  secret : 'keyboard cat',
  resave : false,
  saveUninitialized : true
}))

//***************GET REQUESTS***************

//Login
    //Username / Email , Password
  app.get('/userprofile/:id'   ), function (req,res) {
    models.Userprofile.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(userprofile)){
      //data for user
      console.log(userprofile.)
      res.json(user)
    }
  }


//Nominate Matchmakers
app.get('', function (req,res) {

}
//Notifications (Matches, Matchmaker requests)
app.get('',function (req,res) {

}

//Approve/Deny Matchmaker requests
app.get('',function (req,res) {

}



//***************POST REQUESTS***************
//Sign up
  //No Duplicate Accounts (Only one associated Email)
app.post('', function (req,res) {

}



//Update Profile Info
  //Change picture (upload/link)
  //Edit profile info (DoB, Sexual Preference, Bio, Name that appears)
  //Change Password
app.put('/profile', function (req,res) {

}

//***************DELETE REQUESTS***************
//Cancel Account
app.delete('/profile', function (req,res) {

}


app.listen(3000, () => console.log('Currently listening on port 3000!'))
