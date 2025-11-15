// Create a new router
const express = require("express")
const router = express.Router()

router.get('/search',function(req, res, next){
    res.render("search.ejs")
});

router.get('/search-result', function (req, res, next) {
    // Search in the database for books matching the keyword (partial match)
    let sqlquery = "SELECT * FROM books WHERE name LIKE ?"; // Use LIKE for partial matching
    // Use % wildcards to match any characters before and after the search keyword
    let searchTerm = "%" + req.query.keyword + "%";
    // Execute sql query with the search term
    db.query(sqlquery, [searchTerm], (err, result) => {
        if (err) {
            next(err)
        }
        res.render("list.ejs", {availableBooks:result})
    });
});

router.get('/list', function(req, res, next) {
        let sqlquery = "SELECT * FROM books"; // query database to get all the books
        // execute sql query
        db.query(sqlquery, (err, result) => {
            if (err) {
                next(err)
            }
            res.render("list.ejs", {availableBooks:result})
         });
});

router.get('/bargainbooks', function(req, res, next) {
    let sqlquery = "SELECT name, price FROM books WHERE price < 20"; // query database for books under £20
    // execute sql query
    db.query(sqlquery, (err, result) => {
        if (err) {
            next(err)
        }
        res.render("list.ejs", {availableBooks:result})
    });
});

router.post('/bookadded', function (req, res, next) {
    // saving data in database
    let sqlquery = "INSERT INTO books (name, price) VALUES (?,?)"
    // execute sql query
    let newrecord = [req.body.name, req.body.price]
    db.query(sqlquery, newrecord, (err, result) => {
        if (err) {
            next(err)
        }
        else
            res.send(' This book is added to database, name: '+ req.body.name + ' price '+ req.body.price)
    })
}) 

// Export the router object so index.js can access it
module.exports = router
