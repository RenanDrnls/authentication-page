const express = require("express");
const path = require("path");

//Call the module to connection to the database
const connection = require("../database/db");

const router = express.Router();

//Login form route
router.get("/", (request, response) => {
    response.sendFile(path.join(__dirname, "../login.html"));
});

//Post route receiving the form infos from / route
router.post("/validate-auth", (request, response) => {
    //Declaring variables with the infos inserted in the form
    const username = request.body.username;
    const password = request.body.password;

    //If username and passwor is not empty, search in the database
    if(username && password){
        //Query to search with bind fields
        connection.query("SELECT * FROM accounts WHERE username = ? AND password = ?",
        [username, password],
        (error, results, fields) => {
            
            //If error is true(have an error), throw the error
            if(error) throw error;

            //If have one or more results, set the session.loggedin to true,
            //set the session.username to the username of the user,
            //Redirect to the home page
            if(results.length > 0) {
                request.session.loggedin = true;
                request.session.username = username;
                response.redirect("/user/home");
            } else {
                //If return 0 results of the database, show pass or user incorrect
                response.send("Incorrect Username and/or Password!");
            }
            //End of the response
            response.end();
        });
    } else {
        //If one of the field is empty
        response.send("Please enter Username and Password!");
        response.end();
    }
});

module.exports = router;