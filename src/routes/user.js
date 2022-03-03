const express = require("express");

const router = express.Router();

//Home route
router.get("/home", (request, response) => {
    //If loggedin is set with true, open the home page
    if(request.session.loggedin) {
        response.send(`Welcome back, ${request.session.username}!`);
    } else {
        //If loggedin is set to false, send a message to make login
        response.send("Please login to view this page!");
    }
    response.end();
});

module.exports = router;