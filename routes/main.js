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

  module.exports = router;
