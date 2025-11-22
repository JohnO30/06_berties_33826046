// Import express and ejs
const express = require("express");
const ejs = require("ejs");
const path = require("path");
const mysql = require("mysql2");

// Load environment variables from .env file
require("dotenv").config({ silent: true });

// Create the express application object
const app = express();
const port = process.env.PORT || 8000;

// Tell Express that we want to use EJS as the templating engine
app.set("view engine", "ejs");

// Set views directory
app.set("views", path.join(__dirname, "views"));

// Body parser (needed for req.body)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Public folder for CSS, images, client-side JS
app.use(express.static(path.join(__dirname, "public")));

// Application data for templates
app.locals.shopData = {
    shopName: process.env.SHOP_NAME || "Bertie's Books"
};


// Define the database connection pool
// Define the database connection pool using environment variables
const db = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "berties_books_app",
    password: process.env.DB_PASSWORD || "qwertyuiop",
    database: process.env.DB_NAME || "berties_books",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});


// Expose DB globally
global.db = db;

// Load the route handlers
app.use("/", require("./routes/main"));
app.use("/users", require("./routes/users"));
app.use("/books", require("./routes/books"));

// Start the web app listening
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
