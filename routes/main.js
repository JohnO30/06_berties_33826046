// routes/main.js
const express = require("express");
const router = express.Router();

// Home page
router.get("/", (req, res, next) => {
  // shopData comes from app.locals.shopData (set in index.js)
  res.render("index.ejs");
});

// About page
router.get("/about", (req, res, next) => {
  // Uses the same shopData from app.locals
  res.render("about.ejs");
});

// Add-book page
router.get("/books/addbook", (req, res, next) => {
  res.render("addbook.ejs");
});

module.exports = router;
