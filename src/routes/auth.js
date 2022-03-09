//Importing packages
const express = require("express");
const path = require("path");
const crypto = require("crypto");

//Call the module to connection to the database
const connection = require("../database/db");

const router = express.Router();

//Login form route
router.get("/", (request, response) => {
    response.render(path.join(__dirname, "../views/pages/login"));
});

//Post route receiving the form infos from / route
router.post("/validate-auth", (request, response) => {
    //Declaring variables with the infos inserted in the form
    const username = request.body.username;
    const password = request.body.password;
    
    //Turn the password into a hash to compare with the hash of the username in the database
    const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");

    //If username and passwor is not empty, search in the database
    if(username && hashedPassword){
        //Query to search with bind fields
        connection.query("SELECT * FROM accounts WHERE username = ? AND password = ?",
        [username, hashedPassword],
        (error, results, fields) => {
            
            //If error is true(have an error), throw the error
            if(error) throw error;
            console.log(results[0].admin);
            //If have one or more results, set the session.loggedin to true,
            //set the session.username to the username of the user,
            //Redirect to the home page
            if(results.length > 0) {
                request.session.loggedin = true;
                request.session.username = username;

                //Validate if is Admin
                switch(results[0].admin){
                    case 1:
                        response.redirect("/admin/home");
                        break;
                    case 0:
                        response.redirect("/user/home");
                        break;
                };
            } else {
                //If return 0 results of the database, show pass or user incorrect
                response.send("Incorrect Username and/or Password!");
            };
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