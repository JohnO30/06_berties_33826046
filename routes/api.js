// Create express router
const express = require("express");
const router = express.Router();
const db = global.db;

// GET /api/books - Return all books as JSON (with optional search, price filter, and sort parameters)
router.get('/books', function (req, res, next) {
    // Get parameters from query string
    let searchTerm = req.query.search;
    let minPrice = req.query.minprice;
    let maxPrice = req.query.maxprice;
    let sortBy = req.query.sort;
    
    let sqlquery = "SELECT * FROM books";
    let conditions = [];
    let params = [];
    
    // Add search condition if search term provided
    if (searchTerm) {
        conditions.push("name LIKE ?");
        params.push('%' + searchTerm + '%');
    }
    
    // Add minimum price condition if provided
    if (minPrice) {
        conditions.push("price >= ?");
        params.push(parseFloat(minPrice));
    }
    
    // Add maximum price condition if provided
    if (maxPrice) {
        conditions.push("price <= ?");
        params.push(parseFloat(maxPrice));
    }
    
    // Append WHERE clause if there are any conditions
    if (conditions.length > 0) {
        sqlquery += " WHERE " + conditions.join(" AND ");
    }
    
    // Add ORDER BY clause if sort parameter provided
    if (sortBy === 'name') {
        sqlquery += " ORDER BY name";
    } else if (sortBy === 'price') {
        sqlquery += " ORDER BY price";
    }

    // Execute the sql query
    db.query(sqlquery, params, (err, result) => {
        // Return results as a JSON object
        if (err) {
            res.json(err);
            next(err);
        }
        else {
            res.json(result);
        }
    });
});

// Export the router
module.exports = router;
