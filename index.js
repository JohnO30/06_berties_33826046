// Import express and ejs
var session = require('express-session');
var express = require ('express')
var ejs = require('ejs')
const path = require('path')
var mysql = require('mysql2');

// Load environment variables
require('dotenv').config({ silent: true });

// Create the express application object
const app = express()
const port = process.env.PORT || 8000

// Create a session
app.use(session({
  secret: 'somerandomstuff',   // you can change this string
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 600000            // 10 minutes
  }
}));


// Tell Express that we want to use EJS as the templating engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// Define the database connection pool
const db = mysql.createPool({
  host: process.env.BB_HOST || 'localhost',
  user: process.env.BB_USER || 'berties_books_app',
  password: process.env.BB_PASSWORD || 'qwertyuiop',
  database: process.env.BB_DATABASE || 'berties_books',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
  
global.db = db;

// Set up the body parser 
app.use(express.urlencoded({ extended: true }))

// Set up public folder (for css and static js)
app.use(express.static(path.join(__dirname, 'public')))

// Define our application-specific data
app.locals.shopData = {shopName: "Bertie's Books"}

// Load the route handlers
const mainRoutes = require("./routes/main")
app.use('/', mainRoutes)

// Load the route handlers for /users
const usersRoutes = require('./routes/users')
app.use('/users', usersRoutes)

// Load the route handlers for /books
const booksRoutes = require('./routes/books')
app.use('/books', booksRoutes)

// Start the web app listening
app.listen(port, () => console.log(`Example app listening on port ${port}!`))