const express = require("express");
const path = require("path");
const session = require("express-session");

const router = express.Router();

const connection = require("../database/db")

router.get("/home", (request, response) => {
    const username = request.session.username;
    response.render(path.join(__dirname, "../views/pages/admin/home"), { admin: username });
});

router.get("/users", (request, response) => {

    connection.query("SELECT * FROM accounts WHERE admin = 1",
    (error, results, fields) => {
        const adminUsers = [];
        results.forEach(user => {
            adminUsers.push(user.username);
        });

        if(request.session.loggedin && adminUsers.indexOf(request.session.username) !== -1){
            connection.query("SELECT * FROM accounts", (error, results, fields) => {
                response.render(path.join(__dirname, "../views/pages/admin/users-list"), { users: results });
            });
        } else {
            response.send("Please, make login with an admin account to access this page")
        };
    });
});

module.exports = router;