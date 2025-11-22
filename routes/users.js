// Create a new router
const express = require("express")
const router = express.Router()
const bcrypt=require('bcrypt')
const saltRounds = 10;


router.get('/register', function (req, res, next) {
    res.render('register.ejs');
});

router.post('/registered', function (req, res, next) {
    const plainPassword = req.body.password;
    bcrypt.hash(plainPassword, saltRounds, function(err, hashedPassword) {
        if (err) {
            return next(err);
        }
        // Store hashed password in your database.
        let result = 'Hello '+ req.body.first + ' '+ req.body.last +' you are now registered!  We will send an email to you at ' + req.body.email;
        result += 'Your password is: '+ req.body.password +' and your hashed password is: '+ hashedPassword;
        res.send(result);
    });
});

router.get('/list', function(req, res, next) {
    let sqlquery = "SELECT id, username, first_name, last_name, email FROM users";
    // Execute the SQL query
    db.query(sqlquery, (err, result) => {
        if (err) {
            next(err);
        }
        res.render("listusers.ejs", {availableUsers: result});
    });
});

router.get('/login', function (req, res, next) {
    res.render('login.ejs');
});

router.post('/loggedin', function (req, res, next) {
    const username = req.body.username;
    const plainPassword = req.body.password;
    
    // Query to find user by username
    let sqlquery = "SELECT hashedPassword FROM users WHERE username = ?";
    
    db.query(sqlquery, [username], (err, result) => {
        if (err) {
            return next(err);
        }
        
        // Check if user exists
        if (result.length === 0) {
            // Log failed login attempt - username not found
            let auditQuery = "INSERT INTO login_audit (username, status, message) VALUES (?, ?, ?)";
            db.query(auditQuery, [username, 'failed', 'Username not found'], (auditErr) => {
                if (auditErr) console.error('Audit log error:', auditErr);
            });
            res.send('Login failed: Username not found.');
            return;
        }
        
        // Get the hashed password from database
        const hashedPassword = result[0].hashedPassword;
        
        // Compare the password supplied with the password in the database
        bcrypt.compare(req.body.password, hashedPassword, function(err, result) {
            if (err) {
                // Handle error
                return next(err);
            }
            else if (result == true) {
                // Log successful login
                let auditQuery = "INSERT INTO login_audit (username, status, message) VALUES (?, ?, ?)";
                db.query(auditQuery, [username, 'success', 'Login successful'], (auditErr) => {
                    if (auditErr) console.error('Audit log error:', auditErr);
                });
                // Send success message
                res.send('Login successful! Welcome back, ' + username + '!');
            }
            else {
                // Log failed login attempt - incorrect password
                let auditQuery = "INSERT INTO login_audit (username, status, message) VALUES (?, ?, ?)";
                db.query(auditQuery, [username, 'failed', 'Incorrect password'], (auditErr) => {
                    if (auditErr) console.error('Audit log error:', auditErr);
                });
                // Send failure message
                res.send('Login failed: Incorrect password.');
            }
        });
    });
});

router.get('/audit', function(req, res, next) {
    let sqlquery = "SELECT id, username, login_time, status, message FROM login_audit ORDER BY login_time DESC";
    // Execute the SQL query
    db.query(sqlquery, (err, result) => {
        if (err) {
            return next(err);
        }
        res.render("audit.ejs", {auditRecords: result});
    });
});

// Export the router object so index.js can access it
module.exports = router
