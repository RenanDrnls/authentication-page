//Importing packages
const express = require("express");
const path = require("path");
const session = require("express-session");

//Set express Router
const router = express.Router();

//Connection with DB
const connection = require("../database/db")

//Home route for admin user
router.get("/home", (request, response) => {
    const username = request.session.username;
    response.render(path.join(__dirname, "../views/pages/admin/home"), { admin: username });
});

//Users list route for admin user
router.get("/users", (request, response) => {

    //Make a SELECT to look all admin usernames
    connection.query("SELECT * FROM accounts WHERE admin = 1",
    (error, results, fields) => {

        //Insert all admin usernames into an array
        const adminUsers = [];
        results.forEach(user => {
            adminUsers.push(user.username);
        });

        //If the navigator have a session, and the username of the session is an admin inserted in the previous array, render the users list
        if(request.session.loggedin && adminUsers.indexOf(request.session.username) !== -1){
            connection.query("SELECT * FROM accounts", (error, results, fields) => {
                response.render(path.join(__dirname, "../views/pages/admin/users-list"), { users: results });
            });
        } else {
            //Else, cannot access the page
            response.send("Please, make login with an admin account to access this page")
        };
    });
});

module.exports = router;