const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

let models = require('./models')
const exphbs = require('express-handlebars')
let session = require('express-session')
let bodyParser = require('body-parser')



const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
})

express()
.engine('handlebars',exphbs())
.use(bodyParser.urlencoded({ extended: false }))
.use(session({
  secret: 'doge',
  resave: false,
  saveUninitialized: false
}))

.use(express.static(path.join(__dirname, 'public')))
.set('views', path.join(__dirname, 'views'))
.set('view engine', 'handlebars')
.get('/', (req, res) => res.render('index'))

.get('/db', async (req, res) => {
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT * FROM test_table');
    res.render('pages/db', result);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
})
.listen(PORT, () => console.log(`Listening on ${ PORT }`))
